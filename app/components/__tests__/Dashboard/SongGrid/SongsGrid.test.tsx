import "@testing-library/jest-dom";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { mockItunesSongs, spotifyDataCopyTuple } from "../../config/initState";
import SongsGrid from "@/app/components/SongGrid/SongsGrid";
import { useState } from "react";
import { AppWrapper } from "../../config/appWrapper";

jest.mock("../../../../songs", () => ({
  get itunesSongs() {
    return mockItunesSongs;
  },
}));

function getRowGroup() {
  return screen.getByRole("rowgroup", {
    name: (_accessibleName, element) =>
      element.classList.contains("ag-center-cols-container"),
  });
}

describe("Songs Grid", () => {
  it("renders empty songs grid UI", () => {
    function FakeGrid() {
      const [gridApi, setGridAPI] = useState<any>();

      return <SongsGrid setGridAPI={setGridAPI} />;
    }
    render(<FakeGrid />);

    waitFor(() => {
      // Columns check
      const songCol = screen.getByText(/Song/i);
      expect(songCol).toBeInTheDocument();
      const artistCol = screen.getByText(/Artist/i);
      expect(artistCol).toBeInTheDocument();
      const albumCol = screen.getByText(/Album/i);
      expect(albumCol).toBeInTheDocument();
      const genreCol = screen.getByText(/Genre/i);
      expect(genreCol).toBeInTheDocument();
      const actionsCol = screen.getByText(/Actions/i);
      expect(actionsCol).toBeInTheDocument();

      // No Rows Text check
      const noRows = screen.getByText(/No Rows To Show/i);
      expect(noRows).toBeInTheDocument();
    });
  });

  it("renders songs grid UI with data", async () => {
    function FakeGrid() {
      const [gridApi, setGridAPI] = useState<any>();

      return (
        <AppWrapper populatedSongs>
          <SongsGrid setGridAPI={setGridAPI} />
        </AppWrapper>
      );
    }
    render(<FakeGrid />);

    await waitFor(() => {
      // Check songs are there
      const song1s = screen.getAllByText(/Song1/i);
      expect(song1s).toHaveLength(2);
      const song2 = screen.getByText(/Song2/i);
      expect(song2).toBeInTheDocument();
      const rowGroup = getRowGroup();
      expect(rowGroup.children).toHaveLength(3);
    });
  });

  it("deleting a row removes it from ui and data", async () => {
    let [spotifyDataCopy, setSpotifyDataCopy] = spotifyDataCopyTuple();

    function FakeGrid() {
      const [gridApi, setGridAPI] = useState<any>();

      return (
        <AppWrapper populatedSongs setSpotifyDataCopy={setSpotifyDataCopy}>
          <SongsGrid setGridAPI={setGridAPI} />
        </AppWrapper>
      );
    }
    render(<FakeGrid />);

    await waitFor(() => {
      const rowGroup = getRowGroup();
      expect(rowGroup.children).toHaveLength(3);
    });

    const removeButton = await screen.findByTestId(`button-remove-Song2`);
    expect(removeButton).toBeInTheDocument();
    await act(async () => {
      await fireEvent.click(removeButton);
    });

    await waitFor(() => {
      const rowGroup = getRowGroup();
      expect(rowGroup.children).toHaveLength(2);
      const song2 = screen.queryByText(/Song2/i);
      expect(song2).not.toBeInTheDocument();
      expect(spotifyDataCopy.current.songList).toStrictEqual([
        {
          artist: "Mock Artist 1",
          title: "Song1",
          album: "Album1",
          genre: "Pop",
        },
        {
          artist: "Mock Artist 2",
          title: "Song1 from artist 2",
          album: "Album2",
          genre: "Pop",
        },
      ]);
    });
  });
});
