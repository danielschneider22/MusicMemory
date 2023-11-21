'use client';
import { useState } from "react"

export default function GenreButton(props: {genre: string, disabled: boolean}) {
    const [selected, setSelected] = useState(false);
    const selectedClasses = "whitespace-nowrap text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm text-center dark:bg-blue-500 dark:hover:bg-blue-600 h-6"
    const unselectedClasses = "opacity-40 whitespace-nowrap text-gray-300 bg-blue-900 hover:bg-blue-1000 focus:outline-none font-medium rounded-lg text-sm text-center dark:bg-blue-800 dark:hover:bg-blue-900 h-6"
    return (
        <button disabled={props.disabled} type="button" onClick={() => setSelected(!selected)} className={selected ? selectedClasses : unselectedClasses}>{props.genre}</button>
    )
  }
  