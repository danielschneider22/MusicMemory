"use client";

import { SpotifyContext } from "@/app/spotify/SpotifyProvider";
import { ColDef, GridApi } from "@ag-grid-community/core";
import { AgGridReact } from "ag-grid-react";
import { Dispatch, useContext, useState } from "react";
import RemoveButtonRenderer from "./RemoveButtonRenderer";
import { Song } from "@/app/songs";

interface Props {
  setGridAPI: Dispatch<any>;
}

interface SongExtended extends Song {
  yesno: string;
  reactionnotes: string;
}

export default function SongsGrid({ setGridAPI }: Props) {
  const { data } = useContext(SpotifyContext)!;
  const columnDefs: ColDef<SongExtended, any>[] = [
    {
      headerName: "",
      valueGetter: "node.rowIndex + 1",
      width: 70,
    },
    {
      headerName: "Song",
      field: "title",
      sortable: true,
      filter: true,
      resizable: true,
      width: 300,
    },
    {
      headerName: "Artist",
      field: "artist",
      sortable: true,
      filter: true,
      resizable: true,
      width: 150,
    },
    {
      headerName: "Album",
      field: "album",
      sortable: true,
      filter: true,
      resizable: true,
      width: 100,
    },
    // { headerName: 'Date', field: "date", sortable: true, filter: true, resizable: true, width: 125,
    // cellRenderer: (params: any) => {
    //     // Format the date using your preferred date-fns or other date formatting library
    //     const formattedDate = new Date(params.value).toLocaleDateString();
    //     return formattedDate;
    // } },
    {
      headerName: "Genre",
      field: "genre",
      sortable: true,
      filter: true,
      resizable: true,
      width: 120,
    },
    { headerName: "Y/N", field: "yesno", hide: true },
    { headerName: "Reaction Notes", field: "reactionnotes", hide: true },
    {
      headerName: "Actions",
      cellRenderer: RemoveButtonRenderer,
      width: 100,
    },
  ];

  return (
    <div className="ag-theme-alpine-dark CardsGrid w-full h-full flex-grow">
      <AgGridReact
        rowData={data.songList}
        columnDefs={columnDefs as any}
        onGridReady={(params) => setGridAPI(params.api)}
      />
    </div>
  );
}
