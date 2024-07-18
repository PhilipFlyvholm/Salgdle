//https://danbolig.dk/bolig/norddjurs/8500/lejlighed/4840000524-484/
import axios from "axios";
import { JSDOM } from "jsdom";

export async function scrape(agentLink: string) {
  const res = await axios.get<string>(agentLink, {
    headers: { "user-agent": "Mozilla/5.0" },
  });
    const data = res.data;
    const dom = new JSDOM(data);
    const document = dom.window.document;
    
    const jsonData = document.querySelectorAll('script[type="application/ld+json"]');
    if (jsonData) {
        for(const json of jsonData) {
            const parsed = JSON.parse(json.textContent || "");
            if (parsed && parsed["@type"].includes("ImageGallery")) {

                if(!parsed["associatedMedia"]) return;
                return parsed["associatedMedia"].map((media: any) => media.contentUrl);
            }
        }
    }
    
  return [];
}
