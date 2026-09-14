import { Title } from "@/components/elements/Title";
import { AlbumField } from "@/components/layouts/AlbumField";
import { HighlightField } from "@/components/layouts/HighlightField";
import { MemoryField } from "@/components/layouts/MemoryField";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <div className="mt-10 w-4/5">
        <Title>Highlight</Title>
        <div className="mx-auto w-3/4">
          <HighlightField />
        </div>
      </div>

      <div id="albums" className="w-4/5 scroll-mt-20 py-10">
        <Title>{`What's New`}</Title>
        <MemoryField />
      </div>

      <div className="w-4/5 py-10">
        <Title>Albums</Title>
        <AlbumField />
      </div>
    </div>
  );
}
