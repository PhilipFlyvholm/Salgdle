import { EventSchemas } from 'inngest';

type LoadTodaysPuzzle = {
	name: 'app/load-todays-puzzle';
};

export const schemas = new EventSchemas().fromUnion<LoadTodaysPuzzle>();