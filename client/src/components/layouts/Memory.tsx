import Image from "next/image";
import { HTMLAttributes } from "react";
import { MaskingTape } from "@/components/elements/MaskingTape";
import type { Memory as MemoryData } from "@/types/memories";

type MemoryProps = MemoryData & HTMLAttributes<HTMLDivElement> & {
  tapeColor?: string;
  rotation?: number;
  offsetY?: number;
};

export const Memory = ({ tapeColor, imagePath, date, description, rotation = 0, offsetY = 0 }: MemoryProps) => (
  <div className="relative mt-5 w-64 border border-gray-200 bg-white p-8 shadow-sm" style={{ transform: `rotate(${rotation}deg) translateY(${offsetY}px)` }}>
    <MaskingTape color={tapeColor} />
    <div className="flex flex-col gap-2 align-middle">
      <Image src={imagePath} alt="memory-image" width={200} height={200} className="h-auto w-full rounded-sm object-cover" />
      <p className="pl-1 text-left text-xs text-gray-500">{date}</p>
      <p className="p-1 text-left text-sm text-gray-700">{description}</p>
    </div>
  </div>
);
