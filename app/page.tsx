'use client';

import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Dashboard from './components/Dashboard/Dashboard';
import SongGridCard from './components/SongGrid/SongGridCard';
import { useState } from 'react';
import { SpotifyData, SpotifyContext } from './spotify/SpotifyProvider';
import { GeneralInfo, GeneralInfoContext } from './GeneralInfoContext';
import Footer from './components/Footer/Footer';


export default function Home() {
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  const [spotifyData, setSpotifyData] = useState<SpotifyData>({ bearerToken: "", songList: []});
  const [generalInfo, setGeneralInfo] = useState<GeneralInfo>({ firstName: "", lastName: "", lowerAge: 10, upperAge: 30, currAge: null});


  return (
    <ThemeProvider theme={darkTheme}>
      <SpotifyContext.Provider value={{ data: spotifyData, setData: setSpotifyData}}>
        <GeneralInfoContext.Provider value={{ data: generalInfo, setData: setGeneralInfo}}>
          <CssBaseline />
          <main className="flex flex-col h-screen">
            <div className="flex flex-row">
              <Dashboard />
              <SongGridCard />
            </div>
            <Footer />
          </main>
        </GeneralInfoContext.Provider>
      </SpotifyContext.Provider>
    </ThemeProvider>
  )
}
