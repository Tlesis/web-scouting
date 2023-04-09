<script lang="ts">
    export var distance: string;
    import { scoutingData, setClimb } from "../../../../stores/DataStore";
    import type { ScoutingData } from "../../../../stores/DataStore";
    var readScoutingData: ScoutingData;
    scoutingData.subscribe((data) => readScoutingData = data);
</script>

<div class="flex flex-row justify-evenly">
    <button type="button" class={`w-0 text text-center shadow-sm rounded ${(readScoutingData.endClimbPos === distance) ? 'bg-blue-700': 'bg-gray-700'} p-4 my-2`}
        on:click={() => setClimb(distance)}></button>
    <label for={distance} class="text text-xl w-16 p-0 m-2">{distance}</label>
</div>