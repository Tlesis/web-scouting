<script lang="ts">
    import { ChargeStationLevel, scoutingData } from "$lib/ScoutingDataStore";

    const level = [ChargeStationLevel.NotAttempted, ChargeStationLevel.failed, ChargeStationLevel.docked, ChargeStationLevel.balanced];
    const color = ["bg-inactive", "bg-active", "bg-yellow-600", "bg-green-700"];

    let buttonColor: string;

    const balanceCB = () => {
        const index = level.indexOf($scoutingData.autoCharge);
        $scoutingData.autoCharge = level[((index + 1) % level.length)];
        buttonColor = color[((index + 1) % color.length)];
    };

    buttonColor = color[level.indexOf($scoutingData.autoCharge)];
</script>

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
            class={`appearance-none shadow-sm rounded ${$scoutingData.autoMobility ? "bg-active" : "bg-inactive"} mt-1 p-5`}/>
    </div>
</div>
