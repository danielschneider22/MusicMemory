"use client";

import { Dispatch, SetStateAction, useContext, useState } from "react";
import TypeList from "../../utilsComponents/TypeList";
import { GeneralInfoContext } from "@/app/GeneralInfoContext";
import { filterUniqueSongs } from "@/app/utils";
import { SpotifyContext } from "@/app/spotify/SpotifyProvider";
import { itunesSongs } from "@/app/songs";

interface Props {
  disabled: boolean;
  genre: string;
  setGenre: Dispatch<SetStateAction<{ label: string }>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

export default function GenreSubmission({
  disabled,
  genre,
  setGenre,
  setLoading,
}: Props) {
  const [numSongs, setNumSongs] = useState(20);
  const { data: generalInfoData, setData: setGeneralInfoData } =
    useContext(GeneralInfoContext)!;
  const { setData } = useContext(SpotifyContext)!;

  const getGenreSongs = async () => {
    setLoading(true);
    try {
      const currYear = new Date().getFullYear();
      const lowerDate =
        currYear - (generalInfoData.currAge! - generalInfoData.lowerAge);
      const upperDate =
        currYear - (generalInfoData.currAge! - generalInfoData.upperAge);
      const body = {
        genre,
        numRequested: numSongs,
        lowerDate,
        upperDate,
      };
      const response = await fetch("/api/genreSongs", {
        body: JSON.stringify(body),
        method: "POST",
      });
      const json = await response.json();
      setGeneralInfoData!({
        ...generalInfoData,
        genres: [...generalInfoData.genres, genre],
      });
      setGenre({ label: "" });
      setLoading(false);
      json.songs.forEach((song: string, i: number) => {
        const foundSong = itunesSongs.find((iSong) =>
          iSong.title.toLowerCase().includes(song.toLowerCase())
        );
        if (foundSong) {
          setData!((prevData) => {
            const newSongList = filterUniqueSongs([
              ...prevData.songList,
              { ...foundSong, type: "Genre Picker" },
            ]);
            return { ...prevData, songList: newSongList };
          });
        }
        // setTimeout(() => {
        //   spotifySearchTrack(song, 1).then((result) => {
        //     setData!((prevData) => {
        //       const newSongList = filterUniqueSongs([...prevData.songList, {...result[0], type: "Genre Picker"}])
        //       return { ...prevData, songList: newSongList };
        //     });
        //   })
        // }, i * 100);
      });
    } catch (e) {
      setLoading(false);
      console.error("Error loading genre songs");
    }
  };
  function setGenres(genres: string[]) {
    setGeneralInfoData!({ ...generalInfoData, genres });
  }
  return (
    <>
      <div className="relative pl-8 pr-8 z-0 w-full mb-6 group mt-6 text-left">
        <input
          disabled={disabled}
          type="number"
          name="floating_num_to_generate"
          id="floating_num_to_generate"
          className="block py-2.5 px-0 w-full text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
          value={numSongs}
          onChange={(e) => setNumSongs(Number(e.target.value))}
        />
        <label
          htmlFor="floating_num_to_generate"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          # Songs per Genre
        </label>
      </div>
      <TypeList
        setList={setGenres}
        list={generalInfoData.genres}
        className={"pl-4 pr-4 pb-2"}
      />
      <button
        data-testid="add-songs-button"
        onClick={getGenreSongs}
        disabled={disabled || !genre}
        id="button"
        type="submit"
        className="disabled:bg-indigo-800 bg-indigo-600 mb-6 shadow-xl hover:bg-indigo-500 text-white font-bold rounded-full p-4 w-48 mx-auto"
      >
        Add Songs
      </button>
    </>
  );
}
