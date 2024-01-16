<svelte:head>
    <title>CATATRONICS | Data</title>
</svelte:head>

<script lang="ts">
    import { AllianceColor, ChargeStationLevel } from "$lib/ScoutingDataStore";
    import type { PageData } from "./$types";

    export let data: PageData;

    const headers = ["Match", "Team", "Win",
        "Auto High", "Auto Mid", "Auto Low", "Charge Station", "Mobility",
        "Teleop High", "Teleop Mid", "Teleop Low", "Endgame"];

    // download button callback
    // generates the CSV of compiled data inplace
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

    // sort teams by match number then team color then team number from ascending order
    data.existing.sort((a, b) => {

        // sort by team match id if not the same
        if (a.matchid !== b.matchid) {
            return a.matchid - b.matchid;

        // sort by team color if not the same
        } else if (a.teamcolor !== b.teamcolor) {
            return a.teamcolor - b.teamcolor;

        // sort by team id
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
            {#each headers as header}
                <th class="w-1/12"><span class="w-11/12 rounded my-2 mx-auto">{header}</span></th>
            {/each}
        </thead>
        <tbody class="border-2">
            {#each data.existing as team}
                <tr class="text-w border border-slate-500">
                    <td><a href={`https://statbotics.io/match/${data.eventkey}_qm${team.matchid}`} target="_blank" class="underline">{team.matchid}</a></td>
                    <td class="inline-flex items-center">
                        <svg class="w-3 h-3 mr-1 mt-px">
                            <circle cx="5" cy="5" r="5" class={`fill-current ${(team.teamcolor === AllianceColor.red) ? "text-red-500" : "text-blue-600"}`}></circle>
                        </svg>
                        <a href={`/data/team/${team.teamid}`} class="underline" data-sveltekit-preload-data="hover">{team.teamid}</a>
                    </td>
                    <td>
                        <span class={`px-2 rounded-md
                            ${(team.win) ?
                            "bg-green-500 text-green-950" :
                            "bg-red-500 text-black"}`}>
                            {(team.win) ? "Yes" : "No"}
                        </span>
                    </td>

                    <td class={`border-l border-slate-500
                        ${(!team.autoHigh) ? "font-thin text-slate-500" : ""}`}>
                        {team.autoHigh}
                    </td>
                    <td class={`${(!team.autoMid) ? "font-thin text-slate-500" : ""}`}>{team.autoMid}</td>
                    <td class={`${(!team.autoLow) ? "font-thin text-slate-500" : ""}`}>{team.autoLow}</td>
                    <td class={`${(team.autoCharge === ChargeStationLevel.failed || team.autoCharge === ChargeStationLevel.NotAttempted) ?
                            "font-thin text-slate-500" : ""}`}>
                        {(team.autoCharge === ChargeStationLevel.NotAttempted) ? "N/A" : team.autoCharge}
                    </td>
                    <td class={`border-r border-slate-500 ${(!team.autoMobility) ? "font-thin text-slate-500" : ""}`}>
                        {(team.autoMobility) ? "Yes" : "No"}
                    </td>
                    <td class={`${(!team.teleHigh) ? "font-thin text-slate-500" : ""}`}>{team.teleHigh}</td>
                    <td class={`${(!team.teleMid) ? "font-thin text-slate-500" : ""}`}>{team.teleMid}</td>
                    <td class={`border-r border-slate-500
                        ${(!team.teleLow) ? "font-thin text-slate-500" : ""}`}>
                        {team.teleLow}
                    </td>
                    <td class={`${(team.endCharge === ChargeStationLevel.failed || team.endCharge === ChargeStationLevel.NotAttempted) ?
                            "font-thin text-slate-500" : ""}`}>
                        {(team.endCharge === ChargeStationLevel.NotAttempted) ? "N/A" : team.endCharge}
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>

<div class="sm:hidden text-w text-center">
    Phone Landscape To See Data
</div>