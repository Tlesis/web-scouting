import { fail } from "@sveltejs/kit";
import { TBA_API_KEY } from "$env/static/private";
import type { PageServerLoad } from "./$types";
import type { TeamStatus } from "$lib/types";

interface TeamSimple {
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

    const status = await statusRes.json() as TeamStatus[];

    const { data: existing, error } = await supabase.from("scouting-data").select();

    if (error)
        throw fail(500);

    return { existing, teams: { simple, status } };
}) satisfies PageServerLoad;