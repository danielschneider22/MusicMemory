import { itunesSongs } from "@/app/songs";
const list = new Set<string>();

itunesSongs.forEach((song) => {
  list.add(song.artist);
});

export const artistList = Array.from(list).map((artist) => {
  return { label: artist };
});
