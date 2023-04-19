<script lang="ts">
    import { AllianceColor } from "$lib/types";
    import type { PageData } from "./$types";

    export let data: PageData;
    const database = data.database.data;
    console.log(data.database);

    let matchid: string,
        teamid: string,
        teamcolor: AllianceColor | undefined;

    $: TBAteams = data.matches.find((match) => match.matchNumber === +matchid);
    $: databaseTeams = database?.filter((data) => data.matchid === +matchid);

    $: allowedRedTeams = TBAteams?.red.filter((team) => !databaseTeams?.find((d) => +team === d.teamid));
    $: allowedBlueTeams = TBAteams?.blue.filter((team) => !databaseTeams?.find((d) => +team === d.teamid));

    $: teamcolor = allowedRedTeams?.includes(teamid) ? AllianceColor.red : allowedBlueTeams?.includes(teamid) ? AllianceColor.blue : undefined;
</script>

<a href="/" class="inline-block portrait:w-1/4 landscape:w-1/6 text-w text-center text-xl shadow-sm rounded bg-active py-2 m-2">Back</a>

<form autocomplete="off" class="m-auto max-w-screen-md" action="./scouting/collection" method="get">
    <div class="mt-2">
        <label for="matchid" class="block text-w text-3xl font-bold text-center mb-2">Match</label>
        <input type="tel" name="matchid" bind:value={matchid} placeholder="Qualification Match ID"
            class="block m-auto portrait:w-5/6 landscape:w-2/3 text-xl text-center border border-slate-400 rounded-lg shadow-sm">
    </div>

    <div class="mt-2">
        <label for="teamid" class="block text-w text-3xl font-bold text-center mb-2">Team</label>
        <input type="tel" name="teamid" bind:value={teamid} placeholder="Team Number"
            class="block m-auto portrait:w-5/6 landscape:w-2/3 text-xl text-center border border-slate-400 rounded-lg shadow-sm">
    </div>
    <div class="mt-2 flex portrait:flex-col landscape:justify-center portrait:h-10 landscape:h-8">
        <strong class="text-center text-w">Teams Available to Scout:</strong>
        <div class="landscape:flex-row justify-center">
            <p class="text-center font-bold text-red-600">&nbsp;{allowedRedTeams?.join(" ") ?? ""}</p>
            <p class="text-center font-bold text-blue-400">&nbsp;{allowedBlueTeams?.join(" ") ?? ""}</p>
        </div>
    </div>

    <div class="landscape:mt-6 portrait:mt-12">
        <button type="submit" class="block mx-auto landscape:w-2/6 portrait:w-1/2 text-center text-w text-2xl shadow-sm rounded bg-inactive py-4 px-8">Start</button>
    </div>

    <input name="teamcolor" class="invisible" bind:value={teamcolor}/>
</form>
