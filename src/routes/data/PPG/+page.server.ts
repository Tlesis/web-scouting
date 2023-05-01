import { fail } from "@sveltejs/kit";
import { TBA_API_KEY } from "$env/static/private";
import type { PageServerLoad } from "./$types";

export interface TeamSimple {
    city: string;
    country: string;
    key: string;
    name: string;
    nickname: string;
    state_prov: string;
    team_number: number;
}

export const load = (async ({ locals: { supabase } }) => {

    const simpleRes = await fetch("https://www.thebluealliance.com/api/v3/event/2023mose/teams/simple", {
        headers: {
            "X-TBA-Auth-Key": TBA_API_KEY
        }
    });

    if (!simpleRes.ok)
        throw fail(500);

    const simple = await simpleRes.json() as TeamSimple[];

    const statusRes = await fetch("https://www.thebluealliance.com/api/v3/event/2023mose/teams/statuses", {
        headers: {
            "X-TBA-Auth-Key": TBA_API_KEY
        }
    });

    if (!statusRes.ok)
        throw fail(500);

    const status = await statusRes.json();

    const { data: ppg, error } = await supabase.from("ppg-data").select();

    if (error)
        throw fail(500);

    return { ppg, teams: { simple, status } };
}) satisfies PageServerLoad;