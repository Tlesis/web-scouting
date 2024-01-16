import { fail } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (async ({ locals: { supabase, scoutingFetch } }) => {

    const { data: existing, error } = await supabase.from("scouting-data").select();

    if (error)
        throw fail(500);

    return { existing, eventkey: scoutingFetch.eventkey };
}) satisfies PageServerLoad;