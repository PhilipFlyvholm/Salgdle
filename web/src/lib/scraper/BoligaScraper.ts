import axios from "axios";

const boligaCache: Map<string, string> = new Map<string, string>();

export async function findExtraImages(id: string) {
    const res = await getBoligaPage(id);
    return findMatchesByIdAndPattern(id.toString(), res);
}

async function getBoligaPage(id: string) {
	if (boligaCache.has(id)) {
		console.log('cache hit');
		
		return boligaCache.get(id) as string;
	}
	const url = `https://www.boliga.dk/bolig/${id}`;
	const res = await axios.get<string>(url, { headers: { 'user-agent': 'Mozilla/5.0' } });
	boligaCache.set(id, res.data);
	return res.data;
}


function findMatchesByIdAndPattern(idValue: string, document: string): string[] {
	// Construct the regex pattern with the provided id and flexible placeholders
	//const pattern = /(https:\/\/i\.boliga\.org\/dk\/(max|(\d+x))\/\d+\/2067550(-\d+)?\.jpg)/gm;
	const pattern = new RegExp(
		`(https://i\\.boliga\\.org/dk/(max|(\\d+x))/\\d+/${idValue}(-\\d+)?\\.jpg)`,
		'gmi'
	);

	// Use matchAll to find all matches in the example strings
	return Array.from(document.matchAll(pattern), (match) => match[0]).reduce((acc, curr) => {
		acc.includes(curr)
			? acc
			: acc.map((m) => m.split('/')[5]).includes(curr.split('/')[5])
				? acc
				: acc.push(curr);
		return acc;
	}, [] as string[]);
}

export async function getCostOfOwnership(id: string) {
	const res = (await getBoligaPage(id)).replaceAll('.', '');
	const pattern = new RegExp('(Ejerudgift|Boligydelse): (\\d+) kr \\/ md', 'gmi');
	const matches = res.matchAll(pattern);
	if (matches) {
		const match = matches.next();
		const type = match.value[1];
		return {type: type, value: parseFloat(match.value[2])};
	} else {
		return { type: 'unknown', value: 0};
	}
}
