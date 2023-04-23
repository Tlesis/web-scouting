<script lang="ts">
    import { AllianceColor } from "$lib/types";
    import type { ActionData, PageData } from "./$types";

    export let form: ActionData;

    export let data: PageData;
    $: ({ matches } = data);

    let matchid: string,
        teamid: string,
        teamcolor: AllianceColor | undefined;

    $: teams = matches.find((match) => match.matchNumber === Number(matchid));
    $: teamcolor =
        teams?.red?.includes(Number(teamid)) ? AllianceColor.red
        : teams?.blue?.includes(Number(teamid)) ? AllianceColor.blue
        : undefined;
</script>

<a href="/" class="inline-block portrait:w-1/4 landscape:w-1/6 text-w text-center text-xl shadow-sm rounded bg-active py-2 m-2">Back</a>

{#if form?.error}
    <span class="flex justify-center m-3 text-red-700 text-center text-2xl font-bold capitalize">{form.error}</span>
{/if}

<form autocomplete="off" class="mx-10 my-8 max-w-screen-sm bg-primary rounded-lg pt-2" method="post">
    <div class="mt-2">
        <label for="matchid" class="block text-w text-3xl font-bold text-center mb-2">Match</label>
        <input type="tel" name="matchid" bind:value={matchid} placeholder="Qualification Match ID"
            class="block m-auto portrait:w-5/6 landscape:w-2/3 text-xl text-center rounded-lg shadow-sm">
    </div>

    <div class="mt-2">
        <label for="teamid" class="block text-w text-3xl font-bold text-center mb-2">Team</label>
        <input type="tel" name="teamid" bind:value={teamid} placeholder="Team Number"
            class="block m-auto portrait:w-5/6 landscape:w-2/3 text-xl text-center rounded-lg shadow-sm">
    </div>
    <div class="mt-2 flex portrait:flex-col landscape:justify-center portrait:h-10 landscape:h-8">
        <strong class="text-center text-w">&nbsp;Teams Available to Scout:&nbsp;</strong>
        <div class="landscape:flex-row justify-center">
            <p class="text-center font-bold text-red-600">{teams?.red?.join(" ") ?? ""}</p>
            <p class="text-center font-bold text-blue-400">{teams?.blue?.join(" ") ?? ""}</p>
        </div>
    </div>

    <div class="landscape:mt-6 portrait:mt-12">
        <button type="submit" class="block mx-auto landscape:w-2/6 portrait:w-1/2 text-center text-w text-2xl shadow-sm rounded bg-active py-4 px-8">Start</button>
    </div>

    <input name="teamcolor" class="invisible" bind:value={teamcolor}/>
</form>
