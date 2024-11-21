import "@testing-library/jest-dom";
import { render, screen, waitFor, within } from "@testing-library/react";
import { AppWrapper } from "../../config/appWrapper";
import ArtistCard from "@/app/components/Dashboard/Cards/ArtistCard";
import userEvent from "@testing-library/user-event";
import { artistList } from "@/app/components/Dashboard/Cards/ArtistList";
import {
  dataCopyTuple,
  mockItunesSongs,
  spotifyDataCopyTuple,
} from "../../config/initState";

const mockArtistList = [
  { label: "Mock Artist 1" },
  { label: "Mock Artist 2" },
  { label: "Mock Artist 3" },
  { label: "Mock Artist 4" },
];

jest.mock("../../../Dashboard/Cards/ArtistList", () => ({
  get artistList() {
    return mockArtistList; // Lazy evaluation
  },
}));

jest.mock("../../../../songs", () => ({
  get itunesSongs() {
    return mockItunesSongs; // Lazy evaluation
  },
}));

jest.mock("../../../../../app/spotify/api", () => ({
  spotifySearchTrack: (search: string, i: number) => {
    const artist = search.split("artist:")[1];
    const artistSongs = mockItunesSongs.filter((iSong) =>
      iSong.artist.toLowerCase().includes(artist!.toLowerCase())
    );
    const mockResponse = artistSongs
      .map((song) => {
        return { ...song, name: song.title };
      })
      .slice(0, i);
    return new Promise((resolve, reject) => {
      resolve(mockResponse);
    });
  },
}));

describe.only("Artist card", () => {
  it("renders the artist card", async () => {
    render(<ArtistCard />);
    const cardElement = screen.getByText(/Artists/i);
    expect(cardElement).toBeInTheDocument();

    const songsToGenerate = screen.getByLabelText(/# Songs to Generate/i);
    expect(songsToGenerate).toBeInTheDocument();
    expect(songsToGenerate).toHaveValue(7);

    const addAllSongsByArtist = screen.getByLabelText(
      /Add all songs by artist/i
    );
    expect(addAllSongsByArtist).toBeInTheDocument();
    expect(addAllSongsByArtist).not.toBeChecked();

    const input = screen.getByRole("combobox");
    userEvent.click(input);

    await waitFor(async () => {
      const popper = screen.getByRole("listbox");
      expect(popper.children).toHaveLength(artistList.length);
    });
  });

  it("expect artist options to accurately reflect artist list", async () => {
    render(
      <AppWrapper>
        <ArtistCard />
      </AppWrapper>
    );

    const input = screen.getByRole("combobox");
    userEvent.click(input);

    const popper = await screen.findByRole("listbox");
    await expect(popper.children).toHaveLength(mockArtistList.length);
  });

  async function selectArtist(artist: string) {
    const input = screen.getByRole("combobox");
    userEvent.click(input);

    const popper = await screen.findByRole("listbox");
    const { getByText } = within(popper);

    const artist2 = await getByText(artist);
    expect(artist2).toBeInTheDocument();
    userEvent.click(artist2);
  }

  async function addArtist() {
    const button = await screen.findByText("Add Songs");
    userEvent.click(button);
  }

  async function removeArtist(artist: string) {
    const artistList = await screen.getByTestId("type-list");
    const element = within(artistList).getByText(artist);
    const parent = element.parentElement;
    const removeButton = within(parent!).getByRole("button");
    userEvent.click(removeButton);
  }

  it("selecting an artist and adding the artist correctly shows artist and adds songs to state", async () => {
    let [dataCopy, setDataCopy] = dataCopyTuple();
    let [spotifyDataCopy, setSpotifyDataCopy] = spotifyDataCopyTuple();

    render(
      <AppWrapper
        setDataCopy={setDataCopy}
        setSpotifyDataCopy={setSpotifyDataCopy}
      >
        <ArtistCard />
      </AppWrapper>
    );

    await selectArtist("Mock Artist 2");
    await addArtist();

    await waitFor(async () => {
      // State Assertions
      expect(dataCopy.current.artists).toStrictEqual(["Mock Artist 2"]);
      expect(spotifyDataCopy.current.songList).toStrictEqual([
        {
          artist: "Mock Artist 2",
          title: "Song1 from artist 2",
          album: "Album2",
          genre: "Pop",
          type: "Artist Picker",
        },
        {
          artist: "Mock Artist 2",
          title: "Song2 from artist 2",
          album: "Album2",
          genre: "Pop",
          type: "Artist Picker",
        },
      ]);

      // UI assertions
      const artistList = await screen.getByTestId("type-list");
      const { getByText } = within(artistList);
      expect(getByText("Mock Artist 2")).toBeInTheDocument();
    });
  });

  it("removing an artist removes it from state and ui", async () => {
    let [dataCopy, setDataCopy] = dataCopyTuple();
    let [spotifyDataCopy, setSpotifyDataCopy] = spotifyDataCopyTuple();

    render(
      <AppWrapper
        setDataCopy={setDataCopy}
        setSpotifyDataCopy={setSpotifyDataCopy}
      >
        <ArtistCard />
      </AppWrapper>
    );

    await selectArtist("Mock Artist 2");
    await addArtist();

    await waitFor(async () => {
      expect(dataCopy.current.artists).toStrictEqual(["Mock Artist 2"]);
      expect(spotifyDataCopy.current.songList).toStrictEqual([
        {
          artist: "Mock Artist 2",
          title: "Song1 from artist 2",
          album: "Album2",
          genre: "Pop",
          type: "Artist Picker",
        },
        {
          artist: "Mock Artist 2",
          title: "Song2 from artist 2",
          album: "Album2",
          genre: "Pop",
          type: "Artist Picker",
        },
      ]);
    });

    await removeArtist("Mock Artist 2");

    await waitFor(async () => {
      expect(dataCopy.current.artists).toStrictEqual([]);
      expect(spotifyDataCopy.current.songList).toStrictEqual([]);
    });
  });

  it("selecting multiple artists correctly shows artist and adds songs to state", async () => {
    let [dataCopy, setDataCopy] = dataCopyTuple();
    let [spotifyDataCopy, setSpotifyDataCopy] = spotifyDataCopyTuple();

    render(
      <AppWrapper
        setDataCopy={setDataCopy}
        setSpotifyDataCopy={setSpotifyDataCopy}
      >
        <ArtistCard />
      </AppWrapper>
    );

    await selectArtist("Mock Artist 2");
    await addArtist();

    // need to wait until we see that the artists have been populated
    await waitFor(async () => {
      expect(dataCopy.current.artists).toStrictEqual(["Mock Artist 2"]);
    });

    await selectArtist("Mock Artist 1");
    await addArtist();

    // ensure state and elements accurately reflect that mock artist 2 and 1 have been added
    await waitFor(async () => {
      // UI assertions
      const artistList = await screen.getByTestId("type-list");
      expect(artistList.children[0]).toHaveTextContent("Mock Artist 2");
      expect(artistList.children[1]).toHaveTextContent("Mock Artist 1");

      // State assertions
      expect(dataCopy.current.artists).toStrictEqual([
        "Mock Artist 2",
        "Mock Artist 1",
      ]);
      expect(spotifyDataCopy.current.songList).toStrictEqual([
        {
          artist: "Mock Artist 2",
          title: "Song1 from artist 2",
          album: "Album2",
          genre: "Pop",
          type: "Artist Picker",
        },
        {
          artist: "Mock Artist 2",
          title: "Song2 from artist 2",
          album: "Album2",
          genre: "Pop",
          type: "Artist Picker",
        },
        {
          artist: "Mock Artist 1",
          title: "Song1",
          album: "Album1",
          genre: "Pop",
          type: "Artist Picker",
        },
        {
          artist: "Mock Artist 1",
          title: "Song2",
          album: "Album1",
          genre: "Pop",
          type: "Artist Picker",
        },
      ]);
    });
  });
});
