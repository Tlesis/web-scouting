<script lang="ts">
    import Page from "./Page.svelte";
    import Endgame from "./endgame/Endgame.svelte";
    import { ScoutingPages } from "$lib/types";
    import AutoButtons from "./auto/AutoButtons.svelte";
    import { scoutingData } from "$lib/ScoutingDataStore";

    export let pagelocation: number;
    export let data: {matchid: string, teamid: string, teamcolor: string}
</script>

{#if pagelocation !== ScoutingPages.endgame}

    <Page teamcolor={data.teamcolor ?? "1"} mode={pagelocation}/>

    {#if pagelocation === ScoutingPages.teleop}
        <div class="text-w text-lg w-full my-2">
            <b class="flex justify-center">Match: {data.matchid}</b>
            <b class="flex justify-center">Team: {data.teamid}</b>
            <b class="flex justify-center">Alliance: {data.teamcolor === "1" ? "Red" : "Blue"}</b>
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