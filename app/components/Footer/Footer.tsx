'use client';

import { GeneralInfoContext } from '@/app/GeneralInfoContext';
import { SpotifyContext } from '@/app/spotify/SpotifyProvider';
import React, { ChangeEvent, useContext, useRef } from 'react'

const Footer = () => {
    const { data, setData } = useContext(SpotifyContext)!;
    const { data: generalInfoData, setData: setGeneralInfoData } = useContext(GeneralInfoContext)!;
    const fileInputRef = useRef<HTMLInputElement>(null);

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

  return (
    <div className="w-screen flex justify-center p-5 border-t border-t-gray-800 space-x-2">
        <button onClick={exportUserData} className="bg-indigo-600 shadow-xl hover:bg-indigo-500 text-white font-bold rounded-full p-4 w-48">Save User Profile</button>
        <input ref={fileInputRef} type="file" onChange={importUserData} accept=".json" className="hidden" />
        <button onClick={handleFileInputClick} className="bg-indigo-600 shadow-xl hover:bg-indigo-500 text-white font-bold rounded-full p-4 w-48">Load User Profile</button>
    </div>
  )
}

export default Footer