"use client";

import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import CssBaseline from "@mui/material/CssBaseline";
import { useContext, useState } from "react";
import { SpotifyContext } from "@/app/spotify/SpotifyProvider";
import { Song, itunesSongs } from "@/app/songs";
import { filterUniqueSongs } from "@/app/utils";

const getOptionLabel = (option: Song) =>
  `${option.title} - ${option.artist} - ${option.album}`;

export default function SongInputArea() {
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const { data, setData } = useContext(SpotifyContext)!;

  const filterOptions = (options: Song[], { inputValue }: any) => {
    if (inputValue.length < 2) {
      return [];
    }
    return options.filter(
      (option) =>
        option.title.toLowerCase().includes(inputValue.toLowerCase()) ||
        option.artist.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  function customSort(a: Song, b: Song, inputValue: string) {
    const songAIndex = a.title.toLowerCase().indexOf(inputValue.toLowerCase());
    const songBIndex = b.title.toLowerCase().indexOf(inputValue.toLowerCase());
    if (songAIndex !== -1 && songBIndex === -1) {
      return -1; // song A matches input, prioritize it
    } else if (songBIndex !== -1 && songAIndex === -1) {
      return 1; // song B matches input, prioritize it
    } else {
      return 0; // neither song matches input, preserve original order
    }
  }

  function truncateString(str: string): string {
    if (str.length > 20) {
      return str.substring(0, 20) + "...";
    } else {
      return str;
    }
  }

  return (
    <div>
      <div className="w-full">
        <div className="relative z-0 w-full mb-6 group">
          <CssBaseline />
          <Autocomplete
            filterOptions={filterOptions}
            blurOnSelect={true}
            options={itunesSongs.sort((a, b) => customSort(a, b, ""))}
            getOptionLabel={getOptionLabel}
            value={selectedSong}
            sx={{ width: "100%", color: "white" }}
            style={{ color: "white !important" }}
            renderInput={(params) => {
              return (
                <TextField
                  {...params}
                  style={{ color: "white !important" }}
                  label="Search Song"
                />
              );
            }}
            renderOption={(props, option) => (
              <li {...props} key={(props as any).key}>
                <span style={{ fontWeight: "bold" }}>{option.title}&nbsp;</span>
                <span>
                  {" "}
                  - {truncateString(option.artist)} (
                  {truncateString(option.album)})
                </span>
              </li>
            )}
            onChange={(event, newValue) => {
              if (newValue) {
                const newSongList = filterUniqueSongs([
                  ...data.songList,
                  newValue,
                ]);
                setData!({ ...data, songList: newSongList });
                setSelectedSong(null);
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
  );
}
