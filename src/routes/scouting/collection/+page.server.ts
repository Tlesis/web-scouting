import { fail, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (async ({ url: { searchParams: params }, locals: { supabase } }) => {
    if (!params.has("id")) throw redirect(303, "/scouting");

    const id = Number(params.get("id"));

    const { data: existing, error: supabaseError } = await supabase.from("scouting-data").select("matchid, teamid, teamcolor").eq("id", id).single();

    if (supabaseError)
        return fail(500, { error: supabaseError.message });

    const matchid = existing?.matchid;
    const teamid = existing?.teamid;
    const teamcolor = existing?.teamcolor;

    return { matchid, teamid, teamcolor, id };

}) satisfies PageServerLoad;
