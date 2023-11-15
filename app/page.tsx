'use client';

import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Dashboard from './components/Dashboard/Dashboard';
import SongGridCard from './components/SongGrid/SongGridCard';
import { useEffect, useState } from 'react';
import { SpotifyData, SpotifyContext } from './spotify/SpotifyProvider';
import { getSpotifyAccessToken } from './spotify/api';

const apiKey = '19fce7acf3e94922904d9a6e63e6112c';
const apiSecret = '298c80a0a18a4314bb9a32905f5d862e';

export default function Home() {
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  const [spotifyData, setSpotifyData] = useState<SpotifyData>({ bearerToken: ""});

  useEffect(() => {
    getSpotifyAccessToken(apiKey, apiSecret)
    .then((bearerToken) => {
      setSpotifyData({...spotifyData, bearerToken})
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }, [])

  return (
    <ThemeProvider theme={darkTheme}>
      <SpotifyContext.Provider value={{ data: spotifyData, setData: setSpotifyData}}>
        <CssBaseline />
        <main className="flex flex-row h-screen">
          <Dashboard />
          <SongGridCard />
        </main>
      </SpotifyContext.Provider>
      
    </ThemeProvider>
  )
}
