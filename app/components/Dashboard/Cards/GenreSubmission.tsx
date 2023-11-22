'use client';

import { Dispatch, SetStateAction, useState } from "react";
import TypeList from "../../utilsComponents/TypeList";

interface Props {
  disabled: boolean,
  genre: string
  setGenre: Dispatch<SetStateAction<{label: string}>>
  setLoading: Dispatch<SetStateAction<boolean>>
}

export default function GenreSubmission({ disabled, genre, setGenre, setLoading }: Props) {
    const [numSongs, setNumSongs] = useState(20);
    const [genres, setGenres] = useState<string[]>([]);
    const getGenreSongs = async () => {
      setLoading(true)
      try{
        const body = {
          genre: "Rock",
          numRequested: 50,
          lowerDate: 1935,
          upperDate: 1965
        }
        const response = await fetch("/api/genreSongs", { body: JSON.stringify(body), method: "POST" })
        const json = await response.json();
        setGenres([...genres, genre])
        setGenre({ label: ""})
        setLoading(false)
      } catch(e) {
        setLoading(false)
        console.error("Error loading genre songs")
      }
    }
    return (
        <>
          <div className="relative pl-8 pr-8 z-0 w-full mb-6 group mt-6 text-left">
                <input disabled={disabled} type="number" name="floating_num_to_generate" id="floating_num_to_generate" className="block py-2.5 px-0 w-full text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required value={numSongs} onChange={(e) => setNumSongs(Number(e.target.value))}/>
                <label htmlFor="floating_num_to_generate" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"># Songs per Genre</label>
          </div>
          {/* <div className="relative pl-8 pr-8 z-0 w-full mb-6 group mt-6 text-left">
                <input disabled={props.disabled} type="checkbox" name="floating_ignore_age" id="floating_num_to_generate" className="block py-2.5 px-0 w-full text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required value={numSongs} onChange={(e) => setNumSongs(Number(e.target.value))}/>
                <label htmlFor="floating_ignore_age" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"># Songs per Genre</label>
          </div> */}
          <TypeList setList={setGenres} list={genres} className={"pl-4 pr-4 pb-2"} />
          <button onClick={getGenreSongs} disabled={disabled} id="button" type="submit" className="bg-indigo-600 mb-6 shadow-xl hover:bg-indigo-500 text-white font-bold rounded-full p-4 w-48 mx-auto">Add Songs</button>
        </>
    )
  }
  