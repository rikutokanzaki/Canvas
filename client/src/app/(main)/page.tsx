import { Title } from "@/components/elements/Title";
import { HighlightField } from "@/components/layouts/HighlightField";
import { MemoryField } from "@/components/layouts/MemoryField";
import { AlbumField } from "@/components/layouts/AlbumField";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center">
      <div className="mt-10 w-4/5">
        <Title>Highlight</Title>
        <div className="mx-auto w-3/4">
          <HighlightField />
        </div>
      </div>

      <div id="albums" className="py-10 w-4/5 scroll-mt-20">
        <Title>{`What's New`}</Title>
        <MemoryField />
      </div>

      <div className="py-10 w-4/5">
        <Title>Albums</Title>
        <AlbumField />
      </div>
    </div>
  );
}
