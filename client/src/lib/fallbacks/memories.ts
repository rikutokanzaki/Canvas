import type {
  AlbumContent,
  AlbumData,
  Highlight,
  MemoryPostData,
} from "@/types/memory";

export const fallbackHighlight: Highlight = {
  imagePath: "",
  description: "1年前の今日",
  date: "2025.09.09",
};

export const fallbackAlbums: AlbumData[] = [{
  id: "randomstring",
  thumbnailPath: "",
  period: "2025.09-2026.09",
  title: "日常",
  photoCount: 40,
}];

export const fallbackAlbumContents = (id: string): AlbumContent => ({
  id,
  title: "日常",
  photos: [{
    id: "randomstring",
    imagePath: "",
    description: "memory",
    date: "2025.09.09",
  }],
});

export const fallbackPosts: MemoryPostData[] = [{
  id: "randomstring",
  imagePath: "",
  description: "memory",
  date: "2025.09.09",
}];
