//https://www.realmaeglerne.dk/bolig/481-5198-sct-pouls-plads-1-st?utm_source=boliga
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
  const slides = document.querySelectorAll("img.slide.gallery");
  if (slides) {
    return Array.from(slides)
      .map((slide) => slide.getAttribute("data-flickity-lazyload-src"))
      .filter(notEmpty);
  }
  return [];
}
