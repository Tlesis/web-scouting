import { fail, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (async ({ url: { searchParams: params }, locals: { supabase } }) => {
    if (!params.has("id")) throw redirect(303, "/scouting");

    const id = Number(params.get("id"));

    const [existing, ppg] = await Promise.all([
        supabase.from("scouting-data").select("matchid, teamid, teamcolor").eq("id", id).single()
            .then(({ data, error }) => {
                if (error) throw fail(500, { error: error.message });
                return data;
            }),

        supabase.from("ppg-data").select()
            .then(({ data, error }) => {
                if (error) throw fail(500, { error: error.message });
                return data;
            })
    ]);

    const matchid = existing?.matchid;
    const teamid = existing?.teamid;
    const teamcolor = existing?.teamcolor;

    return { matchid, teamid, teamcolor, id, ppg };

}) satisfies PageServerLoad;
