import { ProjectName } from "@project-self/assets/consts/global-consts";
import { getLocalStore, localStorage, sessionStorage } from "nsp-utils";

export const nsLocalStorage = localStorage(ProjectName);
export const nsSessionStorage = sessionStorage(ProjectName);
export const localStore = getLocalStore();
