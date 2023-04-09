<script lang="ts">
    import Scoring from "./components/Scoring.svelte";
    import Endgame from "./components/Endgame.svelte";
    import QualitativeData from "./components/QualitativeData.svelte";

    import { pageLocation, scoutingData } from "../../../stores/DataStore";
    var page: string;
    pageLocation.subscribe((data) => page = data);

    import type { ScoutingData } from "../../../stores/DataStore";
    var readScoutingData: ScoutingData;
    scoutingData.subscribe((data) => readScoutingData = data);

</script>

{#if page === "auto"}
    <Scoring mode="auto"/>
    <div class="flex justify-evenly m-2">
        <button type="button" on:click={() => scoutingData.update((data) => { data.autoTaxi = !data.autoTaxi; return data })}
            class={`w-2/6 text shadow-sm rounded ${(readScoutingData.autoTaxi) ?
                'bg-blue-700' : 'bg-gray-700'} py-3 px-8 text-2xl`}>
            Taxi
        </button>

        <button type="button" on:click={() => scoutingData.update((data) => { data.autoHeld = !data.autoHeld; return data })}
            class={`w-2/6 text shadow-sm rounded ${(readScoutingData.autoHeld) ?
                'bg-blue-700' : 'bg-gray-700'} py-3 px-8 text-2xl`}>
            Held
        </button>
    </div>
{/if}

{#if page === "tele"}
    <Scoring mode="tele"/>
    <p class="text text-center font-semibold text-lg">Estimated Score:
        {(4 * readScoutingData.autoHigh) + (2 * readScoutingData.autoLow) + (readScoutingData.autoTaxi ? 2 : 0) +
         (2 * readScoutingData.teleHigh) + readScoutingData.teleLow}</p>
{/if}

{#if page === "end"}
    <div class="flex flex-row">
        <div class="w-1/2 flex flex-col">
            <Endgame/>
            <button type="submit" class="w-3/5 text text-center shadow-sm rounded bg-blue-800 py-3 text-2xl my-2 mx-auto"
                on:click={() => console.log(readScoutingData)}>Submit</button>
        </div>
        <div class="w-1/2">
            <QualitativeData/>
        </div>
    </div>
{/if}