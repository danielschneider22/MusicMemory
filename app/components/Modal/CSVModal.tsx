'use client';

import { useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField/TextField";
import csvParser from "csv-parser";

interface Props{
    header: string,
    onSubmit: (vals: {[key: string]: any}[]) => void
    placeholder: string,
    closeModal: () => void
}

const songKeys = ['artist', 'title', 'album', 'genre', 'type', 'OTHER'].map((genre) => { return {label: genre}});


export default function CSVModal({header, onSubmit, placeholder, closeModal}: Props) {
    const [text, setText] = useState("")
    const [cols, setCols] = useState([{ label: "title" }, { label: "artist" }, { label: "album" }])
    const [key, setKey] = useState(0);
    
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target) {
                    const csvString = e.target.result as string;
                    parseCSV(csvString);
                }
            };
            reader.readAsText(file);
        }
    };

    const parseCSV = (csvString: string) => {
        try{
            const rows = csvString.trim().split('\n');
            const parsedRows: any[] = rows.map((row) => {
                const columns = row.split(',');
                const json: {[key: string]: string} = {}
                cols.forEach((col, i) => {
                    json[col.label] = columns[i].trim();
                })
                return json;
            });
            onSubmit(parsedRows);
        } catch(e) {
            window.alert("There's something wrong with your csv file vs the columns you've chosen.")
            console.error("There's something wrong with your csv file vs the columns you've chosen.")
            console.error(e);
            setKey(key + 1);
        }
        
    };

    return (
    <>
        <div id="default-modal" tabIndex={-1}  className="bg-black bg-opacity-60 flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-full">
            <div className="relative p-4 w-full max-w-2xl max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            {header}
                        </h3>
                        <button onClick={() => closeModal()} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div className="p-5">
                        {cols.map((col, i) => {
                            return (
                                <div className="flex flex-row pt-5">
                                    <Autocomplete
                                        blurOnSelect={true}
                                        options={songKeys}
                                        value={col}
                                        sx={{ width: '100%', color: "white" }}
                                        className={"basis-3/4"}
                                        style={{color: "white !important"}}
                                        renderInput={(params) => {
                                            return <TextField {...params} style={{color: "white !important"}} label={"Column " + (i + 1)} />
                                        }}
                                        onChange={(event, newValue) => {
                                            const newCols = cols.slice();
                                            newCols[i] = newValue!;
                                            setCols(newCols);
                                        }}
                                        onInputChange={(e, value) => {
                                            const newCols = cols.slice();
                                            newCols[i] = { label: value };
                                            setCols(newCols);
                                        }}
                                        clearIcon={false}
                                    />
                                    <button onClick={() => {const newCols = cols.slice(0, i).concat(cols.slice(i + 1)); setCols(newCols)}} className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded basis-1/4">X</button>
                                </div>
                            )
                        })}
                    </div>
                    
                    <div className="w-100 align-middle text-center p-3">
                    <button onClick={() => setCols([...cols, { label: ""}])} className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded text-xl">
                        +
                        </button>
                    </div>
                    
                    <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                        <input key={key} onChange={handleFileChange} data-modal-hide="default-modal" type="file" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" />
                        <button onClick={closeModal} data-modal-hide="default-modal" type="button" className="ms-3 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Cancel</button>
                    </div>
                </div>
            </div>
        </div>

    </>
  )
}
