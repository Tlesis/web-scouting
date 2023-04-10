<script lang="ts">
    import { pageLocation } from "../../stores/DataStore";
</script>

<main>
    {#if $pageLocation != "match"}
        <nav class="flex justify-center w-100">
            <button type="button" class={`w-1/3 text-w shadow-sm border ${($pageLocation === "auto") ? 'bg-blue-950' : 'bg-active'} py-6 text-2xl`}
                on:click={() => pageLocation.update(() => "auto")}>Auto</button>
            <button type="button" class={`w-1/3 text-w shadow-sm border ${($pageLocation === "tele") ? 'bg-blue-950' : 'bg-active'} py-6 text-2xl`}
                    on:click={() => pageLocation.update(() => "tele")}>Tele-Op</button>
            <button type="button" class={`w-1/3 text-w shadow-sm border ${($pageLocation === "end") ? 'bg-blue-950' : 'bg-active'} py-6 text-2xl`}
                    on:click={() => pageLocation.update(() => "end")}>Endgame</button>
        </nav>
    {/if}

    <slot></slot>
</main>