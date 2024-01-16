<script lang="ts">
    import type { Database } from "../../../../DatabaseDefinitions";
    import { checks } from "./CheckedStore";

    export let stats: StatMatch[];
    export let teamid: number;
    export let existing: Database["public"]["Tables"]["scouting-data"]["Row"][];

    existing.sort((a, b) => a.matchid - b.matchid)

    const teamColor = (s: StatMatch) => {
        var sTeams = [ s.red_1, s.red_2, s.red_3 ];
        if (sTeams.some((team) => team === teamid)) {
            return "red";
        } else {
            return "blue";
        }
    };

    const winningColor = (stat: StatMatch) => {
        const teamcolor = teamColor(stat);
        if (stat.winner === teamcolor) {
            return "bg-green-500 text-green-950";
        } else if (stat.winner !== teamcolor) {
            return "bg-red-500 text-black";
        }

        return "bg-primary text-w";
    };

    (() => {
        for (var i = 0; i < stats.length; i++)
            $checks[i] = true;
    })();
</script>

<table class="text-w w-full border-4 border-primary">
    <thead class="bg-nav rounded">
            <th class="w-[5%]"></th>
            <th class="w-1/6">Match</th>
            <th class="w-1/4">Red Alliance</th>
            <th class="w-1/4">Blue Alliance</th>
            <th class="w-1/6">Scores</th>
            <th class="w-1/6">Win Pred</th>
            <th>Notes</th>
    </thead>
    <tbody>
        {#each stats as stat, i}
            <tr class={`${($checks[i]) ? "" : "line-through text-black"}`}>
                <!--  -->
                <td class="border-r border-b text-center">
                    <input class={`${(!existing.some((e) => e.teamid === teamid && stat.match_number === e.matchid) ? "hidden" : "")}`} type="checkbox" bind:checked={$checks[i]}/>
                </td>
                <!-- Match -->
                <td class="text-center border-b underline text-link"><a href={`https://statbotics.io/match/${stat.event}_qm${stat.match_number}`} target="_blank">Quals {stat.match_number}</a></td>
                <!-- Red Alliance -->
                <td class={`bg-red-300 text-red-900
                    ${(teamid === stat.red_1 || teamid === stat.red_2 || teamid === stat.red_3) ?
                    "font-bold" :
                    "font-thin"}`}>
                    <span class="flex justify-evenly mx-3">
                        <a data-sveltekit-reload data-sveltekit-preload-data="hover" href={`/data/team/${stat.red_1}`} class={`w-full text-center ${(teamid === stat.red_1) ? "underline" : ""}`}>{stat.red_1}</a>
                        <a data-sveltekit-reload data-sveltekit-preload-data="hover" href={`/data/team/${stat.red_2}`} class={`w-full text-center ${(teamid === stat.red_2) ? "underline" : ""}`}>{stat.red_2}</a>
                        <a data-sveltekit-reload data-sveltekit-preload-data="hover" href={`/data/team/${stat.red_3}`} class={`w-full text-center ${(teamid === stat.red_3) ? "underline" : ""}`}>{stat.red_3}</a>
                    </span>
                </td>
                <!-- Blue Alliance -->
                <td class={`bg-blue-400 text-slate-800
                    ${(teamid === stat.blue_1 || teamid === stat.blue_2 || teamid === stat.blue_3) ?
                    "font-bold" :
                    "font-thin"}`}>
                    <span class="flex justify-evenly mx-3">
                        <a data-sveltekit-reload data-sveltekit-preload-data="hover" href={`/data/team/${stat.blue_1}`} class={`w-full text-center ${(teamid === stat.blue_1) ? "underline" : ""}`}>{stat.blue_1}</a>
                        <a data-sveltekit-reload data-sveltekit-preload-data="hover" href={`/data/team/${stat.blue_2}`} class={`w-full text-center ${(teamid === stat.blue_2) ? "underline" : ""}`}>{stat.blue_2}</a>
                        <a data-sveltekit-reload data-sveltekit-preload-data="hover" href={`/data/team/${stat.blue_3}`} class={`w-full text-center ${(teamid === stat.blue_3) ? "underline" : ""}`}>{stat.blue_3}</a>
                    </span>
                </td>
                <!-- Scores -->
                <td class="text-center p-0">
                    <span class="flex justify-between">
                        <span class={`w-full py-1 bg-red-300 text-red-900 ${(teamColor(stat) === "red") ? "underline" : ""}
                            ${((stat.red_score ?? 0) > (stat.blue_score ?? 0)) ?
                            "font-bold" :
                            "font-thin"}`}>
                            {stat.red_score ?? "N/A"}
                        </span>
                        <span class={`w-full py-1 bg-blue-400 text-slate-800 ${(teamColor(stat) === "blue") ? "underline" : ""}
                            ${((stat.blue_score ?? 0) > (stat.red_score ?? 0)) ?
                            "font-bold" :
                            "font-thin"}`}>
                            {stat.blue_score ?? "N/A"}
                        </span>
                    </span>
                </td>
                <!-- Win Pred -->
                <td class="flex justify-evenly p-0">
                    <span class="py-1 w-full text-w text-center bg-primary">
                        {(stat.epa_winner === teamColor(stat)) ? "Win" : "Lose"}
                    </span>
                    <span class={`px-1 w-full text-center pt-1 ${winningColor(stat)}`}>
                        {(teamColor(stat) === "blue") ?
                            100 - Math.round(stat.epa_win_prob * 100) :
                            Math.round(stat.epa_win_prob * 100)}%
                    </span>
                </td>
                <td class="group text-w">
                    <div class={`relative -mt-4 ${((existing[i]?.notes ?? "") === "") ? "hidden": ""}`}>
                        <p class="absolute w-[10vw] hidden group-hover:block bg-primary p-2 border">{existing[i]?.notes}</p>
                        <p class="absolute w-full group-hover:hidden text-center">. . .</p>
                    </div>
                </td>
            </tr>
            {/each}
    </tbody>
</table>