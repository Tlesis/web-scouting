import { fail } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (async ({ url, locals: { supabase } }) => {
    const form = url.searchParams;

    const matchid = Number(form.get("matchid") as string);
    const teamid = Number(form.get("teamid") as string);
    const teamcolor = Number(form.get("teamcolor") as string);

    const { data, error } = await supabase
        .from("scouting-data")
        .insert({ matchid: matchid, teamid: teamid, teamcolor: teamcolor })
        .select("id");

    if (error)
        throw fail(500, { message: error.message });

    return { matchid, teamid, teamcolor, id: data[0].id };

}) satisfies PageServerLoad;
