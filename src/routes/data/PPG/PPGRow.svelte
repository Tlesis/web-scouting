<script lang="ts">
    import type { PPG } from "./PPGStore";

    export let ppg: PPG;
    export let index: number;
</script>

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