import type { PageServerLoad, Actions } from "./$types";
import fetch from "node-fetch";
import { TBA_API_KEY } from "$env/static/private";
import { fail, redirect } from "@sveltejs/kit";
import type { TBAMatch } from "$lib/types";

const options = {
    headers: {
        "X-TBA-Auth-Key": TBA_API_KEY
    }
};

export const load = (async ({ locals: { supabase } }) => {
    const res = await fetch("https://www.thebluealliance.com/api/v3/event/2023mose/matches", options);

    if (!res.ok)
        throw fail(500);

    const results = await res.json() as TBAMatch[];

    const { data: existing, error } = await supabase.from("scouting-data").select("matchid, teamid");

    if (error)
        throw fail(500);

    const matches =
        results.filter((value) => value.comp_level === "qm")
            .map((match) => ({
                matchNumber: match.match_number,
                red: match.alliances.red.team_keys.map((team) => parseInt(team.slice(3))).filter((team) => existing.some((row) => row.matchid !== match.match_number || row.teamid !== team)),
                blue: match.alliances.blue.team_keys.map((team) => parseInt(team.slice(3))).filter((team) => existing.some((row) => row.matchid !== match.match_number || row.teamid !== team))
            }));

    return {
        matches
    };

}) satisfies PageServerLoad;

export const actions = {
    default: async ({ request, locals: { supabase } }) => {
        const form = await request.formData();

        const matchid = form.get("matchid") as string;
        const teamid = form.get("teamid") as string;
        const teamcolor = form.get("teamcolor") as string;

        // TODO: Impliment actual warning/error messages
        if (!matchid || !teamid)
            return "fail";

        const { data: existing, error } = await supabase.from("scouting-data").select("matchid, teamid");

        if (error)
            return error.message;

        if (existing.some((row) => row.matchid === parseInt(matchid) && row.teamid === parseInt(teamid)))
            return "already being scouted";

        throw redirect(303, "/scouting/collection?" + new URLSearchParams({ matchid, teamid, teamcolor }));
    }
} satisfies Actions;
