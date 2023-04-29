<script lang="ts">
    import Page from "./Page.svelte";
    import Endgame from "./endgame/Endgame.svelte";
    import { ScoutingPages } from "$lib/types";
    import AutoButtons from "./auto/AutoButtons.svelte";
    import { scoutingData, pageLocation } from "$lib/ScoutingDataStore";
    import type { SupabaseClient } from "@supabase/supabase-js";
    import type { Database } from "../../../../DatabaseDefinitions";

    export let supabase: SupabaseClient<Database>;

    // TODO: make cleaner
    const submitData = async () => {
        const compiledData = {
            autoHigh: $scoutingData.auto[0].activated.filter((node) => node).length,
            autoMid: $scoutingData.auto[1].activated.filter((node) => node).length,
            autoLow: $scoutingData.auto[2].activated.filter((node) => node).length,
            autoCharge: $scoutingData.autoCharge,
            autoMobility: $scoutingData.autoMobility,
            teleHigh: $scoutingData.teleop[0].activated.filter((node) => node).length,
            teleMid: $scoutingData.teleop[1].activated.filter((node) => node).length,
            teleLow: $scoutingData.teleop[2].activated.filter((node) => node).length,
            endCharge: $scoutingData.endgame,
            playDirty: $scoutingData.playDirty,
            win: $scoutingData.win,
            notes: $scoutingData.notes
        };
        const { error } = await supabase.from("scouting-data").update(compiledData).eq("id", $scoutingData.id);

        if (error) {
            console.error(error.message + "\n\t" + error.details);
        } else {
            location.href = "/";
        }
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