import { EState, scrapers } from "./index.js";

const log = (...args: any[]) => console.log(...args);
const test_scrapers = {
  [EState.NYBOLIG]:
    "https://www.nybolig.dk/villa/8270/elverdalsvej/101721/7017497",
};

async function main(agent: EState) {
  const content = await scrapers[agent](test_scrapers[agent]);
  log(content);
  //writeToFile(content)
}
main(EState.NYBOLIG);
