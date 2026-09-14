import type {
  AlbumContent,
  AlbumData,
  Highlight,
  Memory,
} from "@/types/memories";

export const fallbackHighlight: Highlight = {
  imagePath: "/paper.png",
  description: "1年前の今日",
  date: "2025.09.09",
};

export const fallbackAlbums: AlbumData[] = [
  {
    id: "randomstring",
    thumbnailPath: "/paper.png",
    period: "2025.09-2026.09",
    title: "日常",
    photoCount: 40,
  },
];

export const fallbackAlbumContents = (id: string): AlbumContent => (
  {
    id,
    title: "日常",
    posts: [
      {
        id: "randomstring",
        imagePath: "/paper.png",
        description: "memory",
        date: "2025.09.09",
      },
      {
        id: "randomstring",
        imagePath: "/paper.png",
        description: "memory",
        date: "2025.09.09",
      },
      {
        id: "randomstring",
        imagePath: "/paper.png",
        description: "memory",
        date: "2025.09.09",
      },
      {
        id: "randomstring",
        imagePath: "/paper.png",
        description: "memory",
        date: "2025.09.09",
      },
    ],
  }
);

export const fallbackMemories: Memory[] = [{
  id: "randomstring",
  imagePath: "/paper.png",
  description: "memory",
  date: "2025.09.09",
}];
