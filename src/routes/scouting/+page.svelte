<script lang="ts">
    import type { PageData } from "./$types";

    export let data: PageData;

    console.log(data.matches);
</script>

<a href="/" class="inline-block w-1/4 text-w text-center text-xl shadow-sm rounded bg-active py-2 m-2">Back</a>

<form class="max-w-screen-md">
    <div class="mt-10">
        <label for="matchid" class="block text-w text-3xl font-bold text-center mb-2">Match</label>
        <input type="tel" name="matchid" placeholder="Qualification Match ID"
            class="block m-auto w-5/6 text-xl text-center border border-slate-400 rounded-lg shadow-sm">
    </div>

    <div class="mt-10">
        <label for="teamid" class="block text-w text-3xl font-bold text-center mb-2">Team</label>
        <input type="tel" name="teamid" placeholder="Team Number"
            class="block m-auto w-5/6 text-xl text-center border border-slate-400 rounded-lg shadow-sm">
    </div>
    <!-- just as an example -->
    <!-- <div class="mt-2 flex flex-col">
        <b class="text-center text-w">Teams Available to Scout:</b>
        <b class="text-center text-red-700">1 2 3</b>
        <b class="text-center text-blue-400">4 5 6</b>
    </div> -->

    <div class="mt-20">
        <button type="submit" class="block m-auto w-1/2 text-w text-2xl shadow-sm rounded bg-inactive py-4 px-8">Start</button>
    </div>
</form>