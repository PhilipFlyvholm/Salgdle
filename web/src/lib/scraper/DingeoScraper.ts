import type { DingeoResponse } from '$lib/scraper/DingeoTypes';
import axios, { type AxiosRequestConfig } from 'axios';
const base_url = 'https://www.dingeo.dk/_ah/api/tilsalgboendpoint/v1/getTilSalgMysqlGeoSpatial';

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

export async function getDingeoData(page: number) {
	const url = createrAPIUrl(page);
    console.log(url);
    
    const config:AxiosRequestConfig = { headers: { accept: 'application/json, text/plain, */*', 'user-agent': 'Mozilla/5.0' } };
	const res = await axios
        .get<DingeoResponse>(url, config);
    console.log(res.data.items);
    
    if (res.data.items.length === 0) {
        throw new Error('No data found');
    }
    const data = res.data.items.filter(
        (item) => item.byggeaar !== 0  && (!item.imageUrl || !item.imageUrl.includes('googleapis.com'))
    );
    return data;
}
