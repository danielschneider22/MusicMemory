import GenreButton from "./GenreButton";

export default function GenreCard() {
    return (
      <div className="max-w-full p-8 bg-gray-800 rounded-lg shadow-lg text-gray-200 sm:w-1/2calc w-screen">
          {["Rock", "Pop", "Country", "Jazz", "Blues", "Reggae", "Classical", "R&B", "Folk", "Metal", "Punk", "Soul", "Electronic", "Hip Hop", "Indie"].map((genre) => 
            <GenreButton genre={genre} />
          )}
    </div>
    )
  }
  