<svelte:head>
    <title>CATATRONICS | Matches</title>
</svelte:head>

<script lang="ts">
    import { EVENT_KEY, type Statbotics } from "$lib/types";
    import type { PageData } from "./$types";

    export let data: PageData;

    data.stats.sort((a, b) => a.match_number - b.match_number);

    const winningColor = (stat: Statbotics) => {
        if (stat.winner === stat.epa_winner) {
            return "bg-green-500 text-green-950";
        } else if (
            (stat.winner ===  "red" && stat.epa_winner === "blue") ||
            (stat.winner ===  "blue" && stat.epa_winner === "red") ||
            (stat.winner === "draw")) {
            return "bg-red-500 text-black";
        }

        return "bg-primary text-w";
    };

    const rankingPoints = (stat: Statbotics, alliance: string) => {
        var ret = "";
        var totalrp = 0;

        if (alliance === "red") {
            totalrp = (stat.red_rp_1 ?? 0) + (stat.red_rp_2 ?? 0);
        } else {
            totalrp = (stat.blue_rp_1 ?? 0) + (stat.blue_rp_2 ?? 0);
        }

        for (var i = 0; i < totalrp; i++)
            ret += "●";

        return ret;
    };
</script>


<div class="w-full flex justify-center my-8">
    <a href={`https://www.thebluealliance.com/event/` + EVENT_KEY} target="_blank" class="flex w-fit">
        <h1 class="text-w text-4xl font-thin">{EVENT_KEY.slice(0, 4)} {data.event?.name ?? "?"}</h1>
        <img src="/tba.webp" alt="" class="m-2"/>
    </a>
</div>

<hr class="mx-16 my-8">

<div class="mx-24 mb-8">
    <table class="text-w text-lg border-4 border-primary w-full">
        <thead class="bg-nav rounded">
            <!-- 7.7% is about 1/13 of the available space
                 the others are multiples of 7.7% -->
            <th class="w-[3.8%]">Video</th>
            <th class="w-[7.7%]">Match</th>
            <th class="w-[23.1%]">Red Alliance</th>
            <th class="w-[23.1%]">Blue Alliance</th>
            <th class="w-[15.4%]">Scores</th>
            <th class="w-[15.4%]">Win Pred</th>
        </thead>
        <tbody>
            {#each data.stats as stat}
            <tr>
                <!-- Video Link -->
                <td class="p-0 border-r border-b text-link">
                    <a href={`https://youtube.com/watch?v=${stat.video}`} target="_blank" class="flex justify-center">
                        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16"
                            class="text-link cursor-pointer" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path>
                            <path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445z"></path>
                        </svg>
                    </a>
                </td>
                <!-- Match Number -->
                <td class="text-center border-b underline text-link">
                    <a href={`https://statbotics.io/match/${EVENT_KEY}_qm${stat.match_number}`} target="_blank">Quals {stat.match_number}</a>
                </td>
                <!-- Red Alliance -->
                <td class="bg-red-300 text-red-900 underline">
                    <span class={`flex justify-evenly mx-3
                        ${((stat.red_score ?? 0) > (stat.blue_score ?? 0)) ?
                        "font-bold" :
                        "font-thin"}`}>
                        <a href={`/data/team/${stat.red_1}`} class="w-1/3 text-center">{stat.red_1}</a>
                        <a href={`/data/team/${stat.red_2}`} class="w-1/3 text-center">{stat.red_2}</a>
                        <a href={`/data/team/${stat.red_3}`} class="w-1/3 text-center">{stat.red_3}</a>
                    </span>
                </td>
                <!-- Blue Alliance -->
                <td class="bg-blue-400 text-slate-800 underline">
                    <span class={`flex justify-evenly mx-3
                        ${((stat.red_score ?? 0) < (stat.blue_score ?? 0)) ?
                        "font-bold" :
                        "font-thin"}`}>
                        <a href={`/data/team/${stat.blue_1}`} class="w-1/3 text-center">{stat.blue_1}</a>
                        <a href={`/data/team/${stat.blue_2}`} class="w-1/3 text-center">{stat.blue_2}</a>
                        <a href={`/data/team/${stat.blue_3}`} class="w-1/3 text-center">{stat.blue_3}</a>
                    </span>
                </td>
                <!-- Scores -->
                <td class="text-center p-0">
                    <span class="flex justify-between">
                        <span class={`w-full py-1 bg-red-300 text-red-900
                            ${((stat.red_score ?? 0) > (stat.blue_score ?? 0)) ?
                            "font-bold" :
                            "font-thin"}`}>
                            {stat.red_score ?? "N/A"}<sup class="xsm">{rankingPoints(stat, "red")}</sup>
                        </span>
                        <span class={`w-full py-1 bg-blue-400 text-slate-800
                            ${((stat.blue_score ?? 0) > (stat.red_score ?? 0)) ?
                            "font-bold" :
                            "font-thin"}`}>
                            {stat.blue_score ?? "N/A"}<sup class="xsm">{rankingPoints(stat, "blue")}</sup>
                        </span>
                    </span>
                </td>
                <!-- Win Pred -->
                <td class="flex justify-evenly p-0 border-l-8 border-nav">
                    <span class="py-1 w-full text-center bg-primary capitalize">
                        {stat.epa_winner}
                    </span>
                    <span class={`px-1 w-full text-center py-1 ${winningColor(stat)}`}>
                        {(stat.epa_winner === "red") ?
                            Math.round(stat.epa_win_prob * 100) :
                            100 - Math.round(stat.epa_win_prob * 100)}%
                    </span>
                </td>
            </tr>
        {/each}
        </tbody>
    </table>
</div>

<footer class="w-screen bg-nav shadow-lg flex border-t rounded-t mt-16">
    <p class="text-w m-8">Design <span class="italic">slightly</span> inspired by <a href={`https://statbotics.io/event/${EVENT_KEY}#qual-matches`} target="_blank" class="text-link underline">Statbotics</a></p>
</footer>

<style lang="postcss">
    .xsm {
        font-size: 0.5rem;
    }
</style>