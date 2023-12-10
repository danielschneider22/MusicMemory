'use client';

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import CssBaseline from '@mui/material/CssBaseline';
import { useContext, useState } from 'react';
import { SpotifyContext } from '@/app/spotify/SpotifyProvider';
import { filterUniqueSongs } from '@/app/utils';
import { Song, itunesSongs } from '@/app/songs';

const getOptionLabel = (option: Song) => `${option.title} - ${option.artist} (${option.album})`;

export default function SongInputArea() {
    const [selectedSong, setSelectedSong] = useState<Song | null>(null);
    const { data, setData } = useContext(SpotifyContext)!;

    return (
        <div>
            <div className="w-full">
                <div className="relative z-0 w-full mb-6 group">
                <CssBaseline />
                <Autocomplete
                    blurOnSelect={true}
                    options={itunesSongs}
                    getOptionLabel={getOptionLabel}
                    value={selectedSong}
                    sx={{ width: '100%', color: "white" }}
                    style={{color: "white !important"}}
                    renderInput={(params) => {
                        return <TextField {...params} style={{color: "white !important"}} label="Search Song" />
                    }}
                    onChange={(event, newValue) => {
                      if(newValue) {
                        const newSongList = filterUniqueSongs([...data.songList, newValue])
                        setData!({...data, songList: newSongList});
                        setSelectedSong(null)
                      }
                    }}
                    // onInputChange={(e, value) => {
                    //   if(value.length >= 3) {
                    //     spotifySearchTrack(value, 10).then((data) => {
                    //       setOptions(data);
                    //     })
                    //   }
                    // }}
                />
                </div>
            </div>
        </div>
        
    )
  }
  