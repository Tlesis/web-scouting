<script lang="ts">
    import type { ActionData } from './$types';
    import { enhance } from "$app/forms";
    export let form: ActionData;
</script>

{#if form?.error}
    <span class="text-red-700 bg-white">{form?.error}</span>
{/if}

<form class="text-w" method="POST" use:enhance>
    <label for="email">Email:</label>
    <input type="email" name="email" class="text-black p-1"><br>
    <button type="submit">Send email</button>
</form>
