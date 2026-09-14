import { api_base_url } from "@/config/api";
import { getJson, postJson } from "@/lib/utils/request";
import type {
  AlbumContent,
  AlbumData,
  CreateMemoryInput,
  Highlight,
  Memory,
} from "@/types/memories";

export const getHighlight = () =>
  getJson<Highlight>(`${api_base_url}/highlight`);

export const getAlbums = () =>
  getJson<AlbumData[]>(`${api_base_url}/albums`);

export const getAlbumContents = (id: string) =>
  getJson<AlbumContent>(`${api_base_url}/albums/${encodeURIComponent(id)}`);

export const getMemories = () =>
  getJson<Memory[]>(`${api_base_url}/memories`);

export const postMemory = (memory: CreateMemoryInput) =>
  postJson<Memory>(`${api_base_url}/memories`, memory);
