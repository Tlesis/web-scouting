import type { PageServerLoad, Actions } from "./$types";
import { fail, redirect } from "@sveltejs/kit";
import { AllianceColor } from "$lib/ScoutingDataStore";

export const load = (async ({ locals: { supabase, scoutingFetch } }) => {

    const results = await scoutingFetch.TBA.eventMatches();

    const matches =
        results.filter((match) => match.comp_level === "qm")
            .map((match) => ({
                matchNumber: match.match_number,
                red: match.alliances.red.team_keys.map((team) => Number(team.slice(3))),
                blue: match.alliances.blue.team_keys.map((team) => Number(team.slice(3)))
            }));

    const { data: existing, error } = await supabase.from("scouting-data").select("matchid, teamid");

    if (error) throw fail(500);

    return {
        matches,
        existing
    };

}) satisfies PageServerLoad;


export const actions = {
    default: async ({ request, locals: { supabase, scoutingFetch } }) => {
        const form = await request.formData();

        const matchid = form.get("matchid") as string;
        const teamid = form.get("teamid") as string;

        if (!matchid && !teamid) {
            return fail(500, { error: "need to provide match number and team number" });
        } else if (!matchid) {
            return fail(500, { error: "need to provide match number" });
        } else if (!teamid) {
            return fail(500, { error: "need to provide team number" });
        }

        const { data: existing, error } = await supabase.from("scouting-data").select("matchid, teamid");

        if (error)
            return fail(500, { error: error.message });

        if (existing.some((row) => row.matchid === Number(matchid) && row.teamid === Number(teamid))) {
            return fail(500, { error: "that team is already being scouted" });
        }

        /* upload data */
        const results = await scoutingFetch.TBA.eventMatches();

        const match = results.filter((match) => match.comp_level === "qm").find((match) => match.match_number === Number(matchid));

        const teamcolor = (() => {
            if (match?.alliances.red.team_keys.map((team) => Number(team.slice(3))).includes(Number(teamid))) return AllianceColor.red;
            if (match?.alliances.blue.team_keys.map((team) => Number(team.slice(3))).includes(Number(teamid))) return AllianceColor.blue;
            return null;
        })();

        if (teamcolor === null) {
            return fail(500, { error: "that team isn't available this match" });
        }

        const { data, error: supabaseError } = await supabase
            .from("scouting-data")
            .insert({
                matchid: Number(matchid),
                teamid: Number(teamid),
                teamcolor: teamcolor
            })
            .select("id")
            .single();

        if (supabaseError)
            return fail(500, { error: supabaseError.message });

        throw redirect(303, "/scouting/collection?" + new URLSearchParams({ id: data.id.toString() }));
    }
} satisfies Actions;
