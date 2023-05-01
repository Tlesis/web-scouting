<script lang="ts">
    import Page from "./Page.svelte";
    import Endgame from "./endgame/Endgame.svelte";
    import { ScoutingPages } from "$lib/types";
    import AutoButtons from "./auto/AutoButtons.svelte";
    import { scoutingData, pageLocation, ChargeStationLevel } from "$lib/ScoutingDataStore";
    import type { SupabaseClient } from "@supabase/supabase-js";
    import type { Database } from "../../../../DatabaseDefinitions";
    import { ppgStore } from "$lib/PPGStore";

    export let supabase: SupabaseClient<Database>;

    // TODO: make cleaner
    const submitData = async () => {
        $pageLocation = ScoutingPages.loading;
        // set scoring data
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
        const { error: dataError } = await supabase.from("scouting-data").update(compiledData).eq("id", $scoutingData.id);

        // set ppg data
        var auto = 0,
        teleop = 0,
        endgame = 0;

        auto += (
            (Number(compiledData.autoHigh) * 6) +
            (Number(compiledData.autoMid) * 4) +
            (Number(compiledData.autoLow) * 3) +
            (Number(compiledData.autoMobility) * 3) +
            (() => {
                if (compiledData.autoCharge === ChargeStationLevel.balanced)
                    return 12;
                if (compiledData.autoCharge === ChargeStationLevel.docked)
                    return 10;
                if (compiledData.autoCharge === ChargeStationLevel.failed)
                    return -2.5;
                return 0;
            })()
        );

        teleop += (
            (Number(compiledData.teleHigh) * 5) +
            (Number(compiledData.teleMid) * 3) +
            (Number(compiledData.teleLow) * 2)
        );

        endgame += (() => {
            if (compiledData.endCharge === ChargeStationLevel.balanced)
                return 10;
            if (compiledData.endCharge === ChargeStationLevel.docked)
                return 8;
            if (compiledData.endCharge === ChargeStationLevel.failed)
                return -2;
            return 0;
        })();

        const i = $ppgStore.findIndex((team) => team.teamid === $scoutingData.teamid);
        const ppgData = {
            matchesPlayed: $ppgStore[i].matchesPlayed + 1,
            meamTeleop: ($ppgStore[i].totalTeleop + teleop) / ($ppgStore[i].matchesPlayed + 1),
            meanAuto: ($ppgStore[i].totalAuto + auto) / ($ppgStore[i].matchesPlayed + 1),
            meanEndgame: ($ppgStore[i].totalEndgame + endgame) / ($ppgStore[i].matchesPlayed + 1),
            pointTotal: $ppgStore[i].pointTotal + (auto + teleop + endgame),
            teamid: $ppgStore[i].teamid,
            totalAuto: $ppgStore[i].totalAuto + auto,
            totalEndgame: $ppgStore[i].totalEndgame + endgame,
            totalTeleop: $ppgStore[i].totalTeleop + teleop
        }
        const { error: ppgError } = await supabase.from("ppg-data").update(ppgData).eq("teamid", ppgData.teamid);

        if (dataError) {
            console.error("Scouting Data Error\n\t" + dataError.message);
        } else if (ppgError) {
            console.error("PPG Data Error\n\t" + ppgError.message);
        } else {
            location.href = "/scouting";
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