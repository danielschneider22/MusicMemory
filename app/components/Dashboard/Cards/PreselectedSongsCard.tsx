import { SpotifyContext } from "@/app/spotify/SpotifyProvider";
import { ChangeEvent, useContext, useState } from "react";
import { GeneralInfoContext } from "@/app/GeneralInfoContext";
import { Song, itunesSongs, preselectedSongLists } from "@/app/songs";
import { filterUniqueSongs } from "@/app/utils";

export default function PreselectedSongsCard() {
    const { data, setData } = useContext(SpotifyContext)!;
    const { data: generalInfoData, setData: setGeneralInfoData } = useContext(GeneralInfoContext)!;

    const selectSong = (song: Song) => {
      setData!((prevData) => {
        const newSongList = filterUniqueSongs([...prevData.songList, song])
        return { ...prevData, songList: newSongList };
      });
    }
    const removeSong = (song: Song) => {
      setData!((prevData) => {
        const newSongList = prevData.songList.filter((s) => !s.title.toLowerCase().includes(song.title.toLowerCase()))
        return { ...prevData, songList: newSongList };
      });
    }

    function addOrRemoveSongs(ev: ChangeEvent<HTMLInputElement>, listTitle: string) {
      if(ev.target.checked) {
        setGeneralInfoData!({...generalInfoData, preselectedSongsLists: [...generalInfoData.preselectedSongsLists, listTitle]})
        preselectedSongLists[listTitle].forEach((song) => {
          const foundSongs = itunesSongs.filter((iSong) => iSong.title.toLowerCase().includes(song.toLowerCase()));
          if(foundSongs.length){
            selectSong(foundSongs[0])
          }
        });
      } else {
        setGeneralInfoData!({...generalInfoData, preselectedSongsLists: generalInfoData.preselectedSongsLists.filter((list) => list !== listTitle )})
        preselectedSongLists[listTitle].forEach((song) => {
          const foundSongs = itunesSongs.filter((iSong) => iSong.title.toLowerCase().includes(song.toLowerCase()));
          if(foundSongs.length){
            removeSong(foundSongs[0])
          }
        });
      }
    }
    
    return (
      <div className={"bg-gray-800 rounded-lg shadow-lg text-gray-200 pt-8 pb-8"}>
          <h1 className="text-center mb-4 text-xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white">Preselected Songs</h1>
          <div className="grid grid-cols-6 gap-4 overflow-scroll no-scrollbar" style={{maxHeight: "300px"}}>
            {Object.keys(preselectedSongLists).map((listTitle) => {
              const checked = generalInfoData && generalInfoData.preselectedSongsLists && generalInfoData.preselectedSongsLists.some((lT) => lT === listTitle)
              return (
                <>
                  <input className="col-span-1 cursor-pointer" checked={checked} type="checkbox" onChange={((ev) => addOrRemoveSongs(ev, listTitle))} id={`listCheckbox-${listTitle}`} style={{marginLeft: "auto", width: 30}}></input>
                  <label htmlFor={`listCheckbox-${listTitle}`} className="col-span-5 select-none cursor-pointer">{listTitle}</label>
                </>
              )
              })}
               
          </div>
      </div>
    )
  }
  