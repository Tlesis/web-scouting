<script lang="ts">
    import type { TeamSimple } from "$lib/types";
    import { ppgStore } from "$lib/PPGStore";

    export let index: number;
    export let teams: { simple: TeamSimple[], status: any }

    const ppg = $ppgStore[index];

    const percentileColor = (percentile: number) => {
        var ret = "";
        if (percentile >= 95)
            ret = "bg-yellow-500 text-yellow-950 font-bold";
        else if (percentile >= 85)
            ret = "bg-green-600 text-green-950 font-semibold";
        else if (percentile >= 75)
            ret = "bg-green-400 text-green-950 font-normal";
        else if (percentile <= 25)
            ret = "bg-red-400 text-red-950 font-thin";
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
    const record = "<span class=\"text-green-600 font-normal\">" + recordInfo.wins + "</span>-<span class=\"text-red-600 font-normal\">" + recordInfo.losses + "</span>-<span class=\"font-normal\">" + recordInfo.ties + "</span>";
</script>

<tr>
    <td class="border-t border-r">{ppg.teamid}</td>
    <td class="border-t border-x break-words">
        <a href={"/data/team/" + ppg.teamid}
        class="underline text-link font-normal">{teams.simple.find((team) => team.team_number === ppg.teamid)?.nickname}</a>
    </td>
    <td class="border-t border-x">{index + 1}</td>
    <td class="border-t border-x">{Math.round(((($ppgStore.length - 1) - index) / $ppgStore.length) * 100)}</td>
    <td class="border-t border-x"><span class={percentileColor(overall[ppg.pointTotal])}>{round(ppg.pointTotal / ppg.matchesPlayed)}</span></td>
    <td class="border-t border-x"><span class={percentileColor(auto[ppg.meanAuto])}>{round(ppg.meanAuto)}</span></td>
    <td class="border-t border-x"><span class={percentileColor(teleop[ppg.meamTeleop])}>{round(ppg.meamTeleop)}</span></td>
    <td class="border-t border-x"><span class={percentileColor(endgame[ppg.meanEndgame])}>{round(ppg.meanEndgame)}</span></td>
    <td class="border-t border-l">{@html record}</td>
</tr>