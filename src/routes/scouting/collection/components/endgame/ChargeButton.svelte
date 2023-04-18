<script lang="ts">
    import { ChargeStationLevel, scoutingData } from "$lib/ScoutingDataStore";

    export let value: ChargeStationLevel;
</script>

<div class="flex flex-row m-4">
    <input type="radio"
           id={value}
           name="endgame-score"
           class="appearance-none rounded shadow-sm p-5 checked:bg-active bg-inactive m-2"
           bind:group={$scoutingData.endgame}
           value={value}/>
    <lable for={value} class="flex flex-col justify-center text-w text-xl font-semibold">
        {value}
    </lable>
</div>