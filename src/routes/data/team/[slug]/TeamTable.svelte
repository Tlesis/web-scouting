<script lang="ts">
    import type { Statbotics } from "$lib/types";

    export let stats: Statbotics[];
    export let teamid: number;

    const teamColor = (s: Statbotics) => {
        var sTeams = [ s.red_1, s.red_2, s.red_3 ];
        if (sTeams.some((team) => team === teamid)) {
            return "red";
        } else {
            return "blue";
        }
    };

    const winningColor = (stat: Statbotics) => {
        const teamcolor = teamColor(stat);
        if (stat.winner === teamcolor) {
            return "bg-green-500 text-green-950";
        } else if (stat.winner !== teamcolor) {
            return "bg-red-500 text-black";
        }

        return "bg-primary text-w";
    };
</script>

<table class="text-w w-full border-4 border-primary">
    <thead class="bg-nav rounded">
            <th class="w-1/6">Match</th>
            <th class="w-1/4">Red Alliance</th>
            <th class="w-1/4">Blue Alliance</th>
            <th class="w-1/6">Scores</th>
            <th class="w-1/6">Win Pred</th>
    </thead>
    <tbody>
        {#each stats as stat}
            <tr>
                <td class="text-center border-b underline text-link"><a href={`/data/match/${stat.match_number}`}>Qualification {stat.match_number}</a></td>
                <td class={`bg-red-300 text-red-900
                    ${(teamid === stat.red_1 || teamid === stat.red_2 || teamid === stat.red_3) ?
                    "font-bold" :
                    "font-thin"}`}>
                    <span class="flex justify-evenly mx-3">
                        <!-- FIXME: clicking link doesnt update other data -->
                        <a href={`/data/team/${stat.red_1}`} class={`w-full text-center ${(teamid === stat.red_1) ? "underline" : ""}`}>{stat.red_1}</a>
                        <a href={`/data/team/${stat.red_2}`} class={`w-full text-center ${(teamid === stat.red_2) ? "underline" : ""}`}>{stat.red_2}</a>
                        <a href={`/data/team/${stat.red_3}`} class={`w-full text-center ${(teamid === stat.red_3) ? "underline" : ""}`}>{stat.red_3}</a>
                    </span>
                </td>
                <td class={`bg-blue-400 text-slate-800
                    ${(teamid === stat.blue_1 || teamid === stat.blue_2 || teamid === stat.blue_3) ?
                    "font-bold" :
                    "font-thin"}`}>
                    <span class="flex justify-evenly mx-3">
                        <!-- FIXME: clicking link doesnt update other data -->
                        <a href={`/data/team/${stat.blue_1}`} class={`w-full text-center ${(teamid === stat.blue_1) ? "underline" : ""}`}>{stat.blue_1}</a>
                        <a href={`/data/team/${stat.blue_2}`} class={`w-full text-center ${(teamid === stat.blue_2) ? "underline" : ""}`}>{stat.blue_2}</a>
                        <a href={`/data/team/${stat.blue_3}`} class={`w-full text-center ${(teamid === stat.blue_3) ? "underline" : ""}`}>{stat.blue_3}</a>
                    </span>
                </td>
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
                <td class="flex justify-evenly p-0">
                    <span class="py-1 w-full text-center bg-primary">
                        {(stat.epa_winner === teamColor(stat)) ? "Win" : "Lose"}
                    </span>
                    <span class={`px-1 w-full text-center ${winningColor(stat)}`}>
                        {(teamColor(stat) === "blue") ?
                            100 - Math.round(stat.epa_win_prob * 100) :
                            Math.round(stat.epa_win_prob * 100)}%
                    </span>
                </td>
            </tr>
        {/each}
    </tbody>
</table>