<script lang="ts">
    import { ppgStore } from "../../../lib/PPGStore";
    import type { TeamSimple } from "./+page.server";

    export let index: number;
    export let teams: { simple: TeamSimple[], status: any }

    const ppg = $ppgStore[index];

    const percentileColor = (percentile: number) => {
        var ret = "";
        if (percentile >= 95)
            ret = "bg-yellow-500 text-yellow-950 font-bold ";
        else if (percentile >= 85)
            ret = "bg-green-600 text-green-950";
        else if (percentile >= 75)
            ret = "bg-green-400 text-green-950";
        else if (percentile <= 25)
            ret = "bg-red-400 text-red-950";
        return "px-4 rounded " + ret;
    };

    const round = (num: number) => Math.round(num * 10) / 10;

    function calculatePercentileRanks(arr: number[]): {[key: number]: number} {
        const sortedArr = [...arr].sort((a, b) => a - b);
        const result: {[key: number]: number} = {};

        for (let i = 0; i < arr.length; i++) {
            const index = sortedArr.indexOf(arr[i]);
            const percentile = (index / (arr.length - 1)) * 100;
            const roundedPercentile = Math.round(percentile * 100) / 100;

            result[arr[i]] = roundedPercentile;
        }

        return result;
    }

    const ppgArray = $ppgStore;
    const overall = calculatePercentileRanks(ppgArray.map((ppg) => ppg.pointTotal / ppg.matchesPlayed));
    const auto = calculatePercentileRanks(ppgArray.map((ppg) => ppg.meanAuto));
    const teleop = calculatePercentileRanks(ppgArray.map((ppg) => ppg.meamTeleop));
    const endgame = calculatePercentileRanks(ppgArray.map((ppg) => ppg.meanEndgame));

    const recordInfo = teams.status["frc" + ppg.teamid].qual.ranking.record ?? { wins: "?", losses: "?", ties: "?" };
    const record = "<b class=\"text-green-600\">" + recordInfo.wins + "</b>-<b class=\"text-red-600\">" + recordInfo.losses + "</b>-<b>" + recordInfo.ties + "</b>";
</script>

<tr>
    <td class="border">{ppg.teamid}</td>
    <td class="border break-words">
        <!-- TODO: go to individual team analysis page at some point -->
        <a href={"https://thebluealliance.com/team/" + ppg.teamid} target="_blank"
        class="underline text-blue-400">{teams.simple.find((team) => team.team_number === ppg.teamid)?.nickname}</a>
    </td>
    <td class="border">{index + 1}</td>
    <td class="border">{Math.round(((($ppgStore.length - 1) - index) / $ppgStore.length) * 100)}</td>
    <td class="border"><span class={percentileColor(overall[ppg.pointTotal])}>{round(ppg.pointTotal / ppg.matchesPlayed)}</span></td>
    <td class="border"><span class={percentileColor(auto[ppg.meanAuto])}>{round(ppg.meanAuto)}</span></td>
    <td class="border"><span class={percentileColor(teleop[ppg.meamTeleop])}>{round(ppg.meamTeleop)}</span></td>
    <td class="border"><span class={percentileColor(endgame[ppg.meanEndgame])}>{round(ppg.meanEndgame)}</span></td>
    <td class="border font-bold">{@html record}</td>
</tr>