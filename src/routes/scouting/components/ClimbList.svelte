<script lang="ts">
    export var distance: string;
    import { scoutingData, setClimb } from "../../../stores/DataStore";
</script>

<div class="flex flex-row justify-evenly">
    <button type="button" class={`w-0 text-w text-center shadow-sm rounded ${($scoutingData.endClimbPos === distance) ? 'bg-active': 'bg-inactive'} p-4 my-2`}
        on:click={() => setClimb(distance)}></button>
    <label for={distance} class="text-w text-xl w-16 p-0 m-2">{distance}</label>
</div>