import { atom } from "jotai";

export const UserEmail: any = atom("");
export const searchTriggerAtom = atom(false);
export const searchResultsAtom = atom<any[]>([]);
export const registerPageClick = atom<any>(false);
export const cartCountApiCaller = atom<any>(0);