import { SpotifyTrack } from "./spotify/api";

export function filterUniqueSongs(songList: SpotifyTrack[]) {
    return songList.filter(
        (song, index, self) =>
          index ===
          self.findIndex((s) => s.name === song.name && s.artist === song.artist)
    );
}