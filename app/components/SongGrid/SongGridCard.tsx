import { useState } from "react";
import SongInputArea from "./SongInputArea";
import SongsGrid from "./SongsGrid";

export default function SongGridCard({ setGridAPI }: {setGridAPI: any}) {
    return (
        <div className="p-5 flex-1 flex flex-col">
            {/* <h1 className="text-center mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white">Curated Song List</h1> */}
            <SongInputArea />
            <SongsGrid setGridAPI={setGridAPI}/>
        </div>
        
    )
  }
  