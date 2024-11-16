"use client";

import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import Dashboard from "./components/Dashboard/Dashboard";
import SongGridCard from "./components/SongGrid/SongGridCard";
import { useState } from "react";
import { SpotifyData, SpotifyContext } from "./spotify/SpotifyProvider";
import { GeneralInfo, GeneralInfoContext } from "./GeneralInfoContext";
import Header from "./components/Footer/Header";

export default function Home() {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const [spotifyData, setSpotifyData] = useState<SpotifyData>({
    bearerToken: "",
    songList: [],
  });
  const [generalInfo, setGeneralInfo] = useState<GeneralInfo>({
    firstName: "Daniel",
    lastName: "Schneider",
    lowerAge: 15,
    upperAge: 25,
    currAge: null,
    genres: [],
    artists: [],
    preselectedSongsLists: [],
  });
  const [gridAPI, setGridAPI] = useState<any>();

  return (
    <ThemeProvider theme={darkTheme}>
      <SpotifyContext.Provider
        value={{ data: spotifyData, setData: setSpotifyData }}
      >
        <GeneralInfoContext.Provider
          value={{ data: generalInfo, setData: setGeneralInfo }}
        >
          <CssBaseline />
          <main className="flex flex-col h-screen">
            <Header gridAPI={gridAPI} />
            <div className="flex flex-row flex-grow">
              <Dashboard />
              <SongGridCard setGridAPI={setGridAPI} />
            </div>
          </main>
        </GeneralInfoContext.Provider>
      </SpotifyContext.Provider>
    </ThemeProvider>
  );
}
