import { GeneralInfo, GeneralInfoContext } from "@/app/GeneralInfoContext";
import { SpotifyData, SpotifyContext } from "@/app/spotify/SpotifyProvider";
import { useState, useEffect } from "react";
import {
  INIT_USER_DATA,
  INIT_USER_SPOTIFY_DATA,
  INIT_USER_SPOTIFY_DATA_POPULATED,
} from "./initState";

type Props = {
  setDataCopy?: (data: GeneralInfo) => void;
  setSpotifyDataCopy?: (data: SpotifyData) => void;
  populatedSongs?: boolean;
  children: React.ReactNode;
};

export function AppWrapper({
  setDataCopy,
  setSpotifyDataCopy,
  populatedSongs,
  children,
}: Props) {
  const [spotifyData, setSpotifyData] = useState<SpotifyData>(
    populatedSongs ? INIT_USER_SPOTIFY_DATA_POPULATED : INIT_USER_SPOTIFY_DATA
  );
  const [generalInfo, setGeneralInfo] = useState<GeneralInfo>(INIT_USER_DATA);

  useEffect(() => {
    if (setDataCopy) setDataCopy(generalInfo);
  }, [generalInfo]);

  useEffect(() => {
    if (setSpotifyDataCopy) setSpotifyDataCopy(spotifyData);
  }, [spotifyData]);

  return (
    <SpotifyContext.Provider
      value={{ data: spotifyData, setData: setSpotifyData }}
    >
      <GeneralInfoContext.Provider
        value={{ data: generalInfo, setData: setGeneralInfo }}
      >
        {children}
      </GeneralInfoContext.Provider>
    </SpotifyContext.Provider>
  );
}
