import { SpotifyContext } from "@/app/spotify/SpotifyProvider";
import { spotifySearchTrack } from "@/app/spotify/api";
import { filterUniqueSongs } from "@/app/utils";
import { useContext, useState } from "react";

export default function ArtistCard() {
    const [ artist, setArtist ] = useState("")
    const [ numToGenerate, setNumToGenerate ] = useState(20)
    const { data, setData } = useContext(SpotifyContext)!;

    const addArtistSongs = () => {
      spotifySearchTrack(`artist:${artist}`, data.bearerToken, numToGenerate).then((tracks) => {
        if(tracks) {
          const filteredTracks = tracks.filter((track) => track.artist.toLowerCase() === artist.toLowerCase())
          setData!((prevData) => {
            const newSongList = filterUniqueSongs([...prevData.songList, ...filteredTracks]).map((track) => {return {...track, type: "Artist Picker"}})
            return { ...prevData, songList: newSongList };
          });
          setArtist("")
        }
        
      })
    };
    return (
      <div className={"p-8 bg-gray-800 rounded-lg shadow-lg text-gray-200"}>
          <h1 className="text-center mb-4 text-xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white">Artist Picker</h1>
          <div className="grid md:grid-cols-1 md:gap-6">
              <div className="relative z-0 w-full mb-6 group">
                  <input value={artist} onChange={(ev) => setArtist(ev.currentTarget.value)} type="search" name="floating_artist" id="floating_artist" className="block py-2.5 px-0 w-full text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                  <label htmlFor="floating_artist" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Artist (must be exact)</label>
              </div>
              <div className="relative z-0 w-full mb-6 group text-left">
                <input type="number" value={numToGenerate} onChange={(ev) => setNumToGenerate(Number(ev.currentTarget.value))} name="floating_num_to_generate" id="floating_num_to_generate" className="block py-2.5 px-0 w-full text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label htmlFor="floating_num_to_generate" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"># Songs to Generate</label>
              </div>
              <button onClick={() => addArtistSongs()} id="button" type="button" className="bg-indigo-600 shadow-xl hover:bg-indigo-500 text-white font-bold rounded-full p-4 w-48 mx-auto">Add Songs</button>
          </div>
          {/* <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button> */}
      </div>
    )
  }
  