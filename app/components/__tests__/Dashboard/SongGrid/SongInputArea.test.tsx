import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { mockItunesSongs, spotifyDataCopyTuple } from "../../config/initState";
import SongInputArea from "@/app/components/SongGrid/SongInputArea";
import userEvent from "@testing-library/user-event";
import { AppWrapper } from "../../config/appWrapper";

jest.mock("../../../../songs", () => ({
  get itunesSongs() {
    return mockItunesSongs;
  },
}));

describe("Song input area tests", () => {
  it("renders the song input area", () => {
    render(<SongInputArea />);
    const input = screen.getByLabelText(/Search Song/i);
    expect(input).toBeInTheDocument();
  });

  it("not typing anything results in no options shown", () => {
    render(<SongInputArea />);
    const input = screen.getByLabelText(/Search Song/i);
    userEvent.click(input);

    waitFor(() => {
      const noOption = screen.getByText("No options");
      expect(noOption).toBeInTheDocument();
    });
  });
  it("dropdown filters properly", async () => {
    render(<SongInputArea />);
    const input = screen.getByLabelText(/Search Song/i);
    userEvent.click(input);
    userEvent.type(input, "Song1");

    await waitFor(() => {
      const song1 = screen.getByText("Song1");
      expect(song1).toBeInTheDocument();
      const song1Artist2 = screen.getByText("Song1 from artist 2");
      expect(song1Artist2).toBeInTheDocument();
      const song2Artist2 = screen.queryByText("Song2 from artist 2");
      expect(song2Artist2).not.toBeInTheDocument();
    });
  });
  it("selecting song updates state and ui", async () => {
    let [spotifyDataCopy, setSpotifyDataCopy] = spotifyDataCopyTuple();

    render(
      <AppWrapper setSpotifyDataCopy={setSpotifyDataCopy}>
        <SongInputArea />
      </AppWrapper>
    );

    const input: HTMLInputElement = screen.getByLabelText(/Search Song/i);
    userEvent.click(input);
    userEvent.type(input, "Song1");
    let song1Artist2 = null as any as HTMLElement;

    await waitFor(() => {
      song1Artist2 = screen.getByText("Song1 from artist 2");
      expect(song1Artist2).toBeInTheDocument();
    });
    userEvent.click(song1Artist2);

    await waitFor(() => {
      expect(input.value).toBe("");
      expect(spotifyDataCopy.current.songList).toStrictEqual([
        {
          artist: "Mock Artist 2",
          title: "Song1 from artist 2",
          album: "Album2",
          genre: "Pop",
        },
      ]);
    });
  });

  it("adding same song twice reflects properly in state", async () => {
    let [spotifyDataCopy, setSpotifyDataCopy] = spotifyDataCopyTuple();

    render(
      <AppWrapper setSpotifyDataCopy={setSpotifyDataCopy}>
        <SongInputArea />
      </AppWrapper>
    );

    const input: HTMLInputElement = screen.getByLabelText(/Search Song/i);
    userEvent.click(input);
    await userEvent.type(input, "Song1");
    let song1Artist2 = null as any as HTMLElement;

    await waitFor(() => {
      song1Artist2 = screen.getByText("Song1 from artist 2");
      expect(song1Artist2).toBeInTheDocument();
    });
    userEvent.click(song1Artist2);

    await waitFor(() => {
      expect(input.value).toBe("");
      expect(spotifyDataCopy.current.songList).toStrictEqual([
        {
          artist: "Mock Artist 2",
          title: "Song1 from artist 2",
          album: "Album2",
          genre: "Pop",
        },
      ]);
    });
    userEvent.click(input);
    await userEvent.type(input, "Song1");

    await waitFor(() => {
      song1Artist2 = screen.getByText("Song1 from artist 2");
      expect(song1Artist2).toBeInTheDocument();
    });
    userEvent.click(song1Artist2);

    await waitFor(() => {
      expect(spotifyDataCopy.current.songList).toStrictEqual([
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
