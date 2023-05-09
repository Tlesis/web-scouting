<svelte:head>
    <title>CATATRONICS | Data</title>
</svelte:head>

<script lang="ts">
    import { ChargeStationLevel } from "$lib/ScoutingDataStore";
    import { EVENT_KEY } from "$lib/types";
    import type { PageData } from "./$types";

    export let data: PageData;

    const headers = ["Match", "Team", "Win",
        "Auto High", "Auto Mid", "Auto Low", "Charge Station", "Mobility",
        "Teleop High", "Teleop Mid", "Teleop Low", "Endgame"];

    const download = () => {
        const headers = Object.keys(data.existing[0]).join(',');
        const rows = data.existing.map(obj => Object.values(obj).join(','));
        const csvContent = `${headers}\n${rows.join('\n')}`;

        const link = document.createElement('a');
        link.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent));
        link.setAttribute('download', 'scouting-data.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    data.existing.sort((a, b) => {
        if (a.matchid !== b.matchid) {
            return a.matchid - b.matchid;
        } else if (a.teamcolor !== b.teamcolor) {
            return a.teamcolor - b.teamcolor;
        } else {
            return a.teamid - b.teamid;
        }
    });
</script>

<button class=" text-w text-center text-lg shadow-sm rounded bg-active px-4 py-2 m-4 max-md:hidden"
    on:click={download}>
    Download CSV
</button>

<h1 class="text-w text-center text-5xl md:-mt-10 max-md:mt-4 mb-8 font-thin">Collected Data</h1>

<div class="flex justify-center mb-8 max-sm:hidden">
    <table class="text-center mx-16 w-full">
        <thead class="text-w">
            {#each headers as head}
                <th class="w-1/12"><span class="w-11/12 rounded my-2 mx-auto">{head}</span></th>
            {/each}
        </thead>
        <tbody class="border-2">
            {#each data.existing as team}
                <tr class={`${(team.teamcolor === 1) ?
                        "bg-red-300 text-red-900 border border-red-900" :
                        "bg-blue-400 text-slate-800 border border-slate-800"}`}>
                    <td><a href={`https://statbotics.io/match/${EVENT_KEY}_qm${team.matchid}`} target="_blank" class="underline">{team.matchid}</a></td>
                    <td><a href={`/data/team/${team.teamid}`} class="underline" data-sveltekit-preload-data="hover">{team.teamid}</a></td>
                    <td>
                        <span class={`px-2 rounded-md
                            ${(team.win) ?
                            "bg-green-500 text-green-950" :
                            "bg-red-500 text-black"}`}>
                            {(team.win) ? "Yes" : "No"}
                        </span>
                    </td>

                    <td class={`${(team.teamcolor === 1) ?
                        "border-l border-red-900" :
                        "border-l border-slate-800"}`}>
                        {team.autoHigh}
                    </td>
                    <td>{team.autoMid}</td>
                    <td>{team.autoLow}</td>
                    <td>{(team.autoCharge === ChargeStationLevel.NotAttempted) ? "" : team.autoCharge}</td>
                    <td class={`${(team.teamcolor === 1) ?
                        "border-r border-red-900" :
                        "border-r border-slate-800"}`}>
                        {(team.autoMobility) ? "Yes" : ""}
                    </td>
                    <td>{team.teleHigh}</td>
                    <td>{team.teleMid}</td>
                    <td class={`${(team.teamcolor === 1) ?
                        "border-r border-red-900" :
                        "border-r border-slate-800"}`}>
                        {team.teleLow}
                    </td>
                    <td>{(team.endCharge === ChargeStationLevel.NotAttempted) ? "" : team.endCharge}</td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>

<div class="sm:hidden text-w text-center">
    Phone Landscape To See Data
</div>