<script lang="ts">
    import { ChargeStationLevel } from "$lib/ScoutingDataStore";
    import Button from "./ChargeButton.svelte";
</script>

<h1 class="text-w text-2xl text-center font-bold my-4">Charge Station</h1>

<div class="flex flex-col justify-evenly">
    <Button value={ChargeStationLevel.balanced}/>
    <Button value={ChargeStationLevel.docked}/>
    <Button value={ChargeStationLevel.failed}/>
    <Button value={ChargeStationLevel.NotAttempted}/>
</div>