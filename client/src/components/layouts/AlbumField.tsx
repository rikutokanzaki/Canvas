import { Album } from "@/components/layouts/Album";
import { fetchAlbums } from "@/lib/fetchMemories";

export const AlbumField = async () => {
  const albums = await fetchAlbums();

  return (
    <div>
      {albums.map((value, index) => (
        <Album
          key={`${value.id}-${index}`}
          id={value.id}
          thumbnailPath={value.thumbnailPath}
          period={value.period}
          title={value.title}
          photoCount={value.photoCount}
        />
      ))}
    </div>
  );
}
