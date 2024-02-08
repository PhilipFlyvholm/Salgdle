import type { Property } from '$lib/PropertyPicker';
import { localStorageStore } from '@skeletonlabs/skeleton';
import { get, writable } from 'svelte/store';

export type PropertyInfo = ({
    activeDate: undefined;
} | {
    activeDate: string;
    property: Property;
})
export const currentPropertyInfo = writable<PropertyInfo>({activeDate: undefined});

export const gameStore = localStorageStore('game', {});

type Stats = {
	GamesPlayed: number;
	GamesWon: number;
	CurrentStreak: number;
	LongestStreak: number;
};

const statsStore = localStorageStore<Stats>('stats', {
	GamesPlayed: 0,
	GamesWon: 0,
	CurrentStreak: 0,
	LongestStreak: 0
});

export function updateStats(isGameWon: boolean) {
	statsStore.update((stats) => {
		stats.GamesPlayed++;
		if (isGameWon) {
			stats.GamesWon++;
			stats.CurrentStreak++;
			stats.LongestStreak = Math.max(stats.LongestStreak, stats.CurrentStreak);
		} else {
			stats.CurrentStreak = 0;
		}
		return stats;
	});
}

export function getStats() {
	const stats = get(statsStore);
	return [
		{
			name: 'Spil',
			value: stats.GamesPlayed
		},
		{
			name: 'Vundet',
			value: stats.GamesWon
		},
		{
			name: 'Nuværende streak',
			value: stats.CurrentStreak
		},
		{
			name: 'Bedste streak',
			value: stats.LongestStreak
		}
	];
}
