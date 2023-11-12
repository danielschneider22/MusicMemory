import GeneralInfoCard from "./Cards/GeneralInfoCard";
import GenreCard from "./Cards/GenreCard";
import SearchCard from "./Cards/SearchCard";

export default async function Dashboard() {
    return (
        <div className="flex p-5 sm:gap-x-4 gap-y-5 flex-col sm:flex-row flex-wrap">
            <GeneralInfoCard />
            <GenreCard />
            <SearchCard />
        </div>
    )
}
