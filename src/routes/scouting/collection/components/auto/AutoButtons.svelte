<script lang="ts">
    import { ChargeStationLevel, scoutingData } from "$lib/ScoutingDataStore";

    let balanceButton = {color: "bg-inactive",
                         text: "Not Attempted"};
    const updateBalance = () => {
        switch ($scoutingData.autoCharge) {
            case ChargeStationLevel.NotAttempted:
                balanceButton = {
                    color: "bg-inactive",
                    text: "Not Attempted"
                };
                break;
            case ChargeStationLevel.failed:
                balanceButton = {
                    color: "bg-active",
                    text: "Failed"
                };
                break;
            case ChargeStationLevel.docked:
                balanceButton = {
                    color: "bg-yellow-600",
                    text: "Docked"
                };
                break;
            case ChargeStationLevel.balanced:
                balanceButton = {
                    color: "bg-green-700",
                    text: "Engaged"
                };
                break;
        }

        return balanceButton;
    }

    const balanceCB = () => {
        const levels = [ChargeStationLevel.NotAttempted, ChargeStationLevel.failed,
                        ChargeStationLevel.docked, ChargeStationLevel.balanced];

        const index = levels.indexOf($scoutingData.autoCharge);
        $scoutingData.autoCharge = levels[((index + 1) % levels.length)];

        return updateBalance();
    }

    balanceButton = updateBalance();
</script>

<div class="flex flex-row justify-evenly">
    <div class="flex flex-col items-center m-1">
        <label for="balanceButton" class="text-w text-xl font-bold">Charge Station</label>
        <button type="button" name="balanceButton" on:click={balanceCB}
            class={`w-full text-w shadow-sm rounded ${balanceButton.color} mt-1 py-2 text-lg`}>
            {balanceButton.text}
        </button>
    </div>
    <div class="flex flex-col items-center m-1">
        <label for="mobility" class="text-w text-xl font-bold">Mobility</label>
        <input type="checkbox" bind:checked={$scoutingData.autoMobility}
            class={`appearance-none shadow-sm rounded ${$scoutingData.autoMobility ? "bg-active" : "bg-inactive"} mt-1 p-5`}/>
    </div>
</div>