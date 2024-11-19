import { GeneralInfo } from "@/app/GeneralInfoContext";
import { SpotifyData } from "@/app/spotify/SpotifyProvider";

export const INIT_USER_DATA = {
  firstName: "Daniel",
  lastName: "Schneider",
  lowerAge: 15,
  upperAge: 25,
  currAge: 31,
  genres: [],
  artists: [],
  preselectedSongsLists: [],
};
export const EMPTY_FUNC = () => {
  return;
};

const songList = [
  {
    artist: "Mock Artist 1",
    title: "Song1",
    album: "Album1",
    genre: "Pop",
  },
  {
    artist: "Mock Artist 1",
    title: "Song2",
    album: "Album1",
    genre: "Pop",
  },
  {
    artist: "Mock Artist 2",
    title: "Song1 from artist 2",
    album: "Album2",
    genre: "Pop",
  },
];

export const INIT_USER_SPOTIFY_DATA_POPULATED = {
  bearerToken: "",
  songList,
};

export const INIT_USER_SPOTIFY_DATA = {
  bearerToken: "",
  songList: [],
};

type Ref<T> = { current: T };
export function dataCopyTuple(): [
  Ref<GeneralInfo>,
  (data: GeneralInfo) => void
] {
  const dataCopyRef: Ref<GeneralInfo> = { current: INIT_USER_DATA };

  function setDataCopy(data: GeneralInfo) {
    dataCopyRef.current = data;
  }

  return [dataCopyRef, setDataCopy];
}

export function spotifyDataCopyTuple(): [
  Ref<SpotifyData>,
  (data: SpotifyData) => void
] {
  const dataCopyRef: Ref<SpotifyData> = { current: INIT_USER_SPOTIFY_DATA };

  function setDataCopy(data: SpotifyData) {
    dataCopyRef.current = data;
  }

  return [dataCopyRef, setDataCopy];
}

export const mockPreselectedSongLists: { [key: string]: string[] } = {
  "60s Rock": ["Song1"],
  "70s Rock": ["Song2"],
  "60s Country": ["Song1", "Song2"],
};

export const mockItunesSongs = [
  {
    artist: "Mock Artist 1",
    title: "Song1",
    album: "Album1",
    genre: "Pop",
  },
  {
    artist: "Mock Artist 1",
    title: "Song2",
    album: "Album1",
    genre: "Pop",
  },
  {
    artist: "Mock Artist 2",
    title: "Song1 from artist 2",
    album: "Album2",
    genre: "Pop",
  },
  {
    artist: "Mock Artist 2",
    title: "Song2 from artist 2",
    album: "Album2",
    genre: "Pop",
  },
];
