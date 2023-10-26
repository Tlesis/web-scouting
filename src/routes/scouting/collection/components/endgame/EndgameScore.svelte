<script lang="ts">
    import { ChargeStationLevel } from "$lib/ScoutingDataStore";
    import ChargeButton from "./ChargeButton.svelte";
</script>

<h1 class="text-w text-2xl text-center font-bold my-4">Charge Station</h1>

<div class="flex flex-col justify-evenly">
    <ChargeButton value={ChargeStationLevel.balanced}/>
    <ChargeButton value={ChargeStationLevel.docked}/>
    <ChargeButton value={ChargeStationLevel.failed}/>
    <ChargeButton value={ChargeStationLevel.NotAttempted}/>
</div>