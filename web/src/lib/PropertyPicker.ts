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

	const sortedData = scoredData
		.sort((a, b) => a.score - b.score)
		.reverse()
		.filter((item) => item.score == scoredData[0].score);

	const randomIndex = Math.floor(Math.random() * sortedData.length);

	const property = sortedData[randomIndex];

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
	const isInactive = await isPropertyInactive(property.boligaUniqueNumber);
	if (isInactive) {
		excludeIDs.add(property.boligaUniqueNumber);
		return findProperty(page, excludeIDs);
	}
	return { ...property, images: propertyImages, mdlUdgift: costOfOwnership };
}
