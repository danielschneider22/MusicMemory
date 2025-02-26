"use client";

import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import CssBaseline from "@mui/material/CssBaseline";
import { useContext, useState } from "react";
import { SpotifyContext } from "@/app/spotify/SpotifyProvider";
import { Song, itunesSongs } from "@/app/songs";
import { filterUniqueSongs } from "@/app/utils";
import Checkbox from "@mui/material/Checkbox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import React from "react";
import { FixedSizeList, ListChildComponentProps } from "react-window";

const getOptionLabel = (option: Song) => `${option.title}`;

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

// Custom virtualized ListBoxComponent
const ListboxComponent = React.forwardRef<HTMLDivElement, any>(
  function ListboxComponent(props, ref) {
    const { children, ...other } = props;
    const ITEM_HEIGHT = 48;

    return (
      <div ref={ref} {...other}>
        <FixedSizeList
          height={250} // Adjust height
          width="100%"
          itemSize={ITEM_HEIGHT}
          itemCount={children.length}
        >
          {({ index, style }: ListChildComponentProps) => (
            <div style={style}>{children[index]}</div>
          )}
        </FixedSizeList>
      </div>
    );
  }
) as React.JSXElementConstructor<any>; // 👈 Ensure compatibility

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
  { title: "12 Angry Men", year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: "Pulp Fiction", year: 1994 },
  {
    title: "The Lord of the Rings: The Return of the King",
    year: 2003,
  },
  { title: "The Good, the Bad and the Ugly", year: 1966 },
  { title: "Fight Club", year: 1999 },
  {
    title: "The Lord of the Rings: The Fellowship of the Ring",
    year: 2001,
  },
  {
    title: "Star Wars: Episode V - The Empire Strikes Back",
    year: 1980,
  },
  { title: "Forrest Gump", year: 1994 },
  { title: "Inception", year: 2010 },
  {
    title: "The Lord of the Rings: The Two Towers",
    year: 2002,
  },
  { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { title: "Goodfellas", year: 1990 },
  { title: "The Matrix", year: 1999 },
  { title: "Seven Samurai", year: 1954 },
  {
    title: "Star Wars: Episode IV - A New Hope",
    year: 1977,
  },
  { title: "City of God", year: 2002 },
  { title: "Se7en", year: 1995 },
  { title: "The Silence of the Lambs", year: 1991 },
  { title: "It's a Wonderful Life", year: 1946 },
  { title: "Life Is Beautiful", year: 1997 },
  { title: "The Usual Suspects", year: 1995 },
  { title: "Léon: The Professional", year: 1994 },
  { title: "Spirited Away", year: 2001 },
  { title: "Saving Private Ryan", year: 1998 },
  { title: "Once Upon a Time in the West", year: 1968 },
  { title: "American History X", year: 1998 },
  { title: "Interstellar", year: 2014 },
];

export default function SongInputArea() {
  const [selectedSongs, setSelectedSongs] = useState<Song[] | undefined>(
    undefined
  );
  const [inputValue, setInputValue] = useState("");
  const [mykey, setMykey] = useState(0);
  const { data, setData } = useContext(SpotifyContext)!;

  const filterOptions = (options: Song[], { inputValue }: any) => {
    if (inputValue.length < 3) {
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
            key={mykey}
            multiple
            id="song-input"
            options={itunesSongs.sort((a, b) => customSort(a, b, ""))}
            disableCloseOnSelect
            value={selectedSongs}
            filterOptions={filterOptions}
            sx={{ width: "100%", color: "white" }}
            style={{ color: "white !important" }}
            inputValue={inputValue}
            ListboxComponent={ListboxComponent} // Use virtualized list
            onBlur={() => {
              setMykey(mykey + 1); // Clear the selected songs
            }}
            onInputChange={(event, newInputValue) => {
              if (event && event.currentTarget.tagName !== "LI") {
                setInputValue(newInputValue);
              }
            }}
            getOptionLabel={getOptionLabel}
            renderOption={(props, option, { selected }) => {
              const { key, ...optionProps } = props as any;
              return (
                <li key={option.id} {...optionProps}>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={data.songList.some(
                      (s) => option.title === s.title
                    )}
                  />
                  <span style={{ fontWeight: "bold" }}>
                    {option.title}&nbsp;
                  </span>
                  <span>
                    {" "}
                    - {truncateString(option.artist)} (
                    {truncateString(option.album)})
                  </span>
                </li>
              );
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search for a song or artist"
                placeholder="Favorites"
              />
            )}
            onChange={(event, newValue) => {
              if (newValue) {
                const newSongList = filterUniqueSongs(
                  [...data.songList, ...newValue],
                  false
                );
                setData!({ ...data, songList: newSongList });
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
