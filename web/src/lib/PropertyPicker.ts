import type { DingeoResponseItem } from './scraper/DingeoTypes';
import { findExtraImages, getCostOfOwnership } from './scraper/BoligaScraper';
import { getDingeoData } from './scraper/DingeoScraper';
import { EState, scrapers } from 'scrapers/src/index';


type PropertyMeta = {
	images: string[];
	mdlUdgift: {type: string, value: number};
};
export type Property = DingeoResponseItem & PropertyMeta;


export async function findProperty(page = 1): Promise<Property | null> {
	const data = await getDingeoData(page);
	if (data.length === 0) {
		return findProperty(page + 1);
	}
	const scoredData = data.map((item) => {
		const agentLink = item.agentlink
		const agent = new URL(agentLink).hostname.split('.')[1];
		const estateScore:number = Object.keys(EState).includes(agent.toUpperCase()) ? 50 : 0;
		const score = item.imageFetched + item.liggetid + estateScore;
		return { ...item, score: score };
	});
	//console.log(scoredData);
	console.log(scoredData);
	
	const sortedData = scoredData
		.sort((a, b) => a.score - b.score)
		.reverse()
		.filter((item) => item.score == scoredData[0].score);
	const randomIndex = Math.floor(Math.random() * sortedData.length);
	
	const property = sortedData[randomIndex];
	
	//console.log(agents);
	let propertyImages:string[] = [];
	const agentLink = property.agentlink;
	const agent = new URL(agentLink).hostname.split('.')[1];
	console.log(agent);

	
	if(Object.keys(EState).includes(agent.toUpperCase())){
		const estate = agent as EState;
		console.log(scrapers[estate]);
		
		propertyImages = await scrapers[estate](agentLink);
	}else{
		propertyImages = await findExtraImages(property.boligaUniqueNumber);
	}
	const costOfOwnership = await getCostOfOwnership(property.boligaUniqueNumber);
	return { ...property, images: propertyImages, mdlUdgift: costOfOwnership };
}