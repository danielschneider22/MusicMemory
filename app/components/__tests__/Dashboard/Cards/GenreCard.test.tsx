import "@testing-library/jest-dom";
import { act, render, screen, waitFor, within } from "@testing-library/react";
import { GeneralInfoContext } from "@/app/GeneralInfoContext";
import GenreCard from "@/app/components/Dashboard/Cards/GenreCard";
import { AppWrapper } from "../../config/appWrapper";
import {
  dataCopyTuple,
  mockItunesSongs,
  spotifyDataCopyTuple,
} from "../../config/initState";
import userEvent from "@testing-library/user-event";

jest.mock("../../../../songs", () => ({
  get itunesSongs() {
    return mockItunesSongs; // Lazy evaluation
  },
}));

describe("Genre card", () => {
  beforeEach(() => {
    // Mock the global fetch function
    // @ts-ignore
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ songs: ["Song1 from artist 2"] }),
      })
    );
  });

  afterEach(() => {
    jest.restoreAllMocks(); // Restore the original fetch implementation
  });

  it("renders the genre card", () => {
    render(<GenreCard />);
    const cardElement = screen.getByText(/Genres/i);
    expect(cardElement).toBeInTheDocument();
  });

  it("genre card disabled if no current age", () => {
    const emptyGeneralData = {
      data: {
        currAge: null,
        genres: [],
        firstName: "",
        lastName: "",
        lowerAge: 15,
        upperAge: 30,
        artists: [],
        preselectedSongsLists: [],
      },
    };
    render(
      <GeneralInfoContext.Provider value={emptyGeneralData}>
        <GenreCard />
      </GeneralInfoContext.Provider>
    );
    const input: HTMLInputElement = screen.getByRole("combobox");
    expect(input.disabled).toBe(true);

    const numSongsInput: HTMLInputElement =
      screen.getByLabelText("# Songs per Genre");
    expect(numSongsInput).toBeInTheDocument();
    expect(numSongsInput.disabled).toBe(true);

    const button: HTMLInputElement = screen.getByTestId("add-songs-button");
    expect(button.disabled).toBe(true);
  });

  async function selectGenre(genre: string) {
    const input = screen.getByRole("combobox");

    // Wrap user interactions that cause state updates in act
    await act(async () => {
      userEvent.click(input);
    });

    // Wait for the listbox to appear
    const popper = await screen.findByRole("listbox");
    const { getByText } = within(popper);

    const genreOption = await getByText(genre);
    expect(genreOption).toBeInTheDocument();

    // Wrap another user interaction that causes state updates in act
    await act(async () => {
      userEvent.click(genreOption);
    });
  }

  async function addGenre() {
    const button: HTMLInputElement = screen.getByTestId("add-songs-button");
    await act(async () => {
      userEvent.click(button);
    });
  }

  async function removeGenre(genre: string) {
    const genreList = await screen.getByTestId("type-list");
    const element = within(genreList).getByText(genre);
    const parent = element.parentElement;
    const removeButton = within(parent!).getByRole("button");
    userEvent.click(removeButton);
  }

  it("adding a genre properly updates state and ui", async () => {
    let [dataCopy, setDataCopy] = dataCopyTuple();
    let [spotifyDataCopy, setSpotifyDataCopy] = spotifyDataCopyTuple();

    render(
      <AppWrapper
        setDataCopy={setDataCopy}
        setSpotifyDataCopy={setSpotifyDataCopy}
      >
        <GenreCard />
      </AppWrapper>
    );

    await selectGenre("Pop");
    await addGenre();

    await waitFor(async () => {
      // State Assertions
      expect(dataCopy.current.genres).toStrictEqual(["Pop"]);
      expect(spotifyDataCopy.current.songList).toStrictEqual([
        {
          artist: "Mock Artist 2",
          title: "Song1 from artist 2",
          album: "Album2",
          genre: "Pop",
          type: "Genre Picker",
        },
      ]);

      // UI assertions
      const genreList = await screen.getByTestId("type-list");
      const { getByText } = within(genreList);
      expect(getByText("Pop")).toBeInTheDocument();
    });
  });

  it("removing a genre removes from ui and state", async () => {
    let [dataCopy, setDataCopy] = dataCopyTuple();

    render(
      <AppWrapper setDataCopy={setDataCopy}>
        <GenreCard />
      </AppWrapper>
    );

    await selectGenre("Pop");
    await addGenre();

    await waitFor(async () => {
      const genreList = await screen.getByTestId("type-list");
      const { getByText } = within(genreList);
      expect(getByText("Pop")).toBeInTheDocument();
    });

    await removeGenre("Pop");

    await waitFor(async () => {
      // State Assertions
      expect(dataCopy.current.genres).toStrictEqual([]);

      // UI assertions
      const genreList = await screen.getByTestId("type-list");
      const { queryByText } = within(genreList);
      expect(queryByText("Pop")).not.toBeInTheDocument();
    });
  });
});
