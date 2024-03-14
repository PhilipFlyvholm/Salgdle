//https://www.estate.dk/villa/6340/nederbyvej/210024/3150

import axios from "axios";
import { JSDOM } from "jsdom";

function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
    return value !== null && value !== undefined;
  }
export async function scrape(agentLink: string){
	const res = await axios.get<string>(agentLink, { headers: { 'user-agent': 'Mozilla/5.0' } });
	const data = res.data;
	const dom = new JSDOM(data);
	const document = dom.window.document;
    const slides = document.querySelector("ul.slides");
    if(slides){
        const images = slides.querySelectorAll("li");
        const imageUrls = Array.from(images).map((image) => {
            const img = image.querySelector("img");
            if(img){
                const src = img.getAttribute("data-src");
                if(!src) return null;
                const url = new URL(src);
                url.searchParams.delete("w");
                url.searchParams.delete("h");
                return url.toString();
            }
            return null;
        }).filter(notEmpty);
        return imageUrls;
    }
    return []
    
}