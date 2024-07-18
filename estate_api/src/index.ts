import { BaseProperty, NyboligProperty } from "./Property.js";
import { scrape as scrapeNybolig } from "./estates/nybolig.js";


export enum EState {
  NYBOLIG = "nybolig",
}

export const scrapers:Record<EState, (agentLink: string) => Promise<string[]>> = {
  [EState.NYBOLIG]: scrapeNybolig,
};

type PropertiesQuery<T> = {
  estate: T,
}

type PropertyType<T extends EState> = T extends EState.NYBOLIG ? NyboligProperty : BaseProperty; 
export function queryProperties<T extends EState>(querty: PropertiesQuery<T>): PropertyType<T>[]{
  return [];
}
