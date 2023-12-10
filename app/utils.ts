import { Song } from "./songs";

export function filterUniqueSongs(songList: Song[]) {
    return songList.filter(
        (song, index, self) =>
          index ===
          self.findIndex((s) => s.title === song.title && s.artist === song.artist)
    );
}