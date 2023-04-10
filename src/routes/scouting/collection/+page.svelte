<script lang="ts">
    import Scoring from "./components/Scoring.svelte";
    import Endgame from "./components/Endgame.svelte";
    import QualitativeData from "./components/QualitativeData.svelte";

    import { pageLocation, scoutingData } from "../../../stores/DataStore";

    var notes: string;

</script>

{#if $pageLocation === "auto"}
    <Scoring mode="auto"/>
    <div class="flex justify-evenly m-2">
        <button type="button" on:click={() => scoutingData.update((data) => { data.autoTaxi = !data.autoTaxi; return data })}
            class={`w-2/6 text-w shadow-sm rounded ${($scoutingData.autoTaxi) ?
                'bg-active' : 'bg-inactive'} py-3 px-8 text-2xl`}>
            Taxi
        </button>

        <button type="button" on:click={() => scoutingData.update((data) => { data.autoHeld = !data.autoHeld; return data })}
            class={`w-2/6 text-w shadow-sm rounded ${($scoutingData.autoHeld) ?
                'bg-active' : 'bg-inactive'} py-3 px-8 text-2xl`}>
            Held
        </button>
    </div>
{/if}

{#if $pageLocation === "tele"}
    <Scoring mode="tele"/>
    <p class="text-w text-center font-semibold text-lg">Estimated Score:
        {(4 * $scoutingData.autoHigh) + (2 * $scoutingData.autoLow) + ($scoutingData.autoTaxi ? 2 : 0) +
         (2 * $scoutingData.teleHigh) + $scoutingData.teleLow}</p>
{/if}

{#if $pageLocation === "end"}
    <div class="flex flex-row">
        <div class="w-1/2 flex flex-col">
            <Endgame/>
            <button type="submit" class="w-3/5 text-w text-center shadow-sm rounded bg-active py-3 text-2xl my-2 mx-auto"
                on:click={() => { if (confirm("Are you sure you want to submit?")) console.log($scoutingData); }}>Submit</button>
        </div>
        <div class="w-1/2 h-[85vh] flex flex-col justify-between border-l border-dashed">
            <QualitativeData/>
            <textarea name="teamid" placeholder="Notes" bind:value={notes}
                      class="appearance-none shadow-sm border border-slate-400 focus:border-gray-600 rounded-lg text-lg mx-[5vw] h-[30%]"></textarea>
        </div>
    </div>
{/if}