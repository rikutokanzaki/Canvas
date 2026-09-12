use lambda_http::{run, service_fn, tracing, Error};
use std::sync::Arc;

mod http_handler;
use http_handler::{function_handler, setup_db_pool};

#[tokio::main]
async fn main() -> Result<(), Error> {
    tracing::init_default_subscriber();

    let pool = setup_db_pool().await?;
    let shared_pool = Arc::new(pool);

    run(service_fn(move |event| {
        let pool = Arc::clone(&shared_pool);
        async move { function_handler(event, pool).await }
    }))
    .await
}
