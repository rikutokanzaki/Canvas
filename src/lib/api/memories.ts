import { API_ENDPOINT } from "@/config/api";
import type {
  AlbumContent,
  AlbumData,
  Highlight,
  MemoryPostData,
} from "@/types/memory";
import { getJson } from "@/lib/utils/request";

export const getHighlight = () =>
  getJson<Highlight>(`${API_ENDPOINT}/highlight`);

export const getAlbums = () =>
  getJson<AlbumData[]>(`${API_ENDPOINT}/albums`);

export const getAlbumContents = (id: string) =>
  getJson<AlbumContent>(`${API_ENDPOINT}/albums/${id}`);

export const getMemoryPosts = () =>
  getJson<MemoryPostData[]>(`${API_ENDPOINT}/posts`);
