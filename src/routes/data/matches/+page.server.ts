import { TBA_API_KEY } from "$env/static/private";
import { EVENT_KEY, type Statbotics, type TBAEvent } from "$lib/types";
import { fail } from "@sveltejs/kit";
import type { PageServerLoad } from "../$types";

export const load = (async () => {

    const eventsRes = await fetch(`https://www.thebluealliance.com/api/v3/events/${new Date().getFullYear()}`, {
        headers: {
            "X-TBA-Auth-Key": TBA_API_KEY
        }
    });

    if (!eventsRes.ok)
        throw fail(500);

    const events = await eventsRes.json() as TBAEvent[];
    const event = events.find((event) => event.event_code === EVENT_KEY.slice(4));

    /* **** */

    const statsRes = await fetch(`https://api.statbotics.io/v2/matches/event/${EVENT_KEY}`);

    if (!statsRes.ok)
        throw fail(500);

    const statsInt = await statsRes.json() as Statbotics[];
    const stats = statsInt.filter((stat) => stat.comp_level === "qm");

    /* **** */

    return {
        event,
        stats
    };
}) satisfies PageServerLoad;