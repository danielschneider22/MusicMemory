import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import {
  mockItunesSongs,
  mockPreselectedSongLists,
  spotifyDataCopyTuple,
} from "../../config/initState";
import userEvent from "@testing-library/user-event";
import PreselectedSongsCard from "@/app/components/Dashboard/Cards/PreselectedSongsCard";
import { AppWrapper } from "../../config/appWrapper";

jest.mock("../../../../songs", () => ({
  get itunesSongs() {
    return mockItunesSongs;
  },
  get preselectedSongLists() {
    return mockPreselectedSongLists;
  },
  get preselectedSongListsArr() {
    return {};
  },
}));

describe("Preselected songs card", () => {
  it("renders the preselected songs card", () => {
    render(<PreselectedSongsCard />);
    const cardElement = screen.getByText(/Preselected Songs/i);
    expect(cardElement).toBeInTheDocument();

    const preselectedSongList = screen.getByTestId("preselected-songs");
    expect(preselectedSongList.children).toHaveLength(
      Object.keys(mockPreselectedSongLists).length
    );
  });

  it("selecting a song list adds it to song data", async () => {
    let [spotifyDataCopy, setSpotifyDataCopy] = spotifyDataCopyTuple();

    render(
      <AppWrapper setSpotifyDataCopy={setSpotifyDataCopy}>
        <PreselectedSongsCard />
      </AppWrapper>
    );

    const el: HTMLInputElement = screen.getByLabelText("60s Country");
    await userEvent.click(el);

    waitFor(() => {
      // State Assertions
      expect(spotifyDataCopy.current.songList).toStrictEqual([
        {
          artist: "Mock Artist 1",
          title: "Song1",
          album: "Album1",
          genre: "Pop",
        },
        {
          artist: "Mock Artist 1",
          title: "Song2",
          album: "Album1",
          genre: "Pop",
        },
      ]);

      // UI Assertion
      expect(el.checked).toBe(true);
    });
  });

  it("removing a song list removes song data", async () => {
    let [spotifyDataCopy, setSpotifyDataCopy] = spotifyDataCopyTuple();

    render(
      <AppWrapper setSpotifyDataCopy={setSpotifyDataCopy}>
        <PreselectedSongsCard />
      </AppWrapper>
    );

    const el: HTMLInputElement = screen.getByLabelText("60s Country");
    await userEvent.click(el);

    waitFor(() => {
      expect(el.checked).toBe(true);
    });

    await userEvent.click(el);

    waitFor(() => {
      // State Assertions
      expect(spotifyDataCopy.current.songList).toStrictEqual([]);

      // UI Assertion
      expect(el.checked).toBe(false);
    });
  });
});
