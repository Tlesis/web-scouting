<script lang="ts">
    import { scoutingData } from "$lib/ScoutingDataStore";
    import { ScoutingPages } from "$lib/types";

    export let bgcolor: string,
               mode: number;

    export let order: number,
               row: number;
</script>

{#if mode === ScoutingPages.auto}
<input type="checkbox"

       bind:checked={$scoutingData.auto[order].activated[row]}
       name="{mode}-{order}-{row}"
       class={`appearance-none rounded shadow-sm p-4 ${bgcolor} bg-inactive my-1`}/>

{:else if mode === ScoutingPages.teleop}

    <input type="checkbox"
        bind:checked={$scoutingData.teleop[order].activated[row]}
        name="{mode}-{order}-{row}"
        class={`appearance-none rounded shadow-sm p-4 ${bgcolor} bg-inactive my-1`}/>

{/if}