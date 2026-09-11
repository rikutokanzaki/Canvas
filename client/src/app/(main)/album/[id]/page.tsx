import { Title } from "@/components/elements/Title";
import { MemoryPost } from "@/components/layouts/MemoryPost";
import { fetchAlbumContents } from "@/lib/fetchMemories";

type AlbumPageProps = {
  params: Promise<{ id: string }>;
};

export default async function Albums({ params }: AlbumPageProps) {
  const { id } = await params;
  const albumContents = await fetchAlbumContents(id);

  return (
    <div className="flex flex-col flex-1 items-center justify-center">
      <div className="mt-10 w-4/5">
        <Title>Album</Title>

        <div className="flex flex-wrap justify-center gap-6">
          {albumContents.photos.map((value, index) => (
            <MemoryPost
              key={`${value.id}-${index}`}
              id={value.id}
              imagePath={value.imagePath}
              description={value.description}
              date={value.date}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
