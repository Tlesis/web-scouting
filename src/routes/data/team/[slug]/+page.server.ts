import { fail } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (async ({ params, locals: { supabase, scoutingFetch } }) => {

    const [simple, ranking, event, stats, ppg, existing] = await Promise.all([
        scoutingFetch.FRC.teams({ teamNumber: Number(params.slug) })
            .then((teams) => teams.teams[0].nameShort ),
        // TBA and FIRSTEvents call Cow Town by diffrent event codes so we have to hardcode it
        scoutingFetch.FRC.eventRankings({ teamNumber: Number(params.slug) }, "molee" ),
        scoutingFetch.TBA.event(),
        scoutingFetch.Stat.matches({ team: Number(params.slug), event: scoutingFetch.eventkey })
            .then((stats) => stats.filter((stat) => stat.comp_level === "qm")),

        supabase.from("ppg-data").select().then(({ data, error }) => {
            if (error) throw fail(500, { error: error.message });
            return data;
        }),

        supabase.from("scouting-data").select().then(({ data, error }) => {
            if (error) throw fail(500, { error: error.message });
            return data;
        })
    ]);

    return {
        team: {
            simple,
            ranking,
            stats,
            ppg
        },
        existing,
        event,
        slug: params.slug,
        eventkey: scoutingFetch.eventkey
    };
}) satisfies PageServerLoad;