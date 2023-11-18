'use client';

import { SpotifyContext } from "@/app/spotify/SpotifyProvider";
import { SpotifyTrack } from "@/app/spotify/api";
import { ColDef, GridApi } from "@ag-grid-community/core";
import { AgGridReact } from "ag-grid-react";
import { Dispatch, useContext, useState } from "react";
import RemoveButtonRenderer from "./RemoveButtonRenderer";

interface Props{
    setGridAPI: Dispatch<any>;
}

const gridOptions = {
  frameworkComponents: {
    removeButtonRenderer: RemoveButtonRenderer,
  },
}

export default function SongsGrid({setGridAPI}: Props) {
    const { data, setData } = useContext(SpotifyContext)!;
    const columnDefs: (ColDef<SpotifyTrack, any>)[] = [
        { headerName: 'Song', field: "name", sortable: true, filter: true, resizable: true, width: 300 },
        { headerName: 'Artist', field: "artist", sortable: true, filter: true, resizable: true, width: 150 },
        { headerName: 'Album', field: "album", sortable: true, filter: true, resizable: true, width: 100 }, 
        { headerName: 'Date', field: "date", sortable: true, filter: true, resizable: true, width: 125,
        cellRenderer: (params: any) => {
            // Format the date using your preferred date-fns or other date formatting library
            const formattedDate = new Date(params.value).toLocaleDateString();
            return formattedDate;
        } },
        { headerName: 'Type', field: "type", sortable: true, filter: true, resizable: true, width: 120 },
        {
          headerName: 'Actions',
          cellRenderer: RemoveButtonRenderer,
          width: 100,
        },
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
  