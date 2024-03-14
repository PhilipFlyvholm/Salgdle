import { EState, scrapers } from "./index.js";

const log = (...args: any[]) => console.log(...args);
const test_scrapers = {
    [EState.MINBOLIGHANDEL]:
        "https://minbolighandel.dk/sag/KK150/frederiksberg-30-5474-veflinge/?mgl=2608&DID=135&udbudsform=salg&utm_source=boliga",
    [EState.ELTOFTNIELSEN]: "http://www.eltoftnielsen.dk/default.aspx?sagsnr=IEN13869&mgl=2429&DID=135&udbudsform=salg&utm_source=boliga",
    [EState.NYBOLIG]: "https://www.nybolig.dk/villa/8270/elverdalsvej/101721/7017497",
    [EState.ESTATE]: "https://www.estate.dk/villa/6340/nederbyvej/210024/3150",
    [EState.REALMAEGLERNE]: "https://www.realmaeglerne.dk/bolig/481-5198-sct-pouls-plads-1-st?utm_source=boliga",
    [EState.EDC]: "https://www.edc.dk/alle-boliger/villa/9560-hadsund/bakkevej-5/95803093/",
    [EState.DANBOLIG]: "https://danbolig.dk/bolig/norddjurs/8500/lejlighed/4840000524-484/",
  };

  async function main(agent: EState) {
    const content = await scrapers[agent](test_scrapers[agent]);
    log(content);
    //writeToFile(content)
  }
  main(EState.DANBOLIG);