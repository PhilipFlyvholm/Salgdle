//https://www.edc.dk/alle-boliger/villa/9560-hadsund/bakkevej-5/95803093/
import axios from "axios";
import { JSDOM } from "jsdom";
import notEmpty from "../notEmpty.js";

export async function scrape(agentLink: string) {
  const res = await axios.get<string>(agentLink, {
    headers: { "user-agent": "Mozilla/5.0" },
  });
  const data = res.data;
  const dom = new JSDOM(data);
  const document = dom.window.document;
  const slides = document.querySelectorAll(".case-grid .contents img")
  if (slides) {
    return Array.from(slides)
      .map((slide) => slide.getAttribute("src"))
      .filter(notEmpty).slice(0, -2);
  } 

  return [];
}
