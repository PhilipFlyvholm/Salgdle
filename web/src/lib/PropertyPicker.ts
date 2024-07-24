import type { DingeoResponseItem } from './scraper/DingeoTypes';
import { findExtraImages, getCostOfOwnership, isPropertyInactive } from './scraper/BoligaScraper';
import { getDingeoData } from './scraper/DingeoScraper';
import { EState, scrapers } from 'scrapers/src/index';

type PropertyMeta = {
	images: string[];
	mdlUdgift: { type: string; value: number };
};
export type Property = DingeoResponseItem & PropertyMeta;

export async function findProperty(
	page = 1,
	excludeIDs = new Set<string>()
): Promise<Property | null> {
	const data = await getDingeoData(page);
	const scoredData = data
		.filter((item) => !excludeIDs.has(item.boligaUniqueNumber))
		.filter((item) => {
			const agentLink = item.agentlink;
			const agent = new URL(agentLink).hostname.split('.')[1];
			const isKnownEstate = Object.keys(EState).includes(agent.toUpperCase());
			return isKnownEstate;
		})
		.map((item) => {
			const score = item.imageFetched + item.liggetid;
			return { ...item, score: score };
		});
	if (scoredData.length === 0) {
		return findProperty(page + 1, excludeIDs);
	}

	let sortedData = scoredData
		.sort((a, b) => a.score - b.score)
		.reverse()
		.filter((item) => item.score == scoredData[0].score);

	const randomIndex = Math.floor(Math.random() * sortedData.length);
	let property = sortedData[randomIndex];
	sortedData = sortedData.splice(randomIndex, 1);
	const isInactive = await isPropertyInactive(property.boligaUniqueNumber);
	while (isInactive) {
		excludeIDs.add(property.boligaUniqueNumber);
		if (sortedData.length === 0) {
			return findProperty(page, excludeIDs);
		}
		const tmpProp = sortedData.pop()
		if (tmpProp) {
			property = tmpProp;
		}else{
			return findProperty(page, excludeIDs);
		}
	}

	//console.log(agents);
	let propertyImages: string[] = [];
	const agentLink = property.agentlink;
	const agent = new URL(agentLink).hostname.split('.')[1];

	if (Object.keys(EState).includes(agent.toUpperCase())) {
		const estate = agent as EState;
		console.log(scrapers[estate]);

		propertyImages = await scrapers[estate](agentLink);
	} else {
		propertyImages = await findExtraImages(property.boligaUniqueNumber);
	}
	const costOfOwnership = await getCostOfOwnership(property.boligaUniqueNumber);
	return { ...property, images: propertyImages, mdlUdgift: costOfOwnership };
}
