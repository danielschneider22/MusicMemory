import { GeneralInfoContext } from "@/app/GeneralInfoContext";
import { useContext } from "react";
import GenreButton from "./GenreButton";
import GenreSubmission from "./GenreSubmission";

export default function GenreCard() {
    const { data } = useContext(GeneralInfoContext)!;

    return (
      <div className={`p-2 pt-8 bg-gray-800 rounded-lg shadow-lg text-gray-200 text-center ${!data.currAge && 'opacity-20'}`}>
          <h1 className="text-center mb-4 text-xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white">Genres</h1>
          <div className="grid grid-cols-3 gap-1">
            {["Country", "Pop", "Rock", "Folk", "R&B/Soul", "Latin", "Blues/Reggae", "Gospel/Hymns", "Jazz", "Broadway", "Big Band/Swing", "Classical", "Opera", "Disco", "Beach"].map((genre) => 
              <GenreButton disabled={!data.currAge} key={genre} genre={genre} />
            )}
          </div>
          <GenreSubmission disabled={!data.currAge} />
    </div>
    )
  }
  