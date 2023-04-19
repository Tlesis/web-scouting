import { fail } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { AllianceColor } from "$lib/types";

export const load = (async ({ request, locals: { supabase } }) => {
    const form = await request.formData();

    const matchid = parseInt(form.get("matchid") as string);
    const teamid = parseInt(form.get("teamid") as string);
    const teamcolor = (form.get("teamcolor") as AllianceColor | null) ?? AllianceColor.red;

    const { data, error } = await supabase.from("scouting-data").insert({ matchid: matchid, teamid: teamid, teamcolor: teamcolor }).select();

    if (error)
        throw fail(500, { message: error.message });

    return { matchid, teamid, teamcolor, id: data[0].id  };

}) satisfies PageServerLoad;
