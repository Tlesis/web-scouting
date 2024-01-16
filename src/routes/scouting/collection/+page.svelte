<svelte:head>
    <title>CATATRONICS | Collection</title>
</svelte:head>

<script lang="ts">
    import type { PageData } from "./$types";
    import { scoutingPage, scoutingData, ScoutingPage } from "$lib/ScoutingDataStore";
    import ScoreCollection from "./components/ScoreCollection.svelte";
    import { ppgStore, setPPGData } from "$lib/PPGStore";

    export let data: PageData;

    // set up ppg store to hold data between components
    ppgStore.set(data.ppg ?? []);
    // deploy PPG data
    setPPGData($ppgStore, data.existing.teamid);

    // set up base scouting data data
    $scoutingData.id = data.id;
    $scoutingData.matchid = data.existing.matchid;
    $scoutingData.teamid = data.existing.teamid;
    $scoutingData.teamcolor = data.existing.teamcolor;
</script>

{#if $scoutingPage !== ScoutingPage.loading}
    <nav class="flex flex-row w-full justify-evenly">
        <button on:click={() => $scoutingPage = ScoutingPage.auto}
            class={`text-w text-2xl ${$scoutingPage === ScoutingPage.auto    ? "bg-active" : "bg-inactive"} w-1/3 py-3 border border-w`}>Auto</button>
        <button on:click={() => $scoutingPage = ScoutingPage.teleop}
            class={`text-w text-2xl ${$scoutingPage === ScoutingPage.teleop  ? "bg-active" : "bg-inactive"} w-1/3 py-3 border border-w`}>Tele-Op</button>
        <button on:click={() => $scoutingPage = ScoutingPage.endgame}
            class={`text-w text-2xl ${$scoutingPage === ScoutingPage.endgame ? "bg-active" : "bg-inactive"} w-1/3 py-3 border border-w`}>Endgame</button>
    </nav>

    <ScoreCollection supabase={data.supabase}/>

{:else}
    <div class="flex flex-col h-screen w-5/6 text-w text-center justify-center items-center">
        <strong class="text-3xl text-center">Uploading&hellip;</strong>
    </div>
{/if}
