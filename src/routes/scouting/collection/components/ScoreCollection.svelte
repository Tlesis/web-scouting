<script lang="ts">
    import Page from "./Page.svelte";
    import Endgame from "./endgame/Endgame.svelte";
    import { ScoutingPages } from "$lib/types";
    import AutoButtons from "./auto/AutoButtons.svelte";
    import { scoutingData, pageLocation } from "$lib/ScoutingDataStore";
</script>

{#if $pageLocation !== ScoutingPages.endgame}

    <Page/>

    {#if $pageLocation === ScoutingPages.teleop}
        <div class="text-w text-lg w-full my-2">
            <b class="flex justify-center">Match: {$scoutingData.matchid}</b>
            <b class="flex justify-center">Team: {$scoutingData.teamid}</b>
            <b class="flex justify-center">Alliance: {($scoutingData.teamcolor === 1) ? "Red" : "Blue"}</b>
        </div>
    {:else}
        <AutoButtons/>
    {/if}

{:else}
    <Endgame/>
    <div class="flex justify-center">
        <!-- TODO: Submit updated data to supabase -->
        <button class="absolute bottom-5 w-5/6 text-w text-xl shadow-sm rounded bg-inactive py-3"
                on:click={() => console.log($scoutingData)}>Submit</button>
    </div>
{/if}