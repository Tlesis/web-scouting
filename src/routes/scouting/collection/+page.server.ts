import fetch from "node-fetch";
import { TBA_API_KEY } from "$env/static/private";
import { fail, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { AllianceColor, type TBAMatch } from "$lib/types";

export const load = (async ({ url: { searchParams: params }, locals: { supabase } }) => {
    if (!params.has("matchid") || !params.has("teamid")) throw redirect(303, "/scouting");

    const matchid = Number(params.get("matchid"));
    const teamid = Number(params.get("teamid"));

    const res = await fetch("https://www.thebluealliance.com/api/v3/event/2023mose/matches", {
        headers: {
            "X-TBA-Auth-Key": TBA_API_KEY
        }
    });

    if (!res.ok)
        throw fail(500);

    const results = await res.json() as TBAMatch[];

    const match = results.filter((match) => match.comp_level === "qm").find((match) => match.match_number === matchid);

    if (!match) throw redirect(303, "/scouting");

    const teamcolor = (() => {
        if (match.alliances.red.team_keys.map((team) => Number(team.slice(3))).includes(teamid)) return AllianceColor.red;
        if (match.alliances.blue.team_keys.map((team) => Number(team.slice(3))).includes(teamid)) return AllianceColor.blue;
        return null;
    })();

    if (teamcolor === null) throw redirect(303, "/scouting");

    const { data, error } = await supabase
        .from("scouting-data")
        .insert({ matchid, teamid, teamcolor })
        .select("id")
        .single();

    if (error)
        throw fail(500, { message: error.message });

    return { matchid, teamid, teamcolor, id: data.id };

}) satisfies PageServerLoad;
