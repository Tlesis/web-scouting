import { fail } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { fetchOptions, type FRCTeams } from "$lib/types";

export const load = (async ({ locals: { supabase } }) => {

    const [ teams, ppg ] = await Promise.all([

        // don't hardcode the event code this was done because i am writing this in bus
        fetch("https://frc-api.firstinspires.org/v3.0/2023/teams?&eventCode=molee", fetchOptions)
            .then((res) => res.json() as Promise<FRCTeams>)
            .then((res) => res.teams.map((team) => ({
                teamNumber: team.teamNumber,
                teamName: team.nameShort
            }))),

        supabase.from("ppg-data").select()
            .then(({ data, error }) => {
                if (error) throw fail(500, { error: error.message });
                return data;
            })
    ]);

    return { teams, ppg };

}) satisfies PageServerLoad;