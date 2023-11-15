'use client';

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import CssBaseline from '@mui/material/CssBaseline';
import { useContext, useState } from 'react';
import { SpotifyTrack, spotifySearchTrack } from '@/app/spotify/api';
import { SpotifyContext } from '@/app/spotify/SpotifyProvider';
import { GeneralInfoContext } from '@/app/GeneralInfoContext';

const getOptionLabel = (option: SpotifyTrack) => `${option.name} - ${option.artist}`;

export default function SongInputArea({gridAPI} : {gridAPI: any}) {
    const [selectedSong, setSelectedSong] = useState<SpotifyTrack | null>(null);
    const [options, setOptions] = useState<SpotifyTrack[]>([])
    const { data, setData } = useContext(SpotifyContext)!;
    const { data: generalInfoData } = useContext(GeneralInfoContext)!;

    const onExportButtonClick = () => {
      const params = {
        fileName: `${generalInfoData.firstName}_${generalInfoData.lastName}.csv`,
        columnSeparator: ',',
      };
      gridAPI.exportDataAsCsv(params);
  };
    
    return (
        <div>
            <div className="grid md:grid-cols-2 md:gap-x-6">
                <div className="relative z-0 w-full mb-6 group">
                <CssBaseline />
                <Autocomplete
                    blurOnSelect={true}
                    options={options}
                    getOptionLabel={getOptionLabel}
                    value={selectedSong}
                    sx={{ width: '100%', color: "white" }}
                    style={{color: "white !important"}}
                    renderInput={(params) => {
                        return <TextField {...params} style={{color: "white !important"}} label="Search Song" />
                    }}
                    onChange={(event, newValue) => {
                      if(newValue) {
                        const newSongList = [...data.songList, newValue].filter(
                          (song, index, self) =>
                            index ===
                            self.findIndex((s) => s.name === song.name && s.artist === song.artist)
                        );
                        setData!({...data, songList: newSongList});
                        setSelectedSong(null)
                      }
                    }}
                    onInputChange={(e, value) => {
                      if(value.length >= 3) {
                        spotifySearchTrack(value, data.bearerToken).then((data) => {
                          setOptions(data);
                        })
                      }
                    }}
                />
                </div>
                <div className="grid md:grid-cols-3 md:gap-x-1">
                    <button id="button" type="submit" className="bg-green-600 mb-3 shadow-xl hover:bg-green-500 text-white font-bold rounded-lg w-full">Bulk Add Songs</button>
                    <button onClick={() => onExportButtonClick()} id="button" type="submit" className="bg-orange-600 mb-3 shadow-xl hover:bg-orange-500 text-white font-bold rounded-lg w-full">Export to CSV</button>
                    <button id="button" type="submit" className="bg-slate-600 mb-3 shadow-xl hover:bg-slate-500 text-white font-bold rounded-lg w-full">Create Apple Playlist</button>
                </div>
                
            </div>
        </div>
        
    )
  }
  