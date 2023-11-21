'use client'

import { GeneralInfoContext } from "@/app/GeneralInfoContext";
import { useContext, useState } from "react";
import GenreSubmission from "./GenreSubmission";
import { Autocomplete, TextField } from "@mui/material";

const genreList = ["Country", "Pop", "Rock", "Folk", "R&B/Soul", "Latin", "Blues/Reggae", "Gospel/Hymns", "Jazz", "Broadway", "Big Band/Swing", "Classical", "Opera", "Disco", "Beach"].map((genre) => { return {label: genre}})

export default function GenreCard() {
    const { data } = useContext(GeneralInfoContext)!;
    const [genre, setGenre] = useState({ label: ""})

    return (
      <div className={`p-2 pt-8 bg-gray-800 rounded-lg shadow-lg text-gray-200 text-center ${!data.currAge && 'opacity-20'}`}>
          <h1 className="text-center mb-4 text-xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white">Genres</h1>
          {/* <div className="grid grid-cols-3 gap-1">
            {["Country", "Pop", "Rock", "Folk", "R&B/Soul", "Latin", "Blues/Reggae", "Gospel/Hymns", "Jazz", "Broadway", "Big Band/Swing", "Classical", "Opera", "Disco", "Beach"].map((genre) => 
              <GenreButton disabled={!data.currAge} key={genre} genre={genre} />
            )}
          </div> */}
          <Autocomplete
                blurOnSelect={true}
                options={genreList}
                value={genre}
                sx={{ width: '100%', color: "white" }}
                className={"pl-8 pr-8"}
                style={{color: "white !important"}}
                renderInput={(params) => {
                    return <TextField {...params} style={{color: "white !important"}} label="Genre" />
                }}
                onChange={(event, newValue) => {
                  setGenre(newValue!)
                }}
                onInputChange={(e, value) => {
                  setGenre({ label: value })
                }}
                disabled={!data.currAge}
            />
          <GenreSubmission disabled={!data.currAge} />
    </div>
    )
  }
  