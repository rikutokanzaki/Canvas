use aws_config::BehaviorVersion;
use aws_credential_types::provider::ProvideCredentials;
use aws_sigv4::{
    http_request::{sign, SignableBody, SignableRequest, SigningSettings},
    sign::v4,
};
use lambda_http::{Body, Error, Request, Response};
use serde::{Deserialize, Serialize};
use sqlx::postgres::{PgConnectOptions, PgPool, PgPoolOptions, PgSslMode};
use sqlx::Row;
use std::{
    env,
    sync::Arc,
    time::{Duration, SystemTime},
};

const RDS_CERTS: &[u8] = include_bytes!("global-bundle.pem");

async fn generate_rds_iam_token(
    db_hostname: &str,
    port: u16,
    db_username: &str,
) -> Result<String, Error> {
    let config = aws_config::load_defaults(BehaviorVersion::v2026_01_12()).await;
    let credentials = config
        .credentials_provider()
        .expect("no credentials provider found")
        .provide_credentials()
        .await
        .expect("unable to load credentials");
    let identity = credentials.into();
    let region = config.region().unwrap().to_string();
    let mut signing_settings = SigningSettings::default();

    signing_settings.expires_in = Some(Duration::from_secs(900));
    signing_settings.signature_location = aws_sigv4::http_request::SignatureLocation::QueryParams;

    let signing_params = v4::SigningParams::builder()
        .identity(&identity)
        .region(&region)
        .name("rds-db")
        .time(SystemTime::now())
        .settings(signing_settings)
        .build()?;

    let url = format!(
        "https://{db_hostname}:{port}/?Action=connect&DBUser={db_user}",
        db_hostname = db_hostname,
        port = port,
        db_user = db_username
    );

    let signable_request =
        SignableRequest::new("GET", &url, std::iter::empty(), SignableBody::Bytes(&[]))
            .expect("signable request");

    let (signing_instructions, _signature) =
        sign(signable_request, &signing_params.into())?.into_parts();

    let mut url = url::Url::parse(&url).unwrap();
    for (name, value) in signing_instructions.params() {
        url.query_pairs_mut().append_pair(name, value);
    }

    let response = url.to_string().split_off("https://".len());

    Ok(response)
}

pub async fn setup_db_pool() -> Result<PgPool, Error> {
    let host = env::var("DB_HOSTNAME")?;
    let port = env::var("DB_PORT")?.parse::<u16>()?;
    let database = env::var("DB_NAME")?;
    let username = env::var("DB_USERNAME")?;
    let token = generate_rds_iam_token(&host, port, &username).await?;
    let options = PgConnectOptions::new()
        .host(&host)
        .port(port)
        .username(&username)
        .password(&token)
        .database(&database)
        .ssl_root_cert_from_pem(RDS_CERTS.to_vec())
        .ssl_mode(PgSslMode::Require);
    Ok(PgPoolOptions::new()
        .max_connections(5)
        .connect_with(options)
        .await?)
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
struct CreateMemory {
    image_path: String,
    description: String,
}

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
struct Memory {
    id: String,
    image_path: String,
    description: String,
    date: String,
}

pub(crate) async fn function_handler(
    event: Request,
    pool: Arc<PgPool>,
) -> Result<Response<Body>, Error> {
    if event.method() != "POST" {
        return response(405, r#"{"error":"method not allowed"}"#);
    }

    let input: CreateMemory = serde_json::from_slice(event.body().as_ref())?;
    if input.image_path.is_empty() {
        return response(400, r#"{"error":"imagePath is required"}"#);
    }

    let row = sqlx::query("INSERT INTO posts (image_path, description, date) VALUES ($1, $2, CURRENT_DATE) RETURNING id::text AS id, image_path, description, date::text AS date")
        .bind(input.image_path).bind(input.description).fetch_one(&*pool).await?;
    let memory = Memory {
        id: row.get("id"),
        image_path: row.get("image_path"),
        description: row.get("description"),
        date: row.get("date"),
    };

    response(201, &serde_json::to_string(&memory)?)
}

fn response(status: u16, body: &str) -> Result<Response<Body>, Error> {
    Ok(Response::builder()
        .status(status)
        .header("content-type", "application/json")
        .body(body.to_owned().into())
        .map_err(Box::new)?)
}
