import { fetchMemoryPosts } from "@/lib/fetchMemories";
import { MemoryPost } from "@/components/layouts/MemoryPost";

export const MemoryPostField = async () => {
  const memoryPosts = await fetchMemoryPosts();

  return (
    <div>
      {memoryPosts.map((value, index) => (
        <MemoryPost
          key={`${value.id}-${index}`}
          id={value.id}
          imagePath={value.imagePath}
          description={value.description}
          date={value.date}
        />
      ))}
    </div>
  );
}
