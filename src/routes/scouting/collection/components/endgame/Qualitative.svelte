<script>
    import { WinState, scoutingData } from "$lib/ScoutingDataStore";
</script>

<h1 class="text-w text-2xl text-center font-bold my-4">Qualitative Data</h1>

<div class="flex flex-col justify-between h-3/4">
    <div>
        <div class="flex flex-row m-4">
            <input name="playDirty"
                   type="checkbox"
                   bind:checked={$scoutingData.playDirty}
                   class="appearance-none rounded shadow-sm p-5 checked:bg-active bg-inactive m-2"/>
            <label for="playDirty" class="flex flex-col justify-center text-w text-xl font-semibold">Play Dirty</label>
        </div>

        <div class="flex flex-row m-4 pt-2 border-t-2">
            <input name="won"
                   id="winlost"
                   type="radio"
                   bind:group={$scoutingData.win}
                   value={WinState.Win}
                   class="appearance-none rounded shadow-sm p-5 checked:bg-active bg-inactive mx-2"/>
            <label for="won" class="flex flex-col justify-center text-w text-xl font-semibold">Won</label>
        </div>
        <div class="flex flex-row m-4">
            <input name="lost"
                   id="winlost"
                   type="radio"
                   bind:group={$scoutingData.win}
                   value={WinState.Loss}
                   class="appearance-none rounded shadow-sm p-5 checked:bg-active bg-inactive mx-2"/>
            <label for="lost" class="flex flex-col justify-center text-w text-xl font-semibold">Lost</label>
        </div>
        <div class="flex flex-row m-4">
            <input name="tie"
                   id="winlost"
                   type="radio"
                   bind:group={$scoutingData.win}
                   value={WinState.Tie}
                   class="appearance-none rounded shadow-sm p-5 checked:bg-active bg-inactive mx-2"/>
            <label for="tie" class="flex flex-col justify-center text-w text-xl font-semibold">Tied</label>
        </div>
    </div>

    <div class="flex justify-center h-full">
        <textarea name="notes"
                placeholder="Notes"
                bind:value={$scoutingData.notes}
                class="rounded pb-5 w-5/6"></textarea>
    </div>
</div>