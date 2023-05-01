<script lang="ts">
    import type { PageData } from "./$types";
    import { ppgStore, type PPG } from "../../../lib/PPGStore";
    import PPGRow from "./PPGRow.svelte";

    export let data: PageData;
    ppgStore.set(data.ppg);

    // sort by total points then by teleop points if total is the same
    $ppgStore.sort((a, b) => {
        if (a.pointTotal === b.pointTotal) {
            return b.totalTeleop - a.totalTeleop;
        } else {
            return (b.pointTotal / b.matchesPlayed) - (a.pointTotal / a.matchesPlayed);
        }
    });
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
                <PPGRow index={index} teams={data.teams}/>
            {/each}
        </tbody>
    </table>
</div>