<script lang="ts">
    import { ppgStore } from "./PPGStore";

    export let index: number;

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
    const overall = calculatePercentileRanks(ppgArray.map((ppg) => ppg.overallMeanPPG));
    const auto = calculatePercentileRanks(ppgArray.map((ppg) => ppg.ppgMean.auto));
    const teleop = calculatePercentileRanks(ppgArray.map((ppg) => ppg.ppgMean.teleop));
    const endgame = calculatePercentileRanks(ppgArray.map((ppg) => ppg.ppgMean.endgame));
    console.log(endgame);
</script>

<tr>
    <td class="border">{ppg.teamid}</td>
    <td class="border break-words">
        <!-- TODO: go to individual team analysis page at some point -->
        <a href={"https://thebluealliance.com/team/" + ppg.teamid} target="_blank"
        class="underline text-blue-400">{ppg.teamName}</a>
    </td>
    <td class="border">{index + 1}</td>
    <td class="border">{Math.round(((($ppgStore.length - 1) - index) / $ppgStore.length) * 100)}</td>
    <td class="border"><span class={percentileColor(overall[ppg.overallMeanPPG])}>{round(ppg.overallMeanPPG)}</span></td>
    <td class="border"><span class={percentileColor(auto[ppg.ppgMean.auto])}>{round(ppg.ppgMean.auto)}</span></td>
    <td class="border"><span class={percentileColor(teleop[ppg.ppgMean.teleop])}>{round(ppg.ppgMean.teleop)}</span></td>
    <td class="border"><span class={percentileColor(endgame[ppg.ppgMean.endgame])}>{round(ppg.ppgMean.endgame)}</span></td>
    <td class="border font-bold">{@html ppg.record}</td>
</tr>