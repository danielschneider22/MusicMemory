import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import GeneralInfoCard from "@/app/components/Dashboard/Cards/GeneralInfoCard";
import { GeneralInfoContext } from "@/app/GeneralInfoContext";
import {
  dataCopyTuple,
  EMPTY_FUNC,
  INIT_USER_DATA,
  INIT_USER_SPOTIFY_DATA,
} from "../../config/initState";
import { SpotifyContext } from "@/app/spotify/SpotifyProvider";
import { AppWrapper } from "../../config/appWrapper";

describe("General info card", () => {
  it("renders the general info card", () => {
    render(<GeneralInfoCard />);
    const cardElement = screen.getByText(/General/i);
    expect(cardElement).toBeInTheDocument();
  });

  it("initializes with proper data", () => {
    render(
      <AppWrapper populatedSongs>
        <GeneralInfoCard />
      </AppWrapper>
    );

    const firstNameInput = screen.getByLabelText(/First name/i);
    expect(firstNameInput).toBeInTheDocument();
    expect(firstNameInput).toHaveValue("Daniel");

    const lastNameInput = screen.getByLabelText(/Last name/i);
    expect(lastNameInput).toBeInTheDocument();
    expect(lastNameInput).toHaveValue("Schneider");

    const dob = screen.getByLabelText(/Date of Birth/i);
    expect(dob).toBeInTheDocument();
    expect(dob).toHaveValue("1993-07-26");

    const currAge = screen.getByLabelText(/Current Age/i);
    expect(currAge).toBeInTheDocument();
    expect(currAge).toHaveValue(31);

    const lowerAge = screen.getByLabelText(/Lower Age/i);
    expect(lowerAge).toBeInTheDocument();
    expect(lowerAge).toHaveValue(15);

    const upperAge = screen.getByLabelText(/Upper Age/i);
    expect(upperAge).toBeInTheDocument();
    expect(upperAge).toHaveValue(25);

    const playlistDiv = screen.getByText(/Songs in Playlist: 3/i);
    expect(playlistDiv).toBeInTheDocument();
  });

  it("changing DOB reflects properly", async () => {
    render(
      <AppWrapper>
        <GeneralInfoCard />
      </AppWrapper>
    );

    const dob = screen.getByLabelText(/Date of Birth/i);
    expect(dob).toHaveValue("1993-07-26");

    const currAge = screen.getByLabelText(/Current Age/i);
    expect(currAge).toHaveValue(31);

    await fireEvent.change(dob, { target: { value: "1992-07-26" } });
    const currYear = new Date().getFullYear();

    await waitFor(() => {
      expect(dob).toHaveValue("1992-07-26");
      expect(currAge).toHaveValue(currYear - 1992);
    });
  });

  it("changing input changes context", async () => {
    const setGeneralInfoData = jest.fn();

    render(
      <SpotifyContext.Provider
        value={{ data: INIT_USER_SPOTIFY_DATA, setData: EMPTY_FUNC }}
      >
        <GeneralInfoContext.Provider
          value={{ data: INIT_USER_DATA, setData: setGeneralInfoData }}
        >
          <GeneralInfoCard />
        </GeneralInfoContext.Provider>
      </SpotifyContext.Provider>
    );
    const firstNameInput = screen.getByLabelText(/First name/i);
    userEvent.type(firstNameInput, "A");

    await waitFor(() => {
      expect(setGeneralInfoData).toHaveBeenCalledWith({
        ...INIT_USER_DATA,
        firstName: "DanielA",
      });
    });
  });

  it("name properly changes", async () => {
    let [dataCopy, setDataCopy] = dataCopyTuple();

    render(
      <AppWrapper setDataCopy={setDataCopy}>
        <GeneralInfoCard />
      </AppWrapper>
    );
    const firstNameInput = screen.getByLabelText(/First name/i);
    userEvent.type(firstNameInput, " Test");

    await waitFor(() => {
      expect(firstNameInput).toHaveValue("Daniel Test");
      expect(dataCopy.current.firstName).toBe("Daniel Test");
    });
  });
});
