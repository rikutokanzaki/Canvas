import {
  getAlbumContents,
  getAlbums,
  getHighlight,
  getMemoryPosts,
} from "@/lib/api/memories";
import {
  fallbackAlbumContents,
  fallbackAlbums,
  fallbackHighlight,
  fallbackPosts,
} from "@/lib/fallbacks/memories";
import { withFallback } from "@/lib/utils/request";

export const fetchHighlight = () =>
  withFallback(getHighlight, fallbackHighlight, "highlight");

export const fetchAlbums = () =>
  withFallback(getAlbums, fallbackAlbums, "albums");

export const fetchAlbumContents = (id: string) =>
  withFallback(
    () => getAlbumContents(id),
    fallbackAlbumContents(id),
    "album contents",
  );

export const fetchMemoryPosts = () =>
  withFallback(getMemoryPosts, fallbackPosts, "posts");
