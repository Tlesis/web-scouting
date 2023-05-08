<svelte:head>
    <title>CATATRONICS | Collection</title>
</svelte:head>

<script lang="ts">
    import type { PageData } from "./$types";
    import { ScoutingPages } from "$lib/types";
    import { pageLocation, scoutingData } from "$lib/ScoutingDataStore";
    import ScoreCollection from "./components/ScoreCollection.svelte";
    import { ppgStore } from "$lib/PPGStore";

    export let data: PageData;

    ppgStore.set(data.ppg ?? []);
    if ($ppgStore.findIndex((team) => team.teamid === data.teamid) === -1) {
        (async () => await data.supabase.from("ppg-data").insert({ teamid: data.teamid ?? 0 }))();
        ppgStore.update((ppg) => [
            ...ppg,
            {
                matchesPlayed: 0,
                meamTeleop: 0,
                meanAuto: 0,
                meanEndgame: 0,
                pointTotal: 0,
                teamid: data.teamid ?? 0,
                totalAuto: 0,
                totalEndgame: 0,
                totalTeleop: 0
            }
        ])
    }

    $scoutingData.id = data.id ?? 0;
    $scoutingData.matchid = data.matchid ?? 0;
    $scoutingData.teamid = data.teamid ?? 0;
    $scoutingData.teamcolor = data.teamcolor ?? 0;
</script>

{#if $pageLocation !== ScoutingPages.loading}
    <nav class="flex flex-row w-full justify-evenly">
        <button on:click={() => $pageLocation = ScoutingPages.auto}
            class={`text-w text-2xl ${$pageLocation === ScoutingPages.auto    ? "bg-active" : "bg-inactive"} w-1/3 py-3 border border-w`}>Auto</button>
        <button on:click={() => $pageLocation = ScoutingPages.teleop}
            class={`text-w text-2xl ${$pageLocation === ScoutingPages.teleop  ? "bg-active" : "bg-inactive"} w-1/3 py-3 border border-w`}>Tele-Op</button>
        <button on:click={() => $pageLocation = ScoutingPages.endgame}
            class={`text-w text-2xl ${$pageLocation === ScoutingPages.endgame ? "bg-active" : "bg-inactive"} w-1/3 py-3 border border-w`}>Endgame</button>
    </nav>

    <ScoreCollection supabase={data.supabase}/>
{:else}
    <div class="flex flex-col h-screen w-5/6 text-w text-center justify-center items-center">
        <strong class="text-3xl">Loading</strong>
    </div>
    <button on:click={() => $pageLocation = ScoutingPages.endgame} class="text-w rounded bg-active p-1 w-fit mt-2">Try Again...</button>
{/if}
