<script>
    import { scoutingData } from "$lib/ScoutingDataStore";
</script>

<h1 class="text-w text-2xl text-center font-bold my-4">Qualitative Data</h1>

<div class="flex flex-col justify-between h-full">
    <div class="flex flex-row m-4">
        <input name="won"
               type="checkbox"
               bind:checked={$scoutingData.win}
               class="appearance-none rounded shadow-sm p-5 checked:bg-active bg-inactive m-2"/>
        <label for="won" class="flex flex-col justify-center text-w text-xl font-semibold">Won</label>
    </div>

    <div class="flex justify-center h-1/3">
        <textarea name="notes"
                placeholder="Notes"
                bind:value={$scoutingData.notes}
                class="rounded w-5/6"></textarea>
    </div>
</div>