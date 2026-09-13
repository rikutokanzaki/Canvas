import Image from "next/image";
import { Title } from "@/components/elements/Title";
import { Memory } from "@/components/layouts/Memory";
import { fetchAlbumContents } from "@/lib/fetchMemories";
import { randomColor } from "@/lib/utils/color";
import { randomNumber } from "@/lib/utils/number";

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

        <div className="mt-5 p-6 bg-amber-950 shadow-2xl overflow-hidden">
          <div className="relative py-25 flex flex-wrap justify-center gap-6 overflow-hidden border-2">
            <Image
              src="/paper.png"
              alt="paper-background"
              fill
              priority
              className="object-cover"
            />
            <div className="relative z-10 flex flex-wrap justify-center gap-6">
              {albumContents.posts.map((value, index) => (
                <Memory
                  key={`${value.id}-${index}`}
                  id={value.id}
                  tapeColor={randomColor()}
                  rotation={randomNumber(-4, 4)}
                  offsetY={randomNumber(-10, 10)}
                  imagePath={value.imagePath}
                  date={value.date}
                  description={value.description}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
