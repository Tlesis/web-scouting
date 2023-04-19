<script lang="ts">
    import type { PageData } from "./$types";
    import { ScoutingPages } from "$lib/types";
    import { pageLocation, scoutingData } from "$lib/ScoutingDataStore";
    import ScoreCollection from "./components/ScoreCollection.svelte";

    export let data: PageData;
    $scoutingData.id = data.id;
    $scoutingData.matchid = data.matchid;
    $scoutingData.teamid = data.teamid;
    $scoutingData.teamcolor = data.teamcolor;
</script>

<nav class="flex flex-row w-full justify-evenly">
    <button on:click={() => $pageLocation = ScoutingPages.auto}
        class={`text-w text-2xl ${$pageLocation === ScoutingPages.auto    ? "bg-active" : "bg-inactive"} w-1/3 py-5 border border-w`}>Auto</button>
    <button on:click={() => $pageLocation = ScoutingPages.teleop}
        class={`text-w text-2xl ${$pageLocation === ScoutingPages.teleop  ? "bg-active" : "bg-inactive"} w-1/3 py-5 border border-w`}>Tele-Op</button>
    <button on:click={() => $pageLocation = ScoutingPages.endgame}
        class={`text-w text-2xl ${$pageLocation === ScoutingPages.endgame ? "bg-active" : "bg-inactive"} w-1/3 py-5 border border-w`}>Endgame</button>
</nav>

<ScoreCollection/>
