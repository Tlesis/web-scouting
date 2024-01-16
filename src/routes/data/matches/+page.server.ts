import type { PageServerLoad } from "./$types";

export const load = (async ({ locals: { scoutingFetch } }) => {

    const [event, stats] = await Promise.all([
        scoutingFetch.TBA.event(),

        scoutingFetch.Stat.matchesEvent()
            .then((stats) => stats.filter((stat) => stat.comp_level === "qm"))
    ]);

    console.log(stats);

    return {
        event,
        stats,
        year: scoutingFetch.year,
        eventKey: scoutingFetch.eventkey
    };
}) satisfies PageServerLoad;