<script lang="ts">
    import { AllianceColors } from "$lib/types";
    import type { PageData } from "./$types";

    export let data: PageData;

    let matchId = '';

    $: teams = data.matches.find((match) => match.matchNumber === +matchId);
</script>

<a href="/" class="inline-block w-1/4 text-w text-center text-xl shadow-sm rounded bg-active py-2 m-2">Back</a>

<form class="max-w-screen-md h-3/4 border border-dashed">
    <div class="mt-10">
        <label for="matchid" class="block text-w text-3xl font-bold text-center mb-2">Match</label>
        <input type="tel" name="matchid" bind:value={matchId} placeholder="Qualification Match ID"
            class="block m-auto w-5/6 text-xl text-center border border-slate-400 rounded-lg shadow-sm">
    </div>

    <div class="mt-10">
        <label for="teamid" class="block text-w text-3xl font-bold text-center mb-2">Team</label>
        <input type="tel" name="teamid" placeholder="Team Number"
            class="block m-auto w-5/6 text-xl text-center border border-slate-400 rounded-lg shadow-sm">
    </div>
    <!-- just as an example -->
    <div class="mt-2 flex flex-col h-fit">
        <strong class="text-center text-w">Teams Available to Scout:</strong>
        <!-- TODO: prevent submit button from moving-->
        <p class="text-center font-bold text-red-600">{teams?.red?.join(' ') ?? ""}</p>
        <p class="text-center font-bold text-blue-400">{teams?.blue?.join(' ') ?? ""}</p>
    </div>

    <div class="mt-20">
        <button type="submit" class="block mx-auto w-1/2 text-w text-2xl shadow-sm rounded bg-inactive py-4 px-8">Start</button>
    </div>
</form>