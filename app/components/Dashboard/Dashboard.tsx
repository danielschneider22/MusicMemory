import GeneralInfoCard from "./Cards/GeneralInfoCard";
import GenreCard from "./Cards/GenreCard";
import SearchCard from "./Cards/SearchCard";

export default async function Dashboard() {
    return (
        <div className="grid grid-cols-2 gap-4 flex-1 p-5 border-r border-r-white">
            <GeneralInfoCard />
            <GenreCard />
            <SearchCard />
        </div>
    )
}
