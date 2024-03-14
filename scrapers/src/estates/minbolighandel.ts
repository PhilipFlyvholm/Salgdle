//https://minbolighandel.dk/sag/KK150/frederiksberg-30-5474-veflinge/?mgl=2608&DID=135&udbudsform=salg&utm_source=boliga
import axios from "axios";
import { JSDOM } from "jsdom";
export async function scrape(agentLink: string) {
  const res = await axios.get<string>(agentLink, {
    headers: { "user-agent": "Mozilla/5.0" },
  });
  const data = res.data;
  const dom = new JSDOM(data);
  const document = dom.window.document;
  const gallery = document.querySelector("#case-image");
  if (!gallery) return [];
  const images = gallery.querySelectorAll("img");
  const imageUrls: string[] = [];
  if (!images) return [];
  images.forEach((img) => {
    const src = img.getAttribute("data-lazy");
    if (src) imageUrls.push(src);
  });
  return imageUrls;
}
