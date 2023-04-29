<script lang="ts">
    import { ChargeStationLevel } from "$lib/ScoutingDataStore";
    import type { PageData } from "./$types";
    import { ppgStore, type PPG } from "./PPGStore";
    import PPGRow from "./PPGRow.svelte";

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
        const record = data.teams.status["frc" + match.teamid].qual.ranking.record ?? { wins: "?", losses: "?", ties: "?" };
        if (i === -1) {
            ppgStore.update((ppg) => {
                return [...ppg, {
                        teamid: match.teamid,
                        teamName: data.teams.simple.find((team) => team.team_number === match.teamid)?.nickname,
                        overallMeanPPG: (auto + teleop + endgame),
                        // ppgTotal: 0,
                        ppgMean: { auto, teleop, endgame },
                        record: "<b class=\"text-green-600\">" + record.wins + "</b>-<b class=\"text-red-600\">" + record.losses + "</b>-<b>" + record.ties + "</b>",
                        matchesPlayed: 1
                    }
                ]
            });
        } else {
            $ppgStore[i] = {
                    teamid: match.teamid,
                    teamName: $ppgStore[i].teamName,
                    overallMeanPPG: $ppgStore[i].overallMeanPPG + (auto + teleop + endgame),
                    // ppgTotal: 0,
                    ppgMean: {
                        auto: $ppgStore[i].ppgMean.auto + auto,
                        teleop: $ppgStore[i].ppgMean.teleop + teleop,
                        endgame: $ppgStore[i].ppgMean.endgame + endgame
                    },
                    record: $ppgStore[i].record,
                    matchesPlayed: $ppgStore[i].matchesPlayed + 1
                };
        }
    });

    $ppgStore.forEach((ppg, i) => {
        $ppgStore[i].overallMeanPPG /= ppg.matchesPlayed;
        $ppgStore[i].ppgMean.auto /= ppg.matchesPlayed;
        $ppgStore[i].ppgMean.teleop /= ppg.matchesPlayed;
        $ppgStore[i].ppgMean.endgame /= ppg.matchesPlayed;
    });
    $ppgStore.sort((a, b) => b.overallMeanPPG - a.overallMeanPPG);
</script>

<div class="flex justify-center">
    <table class="text-w text-center mt-2 w-5/6">
        <thead>
            <tr>
                <th class="w-1/12"><p class="w-11/12 bg-inactive rounded my-2 mx-auto">Team Number</p></th>
                <th class="w-1/12"><p class="w-11/12 bg-inactive rounded my-2 mx-auto">Team Name</p></th>
                <th class="w-1/12"><p class="w-11/12 bg-inactive rounded my-2 mx-auto">PPG Rank</p></th>
                <th class="w-1/12"><p class="w-11/12 bg-inactive rounded my-2 mx-auto">Percentile</p></th>
                <th class="w-1/12"><p class="w-11/12 bg-inactive rounded my-2 mx-auto">PPG</p></th>
                <th class="w-1/12"><p class="w-11/12 bg-inactive rounded my-2 mx-auto">Auto PPG</p></th>
                <th class="w-1/12"><p class="w-11/12 bg-inactive rounded my-2 mx-auto">Teleop PPG</p></th>
                <th class="w-1/12"><p class="w-11/12 bg-inactive rounded my-2 mx-auto">Endgame PPG</p></th>
                <th class="w-1/12"><p class="w-11/12 bg-inactive rounded my-2 mx-auto">Record</p></th>
            </tr>
        </thead>
        <tbody>
            {#each $ppgStore as p, index}
                <PPGRow index={index}/>
            {/each}
        </tbody>
    </table>
</div>