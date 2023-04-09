<script lang="ts">
    import { pageLocation } from "../../../stores/DataStore";
    var page: string;

    pageLocation.subscribe((data) => page = data);
</script>

<main>
    <div class="flex justify-center w-100">
        <button type="button" class={`w-1/3 text shadow-sm border ${(page === "auto") ? 'bg-blue-950' : 'bg-blue-800'} py-6 text-2xl`}
            on:click={() => pageLocation.update(() => "auto")}>Auto</button>
        <button type="button" class={`w-1/3 text shadow-sm border ${(page === "tele") ? 'bg-blue-950' : 'bg-blue-800'} py-6 text-2xl`}
                on:click={() => pageLocation.update(() => "tele")}>Tele-Op</button>
        <button type="button" class={`w-1/3 text shadow-sm border ${(page === "end") ? 'bg-blue-950' : 'bg-blue-800'} py-6 text-2xl`}
                on:click={() => pageLocation.update(() => "end")}>Endgame</button>
    </div>

    <slot></slot>
</main>