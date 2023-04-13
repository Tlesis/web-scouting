<script lang="ts">
    import type { ActionData } from './$types';
    import { enhance } from "$app/forms";
    export let form: ActionData;
</script>

{#if form?.error}
    <span class="text-red-700 bg-w">{form?.error}</span>
{/if}

<h1 class="text-w text-center text-4xl font-semibold my-10">Reset Password</h1>
<form class="flex flex-col mx-10 h-full bg-primary rounded-lg p-5" method="POST" use:enhance>
    <label for="email" class="text-xl text-w mb-2">To reset your password, enter your email address:</label>
    <input type="email" name="email" class="w-full px-3 py-2 mb-8 rounded border border-gray-300" placeholder="Email Address">
    <button type="submit" class="px-4 py-2 text-xl text-w bg-active rounded shadow">Send Email</button>
</form>