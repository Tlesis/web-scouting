import { TBA_API_KEY } from "$env/static/private";
import { fail } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { EVENT_KEY, type Statbotics, type TBAEvent, type TeamSimple } from "$lib/types";

export const load = (async ({ params, locals: { supabase } }) => {

    const [simple, status, event, stats, ppg, existing] = await Promise.all([
        fetch(`https://www.thebluealliance.com/api/v3/event/${EVENT_KEY}/teams/simple`, {
            headers: {
                "X-TBA-Auth-Key": TBA_API_KEY
            }
        }).then((response) => response.json() as Promise<TeamSimple[]>),

        fetch(`https://www.thebluealliance.com/api/v3/event/${EVENT_KEY}/teams/statuses`, {
            headers: {
                "X-TBA-Auth-Key": TBA_API_KEY
            }
        }).then((response) => response.json()),

        fetch(`https://www.thebluealliance.com/api/v3/events/${new Date().getFullYear()}`, {
            headers: {
                "X-TBA-Auth-Key": TBA_API_KEY
            }
        }).then((response) => response.json() as Promise<TBAEvent[]>)
            .then((events) => events.find((event) => event.event_code === EVENT_KEY.slice(4))),

        fetch(`https://api.statbotics.io/v2/matches/event/${EVENT_KEY}`)
            .then((response) => response.json() as Promise<Statbotics[]>)
            .then((stats) => stats.filter((stat) => stat.comp_level === "qm")),

        supabase.from("ppg-data").select().then(({ data, error }) => {
            if (error) throw fail(500, { error: error.message });
            return data;
        }),

        supabase.from("scouting-data").select().then(({ data, error }) => {
            if (error) throw fail(500, { error: error.message });
            return data;
        })
    ]);

    return {
        team: {
            simple,
            status,
            stats,
            ppg
        },
        existing,
        event,
        slug: params.slug
    };
}) satisfies PageServerLoad;