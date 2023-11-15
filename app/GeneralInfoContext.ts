import { Dispatch, SetStateAction, createContext } from "react";

export interface GeneralInfo {
    firstName: string,
    lastName: string,
    currAge: number | null,
    lowerAge: number,
    upperAge: number
}

export interface GeneralInfoType {
    data: GeneralInfo;
    setData?: Dispatch<SetStateAction<GeneralInfo>>;
}

export const GeneralInfoContext = createContext<GeneralInfoType>({ data: { firstName: "", lastName: "", lowerAge: 8, upperAge: 30, currAge: null}, setData: undefined});