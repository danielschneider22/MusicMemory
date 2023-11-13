import GenreButton from "./GenreButton";

export default function GenreCard() {
    return (
      <div className="p-2 pt-8 bg-gray-800 rounded-lg shadow-lg text-gray-200 text-center">
          <h1 className="text-center mb-4 text-xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-xl dark:text-white">Genre Picker</h1>
          <div className="grid grid-cols-3 gap-1">
            {["Blues", "Classical", "Country", "Electronic", "Folk", "Hip Hop", "Indie", "Jazz", "Metal", "Pop", "Punk", "R&B", "Reggae", "Rock", "Soul"].map((genre) => 
              <GenreButton genre={genre} />
            )}
          </div>
          <div className="relative pl-8 pr-8 z-0 w-full mb-6 group mt-6 text-left">
                <input type="number" name="floating_num_to_generate" id="floating_num_to_generate" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label htmlFor="floating_num_to_generate" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"># Songs per Genre</label>
          </div>
          <button id="button" type="submit" className="bg-indigo-600 shadow-xl hover:bg-indigo-500 text-white font-bold rounded-full p-4 w-48 mx-auto">Add Songs</button>
          
    </div>
    )
  }
  