<script lang="ts">
    import type { PageData } from "./$types";
    import TeamTable from "./TeamTable.svelte";
    import { ppgStore } from "$lib/PPGStore";
    import { checks } from "./CheckedStore";
    import { score } from "$lib/ScoutingDataStore";

    export let data: PageData;

    // cache the teamid from the slug so it doesnt get requested a whole bunch
    const teamid = data.slug;

    // set up ppg store
    ppgStore.set(data.team.ppg);

    // find the instance of the team in the slug
    const ppg = data.team.ppg.find((team) => team.teamid === teamid);
    // find the index of the team because with the sorting above this will give the teams PPG rank
    const ppgRank = $ppgStore.findIndex((ppgstore) => ppg === ppgstore) + 1;

    // figure out and cache the name of the team to display
    const teamName = data.team.simple;

    const record = data.team.ranking.Rankings[0];
    const recordString = `${record.wins}-${record.losses}-${record.ties}`

    const existing = data.existing;
    // number of matches played (more accurately scouted) by the team in question
    const matchesPlayed = existing.length;

    // find all the scores of the matches to ignore
    const breakdownScores = (() => {
        const cache: { [key: string]: any} = {};

        return (checks: boolean[]) => {
            const cacheKey = JSON.stringify(checks);
            if (cacheKey in cache)
                return cache[cacheKey];

            let total = 0,
                auto = 0,
                teleop = 0,
                endgame = 0;
            for (let i = 0; i < matchesPlayed; i++) {
                if (checks[i]) continue;

                const data = existing.find((match) => match.matchid === i + 1);

                if (data) {
                    const compiledScores = score(data).scoredData;
                    total += (compiledScores.auto + compiledScores.teleop + compiledScores.endgame);
                    auto += compiledScores.auto;
                    teleop += compiledScores.teleop;
                    endgame += compiledScores.endgame;
                }
            }

            const round = (num: number) => Math.round(num * 10) / 10;

            const result = {
                total: round(((ppg?.pointTotal || 0) - total) / numberOfAllowedMatches),
                auto: round(((ppg?.totalAuto || 0) - auto) / numberOfAllowedMatches),
                teleop: round(((ppg?.totalTeleop || 0) - teleop) / numberOfAllowedMatches),
                endgame: round(((ppg?.totalEndgame || 0) - endgame) / numberOfAllowedMatches)
            };

            cache[cacheKey] = result;
            return result;
        }
    })();

    // number of matches still left checked
    $: numberOfAllowedMatches = (() => {
        const numUncheckedMatches = $checks.filter((check) => !check).length;
        return Math.max(matchesPlayed - numUncheckedMatches, 1);
    })();
    $: breakdownScore = breakdownScores($checks);
    $: suffix = ((numberOfAllowedMatches !== matchesPlayed) ? "*" : "");
</script>

<svelte:head>
    <title>CATATRONICS | Team {teamid}</title>
</svelte:head>

{#if teamName && ppg}
<div class="max-md:hidden">
    <h1 class="text-w text-3xl text-center mt-8">Team <span class="font-mono italic">{teamid}</span></h1>
    <div class="flex justify-center">
        <a href={`https://www.thebluealliance.com/team/` + teamid} target="_blank" class="flex">
            <h2 class="text-w text-2xl my-2">{teamName}</h2>
            <img src="/tba.webp" alt="" class="m-2"/>
        </a>
    </div>

    <hr class="mx-24 my-8">

    <p class="text-w text-lg my-2 mx-36">Team {teamid} ({teamName}) has a record of <b>{recordString}</b>.</p>
    <div class="flex my-4">
        <p class="text-w text-lg ml-36">PPG Breakdown:</p>
        <span class="mx-2 rounded-md px-2 bg-red-700 text-w text-md">Total: {breakdownScore.total + suffix}</span>
        <span class="mx-2 rounded-md px-2 bg-blue-800 text-w text-md">Auto: {breakdownScore.auto + suffix}</span>
        <span class="mx-2 rounded-md px-2 bg-orange-600 text-w text-md">Teleop: {breakdownScore.teleop + suffix}</span>
        <span class="mx-2 rounded-md px-2 bg-green-700 text-w text-md">Endgame: {breakdownScore.endgame + suffix}</span>
    </div>
    <div class="text-center">
        <div class="w-fit mx-auto text-w bg-blue-600 py-1 px-4 rounded-md">
            <a href="/data/PPG" data-sveltekit-preload-data="hover">
                <h1 class="font-semibold text-2xl">
                    {ppgRank}<sup class="text-sm font-normal">{
                        (() => {
                            switch (ppgRank) {
                                case 1:
                                    return "st";
                                case 2:
                                    return "nd";
                                case 3:
                                    return "rd";
                                default:
                                    return "th";
                            }
                        })()}
                    </sup>
                </h1>
                <h2>Best PPG</h2>
                <h3 class="text-sm">out of {data.team.ppg.length}</h3>
            </a>
        </div>
    </div>

    <hr class="mx-24 my-8">

    <div class="mx-28 flex">
        <div class="text-w w-1/3">
            <a href={`https://www.thebluealliance.com/event/${data.eventkey}`} target="_blank"
                class="underline text-link text-xl">
                {data.event.name}
            </a>
            <h2 class="ml-2 mb-3">Week: {data.event.week}</h2>
            <h1>Rank: <b>{record.rank}</b></h1>
            <h1>Record: <b>{recordString}</b></h1>
        </div>

        <div class="w-full">
            <h3 class="text-w text-center mb-4 text-lg">Green = Team Won Match</h3>
            <TeamTable stats={data.team.stats} existing={existing} teamid={teamid}/>
        </div>
    </div>

    <footer class="w-screen bg-nav shadow-lg flex border-t rounded-t mt-16">
        <p class="text-w m-8">Design <span class="italic">slightly</span> inspired by <a href={`https://statbotics.io/team/${teamid}`} target="_blank" class="text-link underline">Statbotics</a></p>
    </footer>
</div>
{:else}
    <div class="text-w text-center m-8">
        <h1 class="text-8xl font-bold mt-4">Error</h1>
        <h2 class="text-3xl mt-4">Team <span class="font-mono italic">{teamid}</span> Not Available</h2>
        <button on:click={() => history.back()} class="rounded bg-active p-2 w-fit mt-4">« Go back</button>
    </div>
{/if}