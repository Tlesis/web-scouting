import { fail } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (async ({ params, locals: { supabase, scoutingFetch } }) => {

    const teamNumber = Number(params.slug);

    const [name, ranking, event, stats, ppg, existing] = await Promise.all([
        scoutingFetch.FRC.teams({ teamNumber: teamNumber })
            .then((teams) => teams.teams[0].nameShort ),
        // TBA and FIRSTEvents call Cow Town by diffrent event codes so we have to hardcode it
        scoutingFetch.FRC.eventRankings({ teamNumber: teamNumber }, "molee" ),
        scoutingFetch.TBA.event(),
        scoutingFetch.Stat.matches({ team: teamNumber, event: scoutingFetch.eventkey })
            .then((stats) => stats.filter((stat) => stat.comp_level === "qm"))
            .then((stats) => stats.sort((a, b) => a.match_number - b.match_number)),

        supabase.from("ppg-data").select()
            .then(({ data, error }) => {
                if (error) throw fail(500, { error: error.message });
                return data;
            })
            .then((data) => data.sort((a, b) => {
                if (a.pointTotal !== b.pointTotal) {
                    return (b.pointTotal / b.matchesPlayed) - (a.pointTotal / a.matchesPlayed);
                } else {
                    return b.totalTeleop - a.totalTeleop;
                }
            })),

        supabase.from("scouting-data").select().then(({ data, error }) => {
            if (error) throw fail(500, { error: error.message });
            return data;
        }).then((data) => data.filter((row) => row.teamid === teamNumber))
    ]);

    return {
        team: {
            simple: name,
            ranking,
            stats,
            ppg
        },
        existing,
        event,
        slug: teamNumber,
        eventkey: scoutingFetch.eventkey
    };
}) satisfies PageServerLoad;