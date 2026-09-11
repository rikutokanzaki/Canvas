import { api_base_url } from "@/config/api";
import type {
  AlbumContent,
  AlbumData,
  Highlight,
  MemoryPostData,
} from "@/types/memory";
import { getJson } from "@/lib/utils/request";

export const getHighlight = () =>
  getJson<Highlight>(`${api_base_url}/highlight`);

export const getAlbums = () =>
  getJson<AlbumData[]>(`${api_base_url}/albums`);

export const getAlbumContents = (id: string) =>
  getJson<AlbumContent>(`${api_base_url}/albums/${id}`);

export const getMemoryPosts = () =>
  getJson<MemoryPostData[]>(`${api_base_url}/posts`);
