import { fail, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (async ({ url, locals: { supabase } }) => {
    const form = url.searchParams;

    const matchid = Number(form.get("matchid") as string);
    const teamid = Number(form.get("teamid") as string);
    const teamcolor = Number(form.get("teamcolor") as string);

    // semi double scouting fix
    {
        // TODO: inform user that the team is invalid/being scouted already and update teams available list
        const { data, error } = await supabase.from("scouting-data").select("matchid, teamid");
        if (error)
            throw fail(500, { message: error.message });
        if (data.filter((data) => (data.matchid === matchid && data.teamid === teamid)).length !== 0) {
            throw redirect(303, "/scouting");
        }
    }

    const { data, error } = await supabase
        .from("scouting-data")
        .insert({ matchid: matchid, teamid: teamid, teamcolor: teamcolor })
        .select("id");

    if (error)
        throw fail(500, { message: error.message });

    return { matchid, teamid, teamcolor, id: data[0].id };

}) satisfies PageServerLoad;
