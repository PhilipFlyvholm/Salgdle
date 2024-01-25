import { inngest } from './client';

export default inngest.createFunction(
	{ id: 'hello-world' },
	{ event: 'demo/event.sent' },
	({ event }) => {
		return {
			message: `Hello ${event.name}!`
		};
	}
);