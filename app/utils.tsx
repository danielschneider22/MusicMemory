import { toast } from "react-toastify";
import { Song } from "./songs";

export function filterUniqueSongs(songList: Song[]) {
  const nonUniqueSongs: string[] = [];

  const uniqueSongs = songList.filter((song, index, self) => {
    const isFirstOccurrence =
      index ===
      self.findIndex((s) => s.title === song.title && s.artist === song.artist);

    if (!isFirstOccurrence) {
      nonUniqueSongs.push(song.title);
    }

    return isFirstOccurrence;
  });

  if (nonUniqueSongs.length > 0) {
    const message = (
      <>
        The following songs were already in your list: <br />{" "}
        <b>{nonUniqueSongs.join(", ")}</b>
      </>
    );

    toast.warn(message, { autoClose: 20000 });
  }

  return uniqueSongs;
}
