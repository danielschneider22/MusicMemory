'use client';

import { GeneralInfoContext } from '@/app/GeneralInfoContext';
import { SpotifyContext } from '@/app/spotify/SpotifyProvider';
import { spotifySearchTrack } from '@/app/spotify/api';
import { filterUniqueSongs } from '@/app/utils';
import React, { ChangeEvent, useContext, useRef, useState } from 'react'
import Modal from '../Modal/Modal';

const Footer = ({gridAPI}: {gridAPI: any}) => {
    const { data, setData } = useContext(SpotifyContext)!;
    const { data: generalInfoData, setData: setGeneralInfoData } = useContext(GeneralInfoContext)!;
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [modalShown, setShowModal] = useState(false)

    const exportUserData = () => {
      const userData = {generalInfoData, songList: data.songList}
      const blob = new Blob([JSON.stringify(userData)], { type: 'text/plain' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = `${generalInfoData.firstName}_${generalInfoData.lastName}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    const importUserData = (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const parsedData = JSON.parse(e.target?.result as string);
            setData!({...data, songList: parsedData.songList})
            setGeneralInfoData!({...data, ...parsedData.generalInfoData})
          } catch (error) {
            console.error('Error parsing JSON:', error);
          }
        };
        reader.readAsText(file);
      }
    };

    const handleFileInputClick = () => {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    };

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
        spotifySearchTrack(song, 5).then((tracks) => {
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
    <>
      <div className="w-screen flex justify-center space-x-2 pt-4 border-b border-b-gray-800">
        <button onClick={exportUserData} type="button" className="text-white p-3 w-48 bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-m px-5 py-2.5  mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Save User</button>
        <input ref={fileInputRef} type="file" onChange={importUserData} accept=".json" className="hidden" />
        <button onClick={handleFileInputClick} type="button" className="text-white p-3 w-48 bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-m px-5 py-2.5  mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Load User</button>
        <button onClick={() => setShowModal(true)} id="button" type="submit" className="bg-purple-600 shadow-xl hover:bg-purple-500 p-3 w-48 font-medium rounded-lg text-m py-2.5  mb-2">Bulk Add Songs</button>
        <button onClick={() => onExportButtonClick()} id="button" type="submit" className="bg-green-600 shadow-xl hover:bg-green-500 p-3 w-48 font-medium rounded-lg text-m py-2.5  mb-2">Export Songs to CSV</button>
        <button onClick={() => exportItunesPlaylist()} id="button" type="submit" className="bg-slate-600 shadow-xl hover:bg-slate-500 p-3 w-48 font-medium rounded-lg text-m py-2.5  mb-2">Create Apple Playlist</button>
      </div>
      {modalShown && <Modal closeModal={() => setShowModal(false)} placeholder={placeholderText} header={"Bulk Add Songs"} onSubmit={(text) => { bulkUploadSongs(text); setShowModal(false)}}/>}
    </>
    
  )
}

export default Footer