<script lang="ts">
    import "../app.css";
    import type { PageData } from "./$types";
    export let data: PageData;
</script>

<nav class="sticky top-0 bg-blue-700 shadow-lg text-b">
    <div class="flex p-2">
        <a href="/" class="bg-white rounded p-1">Home</a>
        <div class="flex-grow"></div>
        {#if !data.session}
            <a href="/login" class="bg-white rounded p-1">Log in</a>
        {:else}
            <a href="/account" class="bg-white rounded-p-1">Account</a>
        {/if}
    </div>
</nav>

<slot/>
