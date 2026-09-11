import { Highlight } from "@/components/layouts/Highlight";
import { fetchHighlight } from "@/lib/fetchMemories";

export const HighlightField = async () => {
  const highlight = await fetchHighlight();

  return (
    <Highlight
      imagePath={highlight.imagePath}
      description={highlight.description}
      date={highlight.date}
    />
  );
}
