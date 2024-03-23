'use client';

import { Song } from "@/app/songs";
import { ColDef } from "@ag-grid-community/core";
import { AgGridReact } from "ag-grid-react";

import styles from "./SongChoicesModal.module.css"

interface Props{
    header: string,
    selectSong: (song: Song) => void,
    ignoreChoice: () => void,
    songChoice: Song[]
}

export default function SongChoicesModal({songChoice, ignoreChoice, selectSong}: Props) {
    const columnDefs: (ColDef<Song, any>)[] = [
        { headerName: 'Song', field: "title", sortable: true, filter: true, resizable: true, width: 300 },
        { headerName: 'Artist', field: "artist", sortable: true, filter: true, resizable: true, width: 150 },
        { headerName: 'Album', field: "album", sortable: true, filter: true, resizable: true, width: 200 }, 
        { headerName: 'Genre', field: "genre", sortable: true, filter: true, resizable: true, width: 120 },
    ];
  return (
    <>
        <div id="default-modal" tabIndex={-1}  className="bg-black bg-opacity-60 flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-full">
            <div className={`relative p-4 w-full max-h-full ${styles.ModalWidth}`}>
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Multiple Song Choices Found: Double Click to Select One
                        </h3>
                        <button onClick={() => ignoreChoice()} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div className={`p-4 md:p-5 space-y-4 ${styles.GridHeight}`}>
                        <div className="ag-theme-alpine-dark CardsGrid w-full h-full flex-grow">
                            <AgGridReact
                                rowData={songChoice} columnDefs={columnDefs as any}
                                onRowDoubleClicked={(event) => { if(event.data) selectSong(event.data)}}
                            />
                        </div>
                    </div>
                    <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                        <button onClick={() => ignoreChoice()} data-modal-hide="default-modal" type="button" className="ms-3 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Ignore Choice</button>
                    </div>
                </div>
            </div>
        </div>

    </>
  )
}
