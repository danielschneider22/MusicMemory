import { SpotifyContext } from "@/app/spotify/SpotifyProvider";
import { SpotifyTrack, spotifySearchTrack } from "@/app/spotify/api";
import { filterUniqueSongs } from "@/app/utils";
import Autocomplete from "@mui/material/Autocomplete";
import { useContext, useState } from "react";
import { artistList } from "./ArtistList";
import TextField from "@mui/material/TextField";
import TypeList from "../../utilsComponents/TypeList";
import { GeneralInfoContext } from "@/app/GeneralInfoContext";
import { itunesSongs } from "@/app/songs";

export default function ArtistCard() {
    const [ artist, setArtist ] = useState({ label: "" })
    const [ numToGenerate, setNumToGenerate ] = useState(7)
    const [ showAllOfArtist, toggleAllOfArtist ] = useState(false)
    const { data, setData } = useContext(SpotifyContext)!;
    const { data: generalInfoData, setData: setGeneralInfoData } = useContext(GeneralInfoContext)!;
    
    const setArtistsAndSongs = (artistSongs: {artist: string; title: string;album: string;genre: string;}[]) => {
      setData!((prevData) => {
        const newSongList = filterUniqueSongs([...prevData.songList, ...artistSongs]).map((track) => {return {...track, type: "Artist Picker"}})
        return { ...prevData, songList: newSongList };
      });
      setGeneralInfoData!({...generalInfoData, artists: [...generalInfoData.artists, artist.label]})
      setArtist({ label: "" })
    }

    function removeSimilarSongs(songList: SpotifyTrack[]) {
      const nonRepeatingList: SpotifyTrack[] = [];
  
      // Helper function to check similarity
      function isSimilar(str1: string, str2: string): boolean {
          // You can implement more sophisticated similarity checks here
          return str2.toLowerCase().includes(str1.toLowerCase()) ;
      }
  
      // Iterate through the song list
      for (const song of songList) {
          let isUnique = true;
  
          // Check against existing songs in nonRepeatingList
          for (const existingSong of nonRepeatingList) {
              if (isSimilar(song.name, existingSong.name)) {
                  isUnique = false;
                  break;
              }
          }
  
          // If not similar to any existing song, add to the nonRepeatingList
          if (isUnique) {
              nonRepeatingList.push(song);
          }
      }
  
      return nonRepeatingList;
  }

    const addArtistSongs = () => {
      const artistSongs = itunesSongs.filter((iSong) => iSong.artist.toLowerCase().includes(artist.label.toLowerCase()))
      if(showAllOfArtist || artistSongs.length <= numToGenerate) {
        setArtistsAndSongs(artistSongs);
      } else {
        spotifySearchTrack(`artist:${artist.label}`, 50).then((tracks) => {
          if(tracks) {
            let spotifyTracks = tracks.filter((track) => track.artist.toLowerCase() === artist.label.toLowerCase())
            const artistSongs = itunesSongs.filter((iSong) => iSong.artist.toLowerCase().includes(artist.label.toLowerCase()))
            spotifyTracks = removeSimilarSongs(spotifyTracks);
            // Filter out songs from arrayA that are also present in arrayB
            let filteredSongs = artistSongs.filter(song => spotifyTracks.some((t) => t.name.includes(song.title)));

            // Sort the filtered songs by popularity
            filteredSongs.sort((a, b) => {
              return spotifyTracks.find((t) => t.name.toLowerCase().includes(b.title.toLowerCase()))!.popularity - spotifyTracks.find((t) => t.name.toLowerCase().includes(a.title.toLowerCase()))!.popularity;
            });

            // Get the songs from arrayA that are not in arrayB
            const remainingSongs = artistSongs.filter(song => !spotifyTracks.some((t) => song.title.toLowerCase() === t.name.toLowerCase()));

            // Concatenate filtered and sorted songs with remaining songs
            const sortedArrayA = filteredSongs.concat(remainingSongs);
            setArtistsAndSongs(sortedArrayA.slice(0, numToGenerate))
          }
        })
      }
    };

    function setArtists(artists: string[], removedArtist: string) {
      const songList = data.songList.filter((song) => !song.artist.toLowerCase().includes(removedArtist.toLowerCase()));
      setGeneralInfoData!({...generalInfoData, artists: artists});
      setData!({...data, songList});
    }

    let css = "peer-focus:font-medium absolute text-sm  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 disabled:text-gray-200 text-gray-400";
    if(showAllOfArtist)
      css += " text-gray-600"
    return (
      <div className={"bg-gray-800 rounded-lg shadow-lg text-gray-200 pt-8 pb-8"}>
          <h1 className="text-center mb-4 text-xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white">Artists</h1>
          <div className="grid md:grid-cols-1 md:gap-6">
                <Autocomplete
                    blurOnSelect={true}
                    options={artistList}
                    value={artist}
                    sx={{ width: '100%', color: "white" }}
                    className={"pl-8 pr-8"}
                    style={{color: "white !important"}}
                    renderInput={(params) => {
                        return <TextField {...params} style={{color: "white !important"}} label="Artist" />
                    }}
                    onChange={(event, newValue) => {
                      setArtist(newValue!)
                    }}
                    onInputChange={(e, value) => {
                      setArtist({ label: value })
                    }}
                    clearIcon={false}
                />
              <div className="relative z-0 w-full group text-left pl-8 pr-8">
                <input disabled={showAllOfArtist} type="number" max={50} value={numToGenerate} onChange={(ev) => setNumToGenerate(Math.min(Number(ev.currentTarget.value), 50))} name="floating_num_to_generate" id="floating_num_to_generate" className="block py-2.5 px-0 w-full text-md bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer  text-white disabled:text-gray-600" placeholder=" " required />
                <label htmlFor="floating_num_to_generate" className={css}># Songs to Generate</label>
              </div>
              <div className="relative z-0 w-full group text-left pl-8 pr-8">
                <input className="cursor-pointer" type="checkbox" checked={showAllOfArtist} onChange={(ev) => toggleAllOfArtist(ev.target.checked)} name="floating_all_of_artist" id="floating_all_of_artist"  placeholder=" " required />
                <label htmlFor="floating_all_of_artist" className="cursor-pointer peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 ml-3">Add all songs by artist</label>
              </div>
              <TypeList setList={setArtists} list={generalInfoData.artists} className={"pl-4 pr-4"}/>
              <button disabled={!artist.label} onClick={() => addArtistSongs()} id="button" type="button" className="disabled:bg-indigo-800 bg-indigo-600 shadow-xl hover:bg-indigo-500 text-white font-bold rounded-full p-4 w-48 mx-auto">Add Songs</button>
          </div>
          {/* <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button> */}
      </div>
    )
  }
  