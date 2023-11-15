import GenreButton from "./GenreButton";
import GenreSubmission from "./GenreSubmission";

interface Props {
  currAge: number | undefined;
}

export default function GenreCard({currAge} : Props) {
    return (
      <div className={`p-2 pt-8 bg-gray-800 rounded-lg shadow-lg text-gray-200 text-center ${!currAge && 'opacity-20'}`}>
          <h1 className="text-center mb-4 text-xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white">Genre Picker</h1>
          <div className="grid grid-cols-3 gap-1">
            {["Blues", "Classical", "Country", "Electronic", "Folk", "Hip Hop", "Indie", "Jazz", "Metal", "Pop", "Punk", "R&B", "Reggae", "Rock", "Soul"].map((genre) => 
              <GenreButton key={genre} genre={genre} />
            )}
          </div>
          <GenreSubmission />
    </div>
    )
  }
  