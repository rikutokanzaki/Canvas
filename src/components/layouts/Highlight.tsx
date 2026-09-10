import Image from "next/image";

type HighlightProps = {
  imagePath: string;
  description: string;
  date: string;
};

export const Highlight = ({ imagePath, description, date }: HighlightProps) => {
  return (
    <div className="p-2 flex gap-2 bg-orange-50 border-amber-700 border-l-4 shadow-md">
      <Image
        height={150}
        width={150}
        src={imagePath}
        alt="highlight-image"
      />
      <div className="w-full flex flex-col justify-between">
        <div className="h-full flex justify-center items-center">
          <p className="p-2 text-xl">{description}</p>
        </div>
        <p className="px-2 w-full text-right text-sm text-gray-500">{date}</p>
      </div>
    </div>
  );
}
