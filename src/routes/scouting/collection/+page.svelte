<script lang="ts">
    import Scoring from "./components/Scoring.svelte";

    import { pageLocation, scoutingData } from "../../../stores/DataStore";
    var page: string;
    pageLocation.subscribe((data) => page = data);

    import type { ScoutingData } from "../../../stores/DataStore";
    var readScoutingData: ScoutingData;
    scoutingData.subscribe((data) => readScoutingData = data);

</script>

{#if page === "auto"}
    <Scoring mode="auto"/>
    <div class="flex justify-evenly m-3">
        <button type="button" on:click={() => scoutingData.update((data) => { data.autoTaxi = !data.autoTaxi; return data })}
            class={`w-2/6 text shadow-sm rounded ${(0) ?
                'bg-blue-800' : 'bg-gray-700'} py-3 px-8 text-2xl`}>
            Taxi
        </button>

        <button type="button" on:click={() => scoutingData.update((data) => { data.autoHeld = !data.autoHeld; return data })}
            class={`w-2/6 text shadow-sm rounded ${(0) ?
                'bg-blue-800' : 'bg-gray-700'} py-3 px-8 text-2xl`}>
            Held
        </button>
    </div>
{/if}

{#if page === "tele"}
    <Scoring mode="tele"/>
{/if}

{#if page === "end"}
    <p>hello</p>
{/if}