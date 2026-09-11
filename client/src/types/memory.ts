export type MemoryPostData = {
  id: string;
  imagePath: string;
  description: string;
  date: string;
};

export type Highlight = {
  imagePath: string;
  description: string;
  date: string;
};

export type AlbumContent = {
  id: string;
  title: string;
  photos: MemoryPostData[];
};

export type AlbumData = {
  id: string;
  thumbnailPath: string;
  period: string;
  title: string;
  photoCount: number;
};
