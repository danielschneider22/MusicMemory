'use client';

import { useState } from "react";
import GeneralInfoCard from "./Cards/GeneralInfoCard";
import GenreCard from "./Cards/GenreCard";
import ArtistCard from "./Cards/ArtistCard";

export default function Dashboard() {
    return (
        <span className="flex-1 p-5 border-r border-r-gray-800">
            <h1 className="text-center mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white">User Dashboard</h1>
            <div className="grid grid-cols-2 gap-4 ">
                <GeneralInfoCard />
                <GenreCard />
                <ArtistCard />
            </div>
        </span>
    )
}
