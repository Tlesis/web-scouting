<script lang="ts">
    import Page from "./Page.svelte";
    import Endgame from "./endgame/Endgame.svelte";
    import { ScoutingPages } from "$lib/types";
    import AutoButtons from "./auto/AutoButtons.svelte";
    import { scoutingData, pageLocation, compileData } from "$lib/ScoutingDataStore";
    import type { SupabaseClient } from "@supabase/supabase-js";
    import type { Database } from "../../../../DatabaseDefinitions";
    import { ppgStore } from "$lib/PPGStore";

    export let supabase: SupabaseClient<Database>;

        const submitData = async () => {
        $pageLocation = ScoutingPages.loading;
        // set scoring data
        const data = compileData($scoutingData);
        do {
            var { error: dataError } = await supabase.from("scouting-data").update(data.compiledData).eq("id", $scoutingData.id);
        } while (dataError);

        const scores = data.scoredData;
        const i = $ppgStore.findIndex((team) => team.teamid === $scoutingData.teamid);
        const ppgData = {
            matchesPlayed: $ppgStore[i].matchesPlayed + 1,
            meanTeleop: ($ppgStore[i].totalTeleop + scores.teleop) / ($ppgStore[i].matchesPlayed + 1),
            meanAuto: ($ppgStore[i].totalAuto + scores.auto) / ($ppgStore[i].matchesPlayed + 1),
            meanEndgame: ($ppgStore[i].totalEndgame + scores.endgame) / ($ppgStore[i].matchesPlayed + 1),
            pointTotal: $ppgStore[i].pointTotal + (scores.auto + scores.teleop + scores.endgame),
            teamid: $ppgStore[i].teamid,
            totalAuto: $ppgStore[i].totalAuto + scores.auto,
            totalEndgame: $ppgStore[i].totalEndgame + scores.endgame,
            totalTeleop: $ppgStore[i].totalTeleop + scores.teleop
        }

        do {
            var { error: ppgError } = await supabase.from("ppg-data").update(ppgData).eq("teamid", ppgData.teamid);
        } while (ppgError);

        location.href = "/scouting";
    };

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
        <button class="w-5/6 text-w text-xl shadow-sm rounded bg-active py-3"
                on:click={submitData}>Submit</button>
    </div>
{/if}