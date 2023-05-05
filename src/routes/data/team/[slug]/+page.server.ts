import { TBA_API_KEY } from "$env/static/private";
import { fail } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { EVENT_KEY, type Statbotics, type TBAEvent, type TeamSimple } from "$lib/types";

export const load = (async ({ params, locals: { supabase } }) => {

    const simpleRes = await fetch(`https://www.thebluealliance.com/api/v3/event/${EVENT_KEY}/teams/simple`, {
        headers: {
            "X-TBA-Auth-Key": TBA_API_KEY
        }
    });

    if (!simpleRes.ok)
        throw fail(500);

    const simple = await simpleRes.json() as TeamSimple[];

    /* **** */

    const statusRes = await fetch(`https://www.thebluealliance.com/api/v3/event/${EVENT_KEY}/teams/statuses`, {
        headers: {
            "X-TBA-Auth-Key": TBA_API_KEY
        }
    });

    if (!statusRes.ok)
        throw fail(500);

    const status = await statusRes.json();

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

    const { data: ppg, error: ppgError } = await supabase.from("ppg-data").select();

    if (ppgError)
        throw fail(500, { error: ppgError.message });

    /* **** */

    return {
        team: {
            simple,
            status,
            stats,
            ppg
        },
        event,
        slug: params.slug
    };
}) satisfies PageServerLoad;