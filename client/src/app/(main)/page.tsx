import { Title } from "@/components/elements/Title";
import { HighlightField } from "@/components/layouts/HighlightField";
import { MemoryPostField } from "@/components/layouts/MemoryPostField";
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

      <div className="py-10 w-4/5">
        <Title>{`What's New`}</Title>
        <MemoryPostField />
      </div>

      <div className="py-10 w-4/5">
        <Title>Albums</Title>
        <AlbumField />
      </div>
    </div>
  );
}
