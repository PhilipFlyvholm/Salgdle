import { localStorageStore } from "@skeletonlabs/skeleton";
import { writable, type Writable } from "svelte/store";

export const showStats = writable(false);
export const tutorialSeen: Writable<string> = localStorageStore('tutorialSeen', 'false');