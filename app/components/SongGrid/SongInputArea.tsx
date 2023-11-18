'use client';

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import CssBaseline from '@mui/material/CssBaseline';
import { useContext, useState } from 'react';
import { SpotifyTrack, spotifySearchTrack } from '@/app/spotify/api';
import { SpotifyContext } from '@/app/spotify/SpotifyProvider';
import { GeneralInfoContext } from '@/app/GeneralInfoContext';
import Modal from '../Modal/Modal';
import { filterUniqueSongs } from '@/app/utils';

const getOptionLabel = (option: SpotifyTrack) => `${option.name} - ${option.artist}`;

export default function SongInputArea({gridAPI} : {gridAPI: any}) {
    const [selectedSong, setSelectedSong] = useState<SpotifyTrack | null>(null);
    const [options, setOptions] = useState<SpotifyTrack[]>([])
    const { data, setData } = useContext(SpotifyContext)!;
    const { data: generalInfoData } = useContext(GeneralInfoContext)!;
    const [modalShown, setShowModal] = useState(false)

    const onExportButtonClick = () => {
      const params = {
        fileName: `${generalInfoData.firstName}_${generalInfoData.lastName}.csv`,
        columnSeparator: ',',
      };
      gridAPI.exportDataAsCsv(params);
    };

    const exportItunesPlaylist = () => {
      const quotedElements: string[] = data.songList.map(element => `"${element.name}"`);
      const result: string = quotedElements.join(', ');
      const content = `
      set playlistName to "${generalInfoData.firstName} ${generalInfoData.lastName}'s playlist"
      
      set songTitles to {${result}}
      
      tell application "iTunes"
          -- Create a new playlist
          set newPlaylist to make new playlist with properties {name:playlistName}
          
          -- Add songs to the playlist
          repeat with title in songTitles
              try
                  set trackToAdd to first track of library playlist 1 whose name is title
                  duplicate trackToAdd to newPlaylist
              end try
          end repeat
      end tell`;

      // Create a Blob with the text content
      const blob = new Blob([content], { type: 'text/plain' });

      // Create a link element
      const link = document.createElement('a');

      // Set the link's properties
      link.href = window.URL.createObjectURL(blob);
      link.download = `${generalInfoData.firstName}_${generalInfoData.lastName}_playlist.scpt`;

      // Append the link to the document
      document.body.appendChild(link);

      // Trigger a click on the link to start the download
      link.click();

      // Remove the link from the document
      document.body.removeChild(link);
    };

    const bulkUploadSongs = (text: string) => {
      text.split("\n").forEach((song) => {
        spotifySearchTrack(song, data.bearerToken, 5).then((tracks) => {
          const origTracks = tracks.sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);

            if (dateA < dateB) {
              return -1;
            } else if (dateA > dateB) {
              return 1;
            } else {
              return 0;
            }
          })
          if(origTracks) {
            setData!((prevData) => {
              const newSongList = filterUniqueSongs([...prevData.songList, origTracks[0]])
              return { ...prevData, songList: newSongList };
            });
          }
          
        })
      })
    };

    const placeholderText = "Stairway to Heaven\nHey Jude\nEye Of The Tiger";
    
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
                        const newSongList = filterUniqueSongs([...data.songList, newValue])
                        setData!({...data, songList: newSongList});
                        setSelectedSong(null)
                      }
                    }}
                    onInputChange={(e, value) => {
                      if(value.length >= 3) {
                        spotifySearchTrack(value, data.bearerToken, 10).then((data) => {
                          setOptions(data);
                        })
                      }
                    }}
                />
                </div>
                <div className="grid md:grid-cols-3 md:gap-x-1">
                    <button onClick={() => setShowModal(true)} id="button" type="submit" className="bg-green-600 mb-3 shadow-xl hover:bg-green-500 text-white font-bold rounded-lg w-full">Bulk Add Songs</button>
                    <button onClick={() => onExportButtonClick()} id="button" type="submit" className="bg-orange-600 mb-3 shadow-xl hover:bg-orange-500 text-white font-bold rounded-lg w-full">Export to CSV</button>
                    <button onClick={() => exportItunesPlaylist()} id="button" type="submit" className="bg-slate-600 mb-3 shadow-xl hover:bg-slate-500 text-white font-bold rounded-lg w-full">Create Apple Playlist</button>
                </div>
                {modalShown && <Modal closeModal={() => setShowModal(false)} placeholder={placeholderText} header={"Bulk Add Songs"} onSubmit={(text) => { bulkUploadSongs(text); setShowModal(false)}}/>}
                
            </div>
        </div>
        
    )
  }
  