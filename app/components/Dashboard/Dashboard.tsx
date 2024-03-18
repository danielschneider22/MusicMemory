'use client';

import GeneralInfoCard from "./Cards/GeneralInfoCard";
import GenreCard from "./Cards/GenreCard";
import ArtistCard from "./Cards/ArtistCard";
import PreselectedSongsCard from "./Cards/PreselectedSongsCard";

export default function Dashboard() {
    return (
        <span className="flex-1 p-5">
            {/* <h1 className="text-center mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white">User Dashboard</h1> */}
            <div className="grid grid-cols-2 gap-4 ">
                <GeneralInfoCard />
                <GenreCard />
                <ArtistCard />
                <PreselectedSongsCard />
            </div>
        </span>
    )
}
