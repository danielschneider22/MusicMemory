"use client";

import { GeneralInfoContext } from "@/app/GeneralInfoContext";
import { SpotifyContext } from "@/app/spotify/SpotifyProvider";
import { ChangeEvent, useContext } from "react";
import Input from "./Input";

export default function GeneralInfoCard() {
  const { data: generalInfoData, setData: setGeneralInfoData } =
    useContext(GeneralInfoContext)!;
  const { data } = useContext(SpotifyContext)!;

  function doChange(key: string, val: string) {
    setGeneralInfoData!({ ...generalInfoData, [key]: val });
  }

  return (
    <form className="p-8 bg-gray-800 rounded-lg shadow-lg text-gray-200 max-h-fit">
      <h1 className="text-center mb-8 text-xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white">
        General
      </h1>
      <div className="grid md:grid-cols-2 md:gap-x-6">
        <div className="relative z-0 w-full mb-6 group">
          <Input
            value={generalInfoData.firstName}
            onChange={(e) => doChange("firstName", e.target.value)}
            name="floating_first_name"
            id="floating_first_name"
            label="First Name"
          />
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <Input
            value={generalInfoData.lastName}
            onChange={(e) => doChange("lastName", e.target.value)}
            name="floating_last_name"
            id="floating_last_name"
            label="Last Name"
          />
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <Input
            value={generalInfoData.currAge || ""}
            onChange={(e) => doChange("currAge", e.target.value)}
            type="number"
            name="floating_age"
            id="floating_age"
            label="Current Age"
          />
        </div>
      </div>
      <div className="grid md:grid-cols-2 md:gap-6">
        <div className="relative z-0 w-full mb-6 group">
          <Input
            value={generalInfoData.lowerAge || ""}
            onChange={(e) => doChange("lowerAge", e.target.value)}
            type="number"
            name="floating_target_start_age"
            id="floating_target_start_age"
            label="Lower Age"
          />
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <Input
            value={generalInfoData.upperAge || ""}
            onChange={(e) => doChange("upperAge", e.target.value)}
            type="number"
            name="floating_upper_age"
            id="floating_upper_age"
            label="Upper Age"
          />
        </div>
      </div>
      <div className="text-center text-gray-500 dark:text-gray-400">
        Songs in Playlist: {data?.songList?.length}
      </div>
    </form>
  );
}
