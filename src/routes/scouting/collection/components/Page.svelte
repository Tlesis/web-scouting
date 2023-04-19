<script lang="ts">
    import { scoutingData } from "$lib/ScoutingDataStore";
    import { AllianceColor } from "$lib/types";
    import Boxes from "./Boxes.svelte";

    const teamcolor = $scoutingData.teamcolor;
</script>

<div class={`border-8 ${(teamcolor === AllianceColor.blue) ? "border-blue-900" : "border-active"} rounded`}>
    <table class="text-w text-center mt-2 w-full">
        <thead>
            <tr>
                {#if teamcolor === AllianceColor.blue}
                    <th class="w-1/3"><p class="w-11/12 bg-inactive rounded mx-auto">Top</p></th>
                    <th class="w-1/3"><p class="w-11/12 bg-inactive rounded mx-auto">Middle</p></th>
                    <th class="w-1/3"><p class="w-11/12 bg-inactive rounded mx-auto">Bottom</p></th>
                {:else}
                    <th class="w-1/3"><p class="w-11/12 bg-inactive rounded mx-auto">Bottom</p></th>
                    <th class="w-1/3"><p class="w-11/12 bg-inactive rounded mx-auto">Middle</p></th>
                    <th class="w-1/3"><p class="w-11/12 bg-inactive rounded mx-auto">Top</p></th>
                {/if}
            </tr>
        </thead>
        <tbody>
            {#if teamcolor === AllianceColor.blue}
                <Boxes order={[0, 1, 2]}/>
            {:else}
                <Boxes order={[2, 1, 0]}/>
            {/if}
        </tbody>
    </table>
</div>
