<script lang="ts">
    import { ChargeStationLevel } from "$lib/ScoutingDataStore";
    import { onDestroy } from "svelte";
    import type { PageData } from "./$types";
    import { ppgStore, type PPG } from "./PPGStore";

    export let data: PageData;
    const existing = data.existing;

    existing.forEach((match) => {
        var auto = 0,
        teleop = 0,
        endgame = 0;

        auto += (
            (Number(match.autoHigh) * 6) +
            (Number(match.autoMid) * 4) +
            (Number(match.autoLow) * 3) +
            (Number(match.autoMobility) * 3) +
            (() => {
                if (match.autoCharge === ChargeStationLevel.balanced)
                    return 12;
                if (match.autoCharge === ChargeStationLevel.docked)
                    return 10;
                return 0;
            })()
        );

        teleop += (
            (Number(match.teleHigh) * 5) +
            (Number(match.teleMid) * 3) +
            (Number(match.teleLow) * 2)
        );

        endgame += (() => {
            if (match.endCharge === ChargeStationLevel.balanced)
                return 10;
            if (match.endCharge === ChargeStationLevel.docked)
                return 8;
            return 0;
        })();

        const i = $ppgStore.findIndex((ppg) => ppg.teamid === match.teamid);
        if (i === -1) {
            ppgStore.update((ppg) => {
                return [...ppg, {
                        teamid: match.teamid,
                        teamName: data.teams.simple.find((team) => team.team_number === match.teamid)?.nickname,
                        overallMeanPPG: (auto + teleop + endgame),
                        // ppgTotal: 0,
                        ppgMean: { auto, teleop, endgame },
                        record: "<b class=\"text-green-700\">" + 0 + "</b>-<b class=\"text-red-700\">" + 0 + "</b>-<b>" + 0 + "</b>"
                    }
                ]
            });
        } else {
            $ppgStore[i] = {
                    teamid: match.teamid,
                    teamName: $ppgStore[i].teamName,
                    overallMeanPPG: (auto + teleop + endgame),
                    // ppgTotal: 0,
                    ppgMean: { auto, teleop, endgame },
                    record: $ppgStore[i].record
                };
        }
    });

    $ppgStore.sort((a, b) => b.overallMeanPPG - a.overallMeanPPG);

    var readOnlyPPG: PPG[];
    const unsubscribe = ppgStore.subscribe((ppg) => readOnlyPPG = ppg);

    onDestroy(() => {
        unsubscribe();
    });
</script>

<div class="flex justify-center">
    <table class="text-w text-center mt-2 w-5/6">
        <thead>
            <tr>
                <th class="w-1/12"><p class="w-11/12 bg-inactive rounded my-2 mx-auto">Team Number</p></th>
                <th class="w-1/12"><p class="w-11/12 bg-inactive rounded my-2 mx-auto">Team Name</p></th>
                <th class="w-1/12"><p class="w-11/12 bg-inactive rounded my-2 mx-auto">PPG Rank</p></th>
                <th class="w-1/12"><p class="w-11/12 bg-inactive rounded my-2 mx-auto">PPG</p></th>
                <th class="w-1/12"><p class="w-11/12 bg-inactive rounded my-2 mx-auto">Auto PPG</p></th>
                <th class="w-1/12"><p class="w-11/12 bg-inactive rounded my-2 mx-auto">Teleop PPG</p></th>
                <th class="w-1/12"><p class="w-11/12 bg-inactive rounded my-2 mx-auto">Endgame PPG</p></th>
                <th class="w-1/12"><p class="w-11/12 bg-inactive rounded my-2 mx-auto">Record</p></th>
            </tr>
        </thead>
        <tbody>
            {#each readOnlyPPG as ppg, index}
                <tr>
                    <td class="border">{ppg.teamid}</td>
                    <td class="border break-words">{ppg.teamName}</td>
                    <td class="border">{index + 1}</td>
                    <td class="border">{ppg.overallMeanPPG.toFixed(1)}</td>
                    <td class="border">{ppg.ppgMean?.auto?.toFixed(1) ?? "-"}</td>
                    <td class="border">{ppg.ppgMean?.teleop?.toFixed(1) ?? "-"}</td>
                    <td class="border">{ppg.ppgMean?.endgame?.toFixed(1) ?? "-"}</td>
                    <td class="border">{@html ppg.record}</td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>