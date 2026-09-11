import Link from "next/link";
import Image from "next/image";

type AlbumProps = {
  id: string;
  thumbnailPath: string;
  period: string;
  title: string;
  photoCount: number;
};

export const Album = ({ id, thumbnailPath, period, title, photoCount }: AlbumProps) => {
  return (
    <div className="max-w-3xs bg-white shadow-md">
      <Link
        href={`/album/${id}`}
      >
        <div className="pt-2 px-2 border-b border-gray-300">
          <Image
            width={150}
            height={150}
            src={thumbnailPath}
            alt="album-image"
          />
        </div>
        <div className="p-2">
          <p className="text-left text-xs text-gray-500">{period}</p>
          <p className="pt-3 text-xl">{title}</p>
          <p className="text-right text-xs text-gray-500">{photoCount}枚</p>
        </div>
      </Link>
    </div >
  );
}
