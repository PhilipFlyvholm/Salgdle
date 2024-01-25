import axios from 'axios';
import type { BoligaResponse, BoligaResponseItem } from './BoligaTypes';
const base_url = 'https://www.dingeo.dk/_ah/api/tilsalgboendpoint/v1/getTilSalgMysqlGeoSpatial';
export type Property =  BoligaResponseItem & { images: string[] }
// Options "Villa", "Raekkehus", "Ejerlejlighed", "Andelsbolig", "Villalejlighed", "Landejendom", "Fritidshus", "Helaarsgrund", "Fritidsgrund", "Tvangsauktion"
const boligtype = ['Villa', 'Raekkehus', 'Ejerlejlighed', 'Andelsbolig', 'Villalejlighed'];
const southWestLat = 'undefined';
const southWestLon = 'undefined';
const northEastLat = 'undefined';
const northEastLon = 'undefined';
const prisinterval = '0,10000000';
const noiseinterval = '0,75';
const mobilinterval = '0,200';
const byggeaarinterval = '1900,2022';
const liggetidinterval = '0,1';
const mastinterval = '0,5000';
const indbrudinterval = '0,10';
const bevaringsvaerdiinterval = '1,10';
const energimaerkeinterval = 'A,G';
const perpage = 12;
const orderby = 'order%20by%20updatedate%20desc,%20boligaUniqueNumber%20asc';

function createrAPIUrl(page: number): string {
	const boligtypeString = boligtype.map((type) => `boligtype=${type}`).join('&');
	return `${base_url}?${boligtypeString}&southWestLat=${southWestLat}&southWestLon=${southWestLon}&northEastLat=${northEastLat}&northEastLon=${northEastLon}&prisinterval=${prisinterval}&noiseinterval=${noiseinterval}&mobilinterval=${mobilinterval}&byggeaarinterval=${byggeaarinterval}&liggetidinterval=${liggetidinterval}&mastinterval=${mastinterval}&indbrudinterval=${indbrudinterval}&bevaringsvaerdiinterval=${bevaringsvaerdiinterval}&energimaerkeinterval=${energimaerkeinterval}&page=${page}&perpage=${perpage}&orderby=${orderby}`;
}

export async function findProperty(
	page = 1
): Promise<Property | null> {
	const url = createrAPIUrl(page);
	const res = await axios.get<BoligaResponse>(url, {
		headers: { accept: 'application/json, text/plain, */*', 'user-agent': 'Mozilla/5.0' }
	});
	if (res.data.items.length === 0) {
		return null;
	}
	const data = res.data.items.filter(
		(item) => item.byggeaar !== 0 && !item.imageUrl.includes('googleapis.com')
	);
	if (data.length === 0) {
		return findProperty(page + 1);
	}
	const scoredData = data.map((item) => {
		const score = item.imageFetched + item.liggetid;

		return { ...item, score: score };
	});
	const sortedData = scoredData
		.sort((a, b) => a.score - b.score)
		.filter((item) => item.score == scoredData[0].score);
	const randomIndex = Math.floor(Math.random() * sortedData.length);
	const property = sortedData[randomIndex];
	const propertyImages = await findExtraImages(property.boligaUniqueNumber);
	return { ...property, images: propertyImages };
}

async function findExtraImages(id: string) {
	const url = `https://www.boliga.dk/bolig/${id}`;
	const res = await axios.get<string>(url, { headers: { 'user-agent': 'Mozilla/5.0' } });
	return findMatchesByIdAndPattern(id.toString(),  res.data);
}

function findMatchesByIdAndPattern(idValue: string, document: string): string[] {
	// Construct the regex pattern with the provided id and flexible placeholders
	//const pattern = /(https:\/\/i\.boliga\.org\/dk\/(max|(\d+x))\/\d+\/2067550(-\d+)?\.jpg)/gm;
    const pattern = new RegExp(`(https://i\\.boliga\\.org/dk/(max|(\\d+x))/\\d+/${idValue}(-\\d+)?\\.jpg)`, 'gmi');
	
	// Use matchAll to find all matches in the example strings
	return Array.from(document.matchAll(pattern), (match) => match[0]).reduce(
        (acc, curr) => {
            acc.includes(curr) ? acc : 
                acc.map(m => m.split('/')[5]).includes(curr.split('/')[5]) ? acc : acc.push(curr)
            return acc
        }, [] as string[]);
}
