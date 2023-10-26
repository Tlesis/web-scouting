<script lang="ts">
    import { ChargeStationLevel, scoutingData } from "$lib/ScoutingDataStore";
    import Powergrid from "./AutoPowergrid.svelte";

    const levels = [
        { color: "bg-inactive",   level: ChargeStationLevel.NotAttempted },
        { color: "bg-active",     level: ChargeStationLevel.failed },
        { color: "bg-yellow-600", level: ChargeStationLevel.docked },
        { color: "bg-green-700",  level: ChargeStationLevel.balanced }
    ];

    let buttonColor: string;

    const balanceCB = () => {
        const index = levels.findIndex((level) => level.level === $scoutingData.autoCharge);
        const newLevel = levels[((index + 1) % levels.length)];

        $scoutingData.autoCharge = newLevel.level;
        buttonColor = newLevel.color;
    };

    buttonColor = levels[levels.findIndex((level) => level.level === $scoutingData.autoCharge)].color;
</script>

<Powergrid/>

<div class="flex flex-row justify-evenly">
    <div class="flex flex-col items-center m-1">
        <label for="balanceButton" class="text-w text-xl font-bold">Charge Station</label>
        <button type="button" name="balanceButton" on:click={balanceCB}
            class={`w-full text-w shadow-sm rounded ${buttonColor} mt-1 py-2 text-lg`}>
            {$scoutingData.autoCharge}
        </button>
    </div>
    <div class="flex flex-col items-center m-1">
        <label for="mobility" class="text-w text-xl font-bold">Mobility</label>
        <input type="checkbox" bind:checked={$scoutingData.autoMobility}
            class="appearance-none shadow-sm rounded checked:bg-active bg-inactive mt-1 p-5"/>
    </div>
</div>
