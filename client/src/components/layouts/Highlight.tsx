import Image from "next/image";

type HighlightProps = {
  imagePath: string;
  description: string;
  date: string;
};

export const Highlight = ({ imagePath, description, date }: HighlightProps) => {
  return (
    <div className="flex gap-2 border-l-4 border-amber-700 bg-orange-50 p-2 shadow-md">
      <Image
        height={150}
        width={150}
        src={imagePath}
        alt="highlight-image"
      />
      <div className="flex w-full flex-col justify-between">
        <div className="flex h-full items-center justify-center">
          <p className="p-2 text-xl">{description}</p>
        </div>
        <p className="w-full px-2 text-right text-sm text-gray-500">{date}</p>
      </div>
    </div>
  );
}
