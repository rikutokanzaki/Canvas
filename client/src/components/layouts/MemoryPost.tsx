import Image from "next/image";
import { MaskingTape } from "@/components/elements/MaskingTape";
import type { MemoryPostData } from "@/types/memories";

type MemoryPostProps = MemoryPostData & {
  tapeColor?: string;
}

export const MemoryPost = ({ imagePath, date, description, tapeColor }: MemoryPostProps) => {
  return (
    <div className="relative w-64 p-8 mt-5 bg-white border border-gray-200 shadow-sm">
      <MaskingTape color={tapeColor} />

      <div className="flex flex-col gap-2 align-middle">
        <Image
          src={imagePath}
          alt="post-image"
          width={200}
          height={200}
          className="w-full h-auto object-cover rounded-sm"
        />
        <p className="text-left text-xs text-gray-500 pl-1">{date}</p>
        <p className="text-left text-sm text-gray-700 p-1">{description}</p>
      </div>
    </div>
  );
};
