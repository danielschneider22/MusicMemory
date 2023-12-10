import { Dispatch, SetStateAction, createContext } from "react";
import { SpotifyTrack } from "./api";
import { Song } from "../songs";

export interface SpotifyData {
    bearerToken: string,
    songList: Song[],
}

export interface SpotifyProviderType {
    data: SpotifyData;
    setData?: Dispatch<SetStateAction<SpotifyData>>;
}

export const SpotifyContext = createContext<SpotifyProviderType>({ data: { bearerToken: "", songList: []}, setData: undefined});