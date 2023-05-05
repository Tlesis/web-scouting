import { TBA_API_KEY } from "$env/static/private";
import { fail } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { EVENT_KEY, type TeamSimple } from "$lib/types";

export const load = (async () => {

    const simpleRes = await fetch(`https://www.thebluealliance.com/api/v3/event/${EVENT_KEY}/teams/simple`, {
        headers: {
            "X-TBA-Auth-Key": TBA_API_KEY
        }
    });

    if (!simpleRes.ok)
        throw fail(500);

    const simple = await simpleRes.json() as TeamSimple[];

    return { simple };
}) satisfies PageServerLoad;