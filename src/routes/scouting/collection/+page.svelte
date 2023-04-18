<script lang="ts">

    import { page } from "$app/stores";
    import { ScoutingPages } from "$lib/types"
    import ScoreCollection from "./components/ScoreCollection.svelte";

    let pagelocation = ScoutingPages.auto;

    const urlParams = $page.url.searchParams;

    const matchid = urlParams.get("matchid") ?? "";
    const teamid = urlParams.get("teamid") ?? "";
    const teamcolor = urlParams.get("teamcolor") ?? "";

    // TODO: create new row with this data on supabase
    console.log({ matchid, teamid, teamcolor });

</script>

<nav class="flex flex-row w-full justify-evenly">
    <button on:click={() => pagelocation = ScoutingPages.auto}
        class={`text-w text-2xl ${pagelocation === ScoutingPages.auto    ? 'bg-active' : 'bg-inactive'} w-1/3 py-5 border border-w`}>Auto</button>
    <button on:click={() => pagelocation = ScoutingPages.teleop}
        class={`text-w text-2xl ${pagelocation === ScoutingPages.teleop  ? 'bg-active' : 'bg-inactive'} w-1/3 py-5 border border-w`}>Tele-Op</button>
    <button on:click={() => pagelocation = ScoutingPages.endgame}
        class={`text-w text-2xl ${pagelocation === ScoutingPages.endgame ? 'bg-active' : 'bg-inactive'} w-1/3 py-5 border border-w`}>Endgame</button>
</nav>

<ScoreCollection pagelocation={pagelocation} data={{matchid, teamid, teamcolor}}/>