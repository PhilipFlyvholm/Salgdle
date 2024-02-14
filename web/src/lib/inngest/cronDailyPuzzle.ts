import { inngest } from './client';


export default inngest.createFunction(
	{ id: "cron-daily-puzzle" },
	{ cron: "TZ=Europe/Paris 0 0 * * * "},
	async ({step}) => {
		return step.sendEvent("send-todays-puzzle-event", {name: "app/load-todays-puzzle"});
	}
  );
  