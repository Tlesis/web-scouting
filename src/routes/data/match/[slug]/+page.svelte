<script lang="ts">
    import type { PageData } from "./$types";

    export let data: PageData;

    $: match = Number(data.slug);
</script>

<svelte:head>
    <title>CATATRONICS | Match {match}</title>
</svelte:head>

<a class="mr-16" href={`/data/match/${match - 1}`}>
    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" class="text-3xl text-link" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"></path>
    </svg>
</a>

<a class="ml-16" href={`/data/match/${match + 1}`}>
    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" class="text-3xl lg:text-4xl text-link" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"></path>
    </svg>
</a>