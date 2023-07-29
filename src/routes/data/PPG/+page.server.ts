import { fail } from "@sveltejs/kit";
import { TBA_API_KEY } from "$env/static/private";
import type { PageServerLoad } from "./$types";
import { EVENT_KEY, type TeamSimple } from "$lib/types";

export const load = (async ({ locals: { supabase } }) => {

    const [simple, status, ppg] = await Promise.all([
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

        supabase.from("ppg-data").select()
            .then(({ data, error }) => {
                if (error) throw fail(500, { error: error.message });
                return data;
            })
    ]);

    return { ppg, teams: { simple, status } };
}) satisfies PageServerLoad;