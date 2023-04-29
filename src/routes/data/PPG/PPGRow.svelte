<script lang="ts">
    import { ppgStore } from "./PPGStore";

    export let index: number;

    const ppg = $ppgStore[index];

    const percentileColor = (i: number) => {
        const valuesBelowScore = ($ppgStore.length - 1) - i;
        const percentile = Math.round((valuesBelowScore / $ppgStore.length) * 100);

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

    const ppgArray = $ppgStore;
    const autoIndex = ppgArray.slice().sort((a, b) => b.ppgMean.auto - a.ppgMean.auto).findIndex((team) => team.teamid === ppg.teamid);
    const teleopIndex = ppgArray.slice().sort((a, b) => b.ppgMean.teleop - a.ppgMean.teleop).findIndex((team) => team.teamid === ppg.teamid);
    const endgameIndex = ppgArray.slice().sort((a, b) => b.ppgMean.endgame - a.ppgMean.endgame).findIndex((team) => team.teamid === ppg.teamid);
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
    <td class="border"><span class={percentileColor(index)}>{round(ppg.overallMeanPPG)}</span></td>
    <td class="border"><span class={percentileColor(autoIndex)}>{round(ppg.ppgMean?.auto) ?? "-"}</span></td>
    <td class="border"><span class={percentileColor(teleopIndex)}>{round(ppg.ppgMean?.teleop) ?? "-"}</span></td>
    <td class="border"><span class={percentileColor(endgameIndex)}>{round(ppg.ppgMean?.endgame) ?? "-"}</span></td>
    <td class="border font-bold">{@html ppg.record}</td>
</tr>