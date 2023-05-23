import { TBA_API_KEY } from "$env/static/private";
import { EVENT_KEY, type Statbotics, type TBAEvent } from "$lib/types";
import type { PageServerLoad } from "./$types";

export const load = (async () => {

    const [event, stats] = await Promise.all([
        fetch(`https://www.thebluealliance.com/api/v3/events/${new Date().getFullYear()}`, {
            headers: {
                "X-TBA-Auth-Key": TBA_API_KEY
            }
        }).then((response) => response.json() as Promise<TBAEvent[]>)
            .then((events) => events.find((event) => (event.event_code ?? "") === EVENT_KEY.slice(4))),

        fetch(`https://api.statbotics.io/v2/matches/event/${EVENT_KEY}`)
            .then((response) => response.json() as Promise<Statbotics[]>)
            .then((stats) => stats.filter((stat) => stat.comp_level === "qm"))
    ]);

    return {
        event,
        stats
    };
}) satisfies PageServerLoad;