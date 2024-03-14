import { scrape as scrapeNybolig } from "./estates/nybolig.js";
import { scrape as scrapeMBH } from "./estates/minbolighandel.js";
import { scrape as scrapeEltoftNielsen } from "./estates/eltoftnielsen.js";
import { scrape as scrapeEstate } from "./estates/estate.js";
import { scrape as scrapeRealmaeglerne } from "./estates/realmaeglerne.js";
import { scrape as scrapeEDC } from "./estates/edc.js";
import { scrape as scrapeDanbolig } from "./estates/danbolig.js";
import fs from "fs";


export enum EState {
  MINBOLIGHANDEL = "minbolighandel",
  ELTOFTNIELSEN = "eltoftnielsen",
  NYBOLIG = "nybolig",
  ESTATE = "estate",
  REALMAEGLERNE = "realmaeglerne",
  EDC = "edc",
  DANBOLIG = "danbolig",
}

export const scrapers:Record<EState, (agentLink: string) => Promise<string[]>> = {
  [EState.MINBOLIGHANDEL]: scrapeMBH,
  [EState.ELTOFTNIELSEN]: scrapeEltoftNielsen,
  [EState.NYBOLIG]: scrapeNybolig,
  [EState.ESTATE]: scrapeEstate,
  [EState.REALMAEGLERNE]: scrapeRealmaeglerne,
  [EState.EDC]: scrapeEDC,
  [EState.DANBOLIG]: scrapeDanbolig,
};


export function writeToFile(content: string) {
  fs.writeFile("./content.html", content, (err) => {
    if (err) {
      console.error(err);
    } else {
      // file written successfully
    }
  });
}
