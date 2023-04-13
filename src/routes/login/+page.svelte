<script lang="ts">
    import type { ActionData } from "./$types";
    import { enhance } from "$app/forms";
    export let form: ActionData;
</script>

<img src="branding/logo.png" alt="Team 1810 Catatronics" class="mx-auto my-5 sm:w-0 max-sm:w-40">

{#if form?.error}
    <span class="flex justify-center text-red-700 text-lg font-bold">{form.error}</span>
{/if}

<form class="flex flex-col gap-8 text-w mx-10 items-center" method="post" use:enhance>
    <div class="max-w-screen-md">
        <label for="email" class="text-3xl">Email:</label>
        <input type="email" name="email" class="text-black w-full appearance-none shadow-sm border border-slate-400 rounded p-1" value={form?.email ?? ""}>
    </div>
    <div class="max-w-screen-md">
        <label for="password" class="text-3xl">Password:</label>
        <input type="password" name="password" class="text-black w-full appearance-none shadow-sm border border-slate-400 rounded p-1">
    </div>
    <button type="submit" class="text-w shadow-sm rounded bg-active p-2 text-xl">Log in</button>
    <a href="/login/forgot-password">Forgot password?</a>
</form>

