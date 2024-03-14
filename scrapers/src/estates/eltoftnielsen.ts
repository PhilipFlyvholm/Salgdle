//http://www.eltoftnielsen.dk/default.aspx?sagsnr=IEN13869&mgl=2429&DID=135&udbudsform=salg&utm_source=boliga

import axios from "axios";
import { JSDOM } from "jsdom";
export async function scrape(agentLink: string){
	const res = await axios.get<string>(agentLink, { headers: { 'user-agent': 'Mozilla/5.0' } });
	const data = res.data;
	const dom = new JSDOM(data);
	const document = dom.window.document;
	const gallery = document.querySelector('.house_gallery');
	if(!gallery) return [];
	const images = gallery.querySelectorAll('img');
	const imageUrls:string[] = [];
	if(!images) return [];
	images.forEach(img => {
		imageUrls.push(img.src);
	});
    return imageUrls
    
}