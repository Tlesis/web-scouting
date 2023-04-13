<script lang="ts">
    import type { PageData } from "./$types";

    export let data: PageData;

    let matchId = '';

    $: teams = data.matches.find((match) => match.matchNumber === +matchId);
</script>

<a href="/" class="inline-block max-sm:w-1/4 sm:w-1/6 text-w text-center text-xl shadow-sm rounded bg-active py-2 m-2">Back</a>

<form autocomplete="off" class="m-auto max-w-screen-md" on:submit|preventDefault={() => console.log("submit")}>
    <div class="mt-2">
        <label for="matchid" class="block text-w text-3xl font-bold text-center mb-2">Match</label>
        <input type="tel" name="matchid" bind:value={matchId} placeholder="Qualification Match ID"
            class="block m-auto max-sm:w-5/6 sm:w-2/3 text-xl text-center border border-slate-400 rounded-lg shadow-sm">
    </div>

    <div class="mt-2">
        <label for="teamid" class="block text-w text-3xl font-bold text-center mb-2">Team</label>
        <input type="tel" name="teamid" placeholder="Team Number"
            class="block m-auto max-sm:w-5/6 sm:w-2/3 text-xl text-center border border-slate-400 rounded-lg shadow-sm">
    </div>
    <div class="mt-2 flex max-sm:flex-col sm:justify-center max-sm:h-10 sm:h-8">
        <strong class="text-center text-w">Teams Available to Scout:</strong>
        <div class="sm:flex-row justify-center">
            <p class="text-center font-bold text-red-600">&nbsp;{teams?.red?.join(' ') ?? ""}</p>
            <p class="text-center font-bold text-blue-400">{teams?.blue?.join(' ') ?? ""}</p>
        </div>
    </div>

    <div class="sm:mt-6 max-sm:mt-12">
        <button type="submit" class="block mx-auto sm:w-2/6 max-sm:w-1/2 text-center text-w text-2xl shadow-sm rounded bg-inactive py-4 px-8">Start</button>
    </div>
</form>