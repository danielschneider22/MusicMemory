// RemoveButtonRenderer.tsx

import { SpotifyContext } from '@/app/spotify/SpotifyProvider';
import * as React from 'react';

interface RemoveButtonRendererProps {
  api: any; // ag-Grid API
  node: any; // ag-Grid row node
}

const RemoveButtonRenderer: React.FC<RemoveButtonRendererProps> = ({ api, node }) => {
  const { data, setData } = React.useContext(SpotifyContext)!;
  
  const onRemoveButtonClicked = () => {
    const selectedRow = node.data;
    setData!({...data, songList: data.songList.filter((song) => song.name !== selectedRow.name)})
  };

  return (
    <button className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-1 me-2 mb-2 dark:bg-red-700 dark:hover:bg-red-800 dark:focus:ring-red-900" onClick={onRemoveButtonClicked}>
      Remove
    </button>
  );
};

export default RemoveButtonRenderer;