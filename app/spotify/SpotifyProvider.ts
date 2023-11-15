import { Dispatch, SetStateAction, createContext } from "react";

export interface SpotifyData {
    bearerToken: string
}

export interface SpotifyProviderType {
    data: SpotifyData;
    setData?: Dispatch<SetStateAction<SpotifyData>>;
}

export const SpotifyContext = createContext<SpotifyProviderType>({ data: { bearerToken: ""}, setData: undefined});