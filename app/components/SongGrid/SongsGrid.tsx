'use client';

import { SpotifyContext } from "@/app/spotify/SpotifyProvider";
import { SpotifyTrack } from "@/app/spotify/api";
import { ColDef, GridApi } from "@ag-grid-community/core";
import { AgGridReact } from "ag-grid-react";
import { Dispatch, useContext, useState } from "react";

interface Props{
    setGridAPI: Dispatch<any>;
}

export default function SongsGrid({setGridAPI}: Props) {
    const { data, setData } = useContext(SpotifyContext)!;
    const columnDefs: (ColDef<SpotifyTrack, any>)[] = [
        { headerName: 'Song', field: "name", sortable: true, filter: true },
        { headerName: 'Artist', field: "artist", sortable: true, filter: true },
        { headerName: 'Album', field: "album", sortable: true, filter: true },
        { headerName: 'Release Date', field: "date", sortable: true, filter: true, 
        cellRenderer: (params: any) => {
            // Format the date using your preferred date-fns or other date formatting library
            const formattedDate = new Date(params.value).toLocaleDateString();
            return formattedDate;
        } },
        { headerName: 'Type', field: "type", sortable: true, filter: true }
    ];
    
    return (
      <div className="ag-theme-alpine-dark CardsGrid w-full h-full flex-grow">
        <AgGridReact
            rowData={data.songList} columnDefs={columnDefs as any}
            onGridReady={(params) => (setGridAPI(params.api))}
        />
      </div>
    )
  }
  