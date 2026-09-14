import { Memory } from "@/components/layouts/Memory";
import { fetchMemories } from "@/lib/fetchMemories";

export const MemoryField = async () => {
  const memories = await fetchMemories();

  return (
    <div>
      {memories.map((value, index) => (
        <Memory key={`${value.id}-${index}`} id={value.id} imagePath={value.imagePath} description={value.description} date={value.date} />
      ))}
    </div>
  );
};
