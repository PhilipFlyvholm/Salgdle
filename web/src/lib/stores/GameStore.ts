import type { Property } from '$lib/PropertyPicker';
import { localStorageStore } from '@skeletonlabs/skeleton';
import { get, writable } from 'svelte/store';
import type { Guess } from '$lib/GuessTypes';

export const currentPropertyInfo = writable<Property | undefined>(undefined);

export enum GameStatus {
	Loading,
	InProgess,
	Win,
	Loss
}

export type GameState =
	| {
			status: GameStatus.Loading;
			guesses: [];
			gameId: string;
	  }
	| {
			status: Exclude<GameStatus, GameStatus.Loading>;
			guesses: Guess[];
			gameId: string;
	  };

export const gameState = localStorageStore<GameState>('game', {
	status: GameStatus.Loading,
	guesses: [],
	gameId: ''
});

export function startGame(gameId: string, property: Property) {
	gameState.set({
		status: GameStatus.InProgess,
		guesses: [],
		gameId
	});
	currentPropertyInfo.set(property);
}

export function setGameOver(win: boolean) {
	if (get(gameState).status !== GameStatus.InProgess) return;
	gameState.update((store) =>
		store.status == GameStatus.InProgess
			? { ...store, status: win ? GameStatus.Win : GameStatus.Loss }
			: store
	);
	updateStats(win);
}

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
