import type { PageServerLoad } from "./$types";
import fetch from "node-fetch";
import { TBA_API_KEY } from "$env/static/private";
import { fail } from "@sveltejs/kit";
import type { TBAMatch } from "$lib/types";

const options = {
    headers: {
        "X-TBA-Auth-Key": TBA_API_KEY
    }
};

export const load = (async () => {
    const res = await fetch("https://www.thebluealliance.com/api/v3/event/2023mose/matches", options);

    if (!res.ok)
        throw fail(500);

    const results = await res.json() as TBAMatch[];

    const matches =
        results.filter((value) => value.comp_level === "qm")
                .map((match) => ({
                    matchNumber: match.match_number,
                    red: match.alliances.red.team_keys.map((team) => team.slice(3)),
                    blue: match.alliances.blue.team_keys.map((team) => team.slice(3))
                }));

    return {
        matches
    };

}) satisfies PageServerLoad;
