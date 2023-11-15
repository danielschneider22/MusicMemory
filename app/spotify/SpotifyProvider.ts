import { Dispatch, SetStateAction, createContext } from "react";
import { SpotifyTrack } from "./api";

export interface SpotifyData {
    bearerToken: string,
    songList: SpotifyTrack[],
}

export interface SpotifyProviderType {
    data: SpotifyData;
    setData?: Dispatch<SetStateAction<SpotifyData>>;
}

export const SpotifyContext = createContext<SpotifyProviderType>({ data: { bearerToken: "", songList: []}, setData: undefined});