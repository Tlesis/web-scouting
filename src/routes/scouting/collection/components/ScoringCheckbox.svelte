<script lang="ts">
    import { scoutingData, pageLocation } from "$lib/ScoutingDataStore";
    import { ScoutingPages } from "$lib/types";

    export let bgcolor: string;

    export let order: number, row: number;
</script>

{#if $pageLocation === ScoutingPages.auto}
<input type="checkbox"
       bind:checked={$scoutingData.auto[order].activated[row]}
       name="{$pageLocation}-{order}-{row}"
       class={`appearance-none rounded shadow-sm p-4 ${bgcolor} bg-inactive my-1`}/>

{:else if $pageLocation === ScoutingPages.teleop}

    <input type="checkbox"
        bind:checked={$scoutingData.teleop[order].activated[row]}
        name="{$pageLocation}-{order}-{row}"
        class={`appearance-none rounded shadow-sm p-4 ${bgcolor} bg-inactive my-1`}/>

{/if}
