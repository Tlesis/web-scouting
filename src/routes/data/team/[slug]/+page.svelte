<script lang="ts">
    import { EVENT_KEY } from "$lib/types";
    import type { PageData } from "./$types";
    import TeamTable from "./TeamTable.svelte";
    import { ppgStore } from "$lib/PPGStore";
    import { checks } from "./CheckedStore";
    import { score } from "$lib/ScoutingDataStore";

    export let data: PageData;

    ppgStore.set(data.team.ppg);
    $ppgStore.sort((a, b) => {
        if (a.pointTotal === b.pointTotal) {
            return b.totalTeleop - a.totalTeleop;
        } else {
            return (b.pointTotal / b.matchesPlayed) - (a.pointTotal / a.matchesPlayed);
        }
    });

    const teamid = Number(data.slug);
    const teamName = data.team.simple.find((team) => team.team_number === teamid)?.nickname;

    const recordInfo = data.team.status["frc" + teamid].qual.ranking.record ?? { wins: "?", losses: "?", ties: "?" };
    const rank = data.team.status["frc" + teamid].qual.ranking.rank ?? 0;

    const ppg = data.team.ppg.find((team) => team.teamid === teamid);
    const ppgRank = $ppgStore.findIndex((ppgstore) => ppg === ppgstore) + 1;

    const stats = data.team.stats.filter((stat) =>
        (stat.red_1 === teamid || stat.red_2 === teamid || stat.red_3 === teamid) ||
        (stat.blue_1 === teamid || stat.blue_2 === teamid || stat.blue_3 === teamid)
    );
    stats.sort((a, b) => a.match_number - b.match_number);

    const existing = data.existing.filter((team) => team.teamid === teamid);

    const round = (num: number) => Math.round(num * 10) / 10;

    const ignoredMatchesScores = () => {
        let scores = { total: 0, auto: 0, teleop: 0, endgame: 0 };
        for (var i = 0; i < stats.length; i++) {
            if ($checks[i]) continue;

            const data = existing.find((match) => match.matchid === stats[i].match_number);
            if (data === undefined) continue;

            const compiledScores = score(data).scoredData;

            scores.total += (compiledScores.auto + compiledScores.teleop + compiledScores.endgame);
            scores.auto += compiledScores.auto;
            scores.teleop += compiledScores.teleop;
            scores.endgame += compiledScores.endgame;
        }

        return scores;
    };

    $: numberOfMatches = stats.filter((stat, i) => $checks[i]).length;
    $: total = round(((ppg?.pointTotal ?? 0) - ignoredMatchesScores().total) / numberOfMatches).toString() + ((numberOfMatches !== stats.length) ? "*" : "");
    $: auto = round(((ppg?.totalAuto ?? 0) - ignoredMatchesScores().auto) / numberOfMatches).toString() + ((numberOfMatches !== stats.length) ? "*" : "");
    $: teleop = round(((ppg?.totalTeleop ?? 0) - ignoredMatchesScores().teleop) / numberOfMatches).toString() + ((numberOfMatches !== stats.length) ? "*" : "");
    $: endgame = round(((ppg?.totalEndgame ?? 0) - ignoredMatchesScores().endgame) / numberOfMatches).toString() + ((numberOfMatches !== stats.length) ? "*" : "");
</script>

<svelte:head>
    <title>CATATRONICS | Team {teamid}</title>
</svelte:head>

{#if teamName && ppg}

    <h1 class="text-w text-3xl text-center mt-8">Team <span class="font-mono italic">{teamid}</span></h1>
    <div class="flex justify-center">
        <a href={`https://www.thebluealliance.com/team/` + teamid} target="_blank" class="flex">
            <h2 class="text-w text-2xl my-2">{teamName}</h2>
            <img src="/tba.webp" alt="" class="m-2"/>
        </a>
    </div>

    <hr class="mx-24 my-8">

    <p class="text-w text-lg my-2 mx-36">Team {teamid} ({teamName}) has a record of <b>{recordInfo.wins}-{recordInfo.losses}-{recordInfo.ties}</b>.</p>
    <div class="flex my-4">
        <p class="text-w text-lg ml-36">PPG Breakdown:</p>
        <span class="mx-2 rounded-md px-2 bg-red-700 text-w text-md">Total: {total}</span>
        <span class="mx-2 rounded-md px-2 bg-blue-800 text-w text-md">Auto: {auto}</span>
        <span class="mx-2 rounded-md px-2 bg-orange-600 text-w text-md">Teleop: {teleop}</span>
        <span class="mx-2 rounded-md px-2 bg-green-700 text-w text-md">Endgame: {endgame}</span>
    </div>
    <div class="text-center">
        <div class="w-fit mx-auto text-w bg-blue-600 py-1 px-4 rounded-md">
            <a href="/data/PPG" data-sveltekit-preload-data="hover">
                <h1 class="font-semibold text-2xl">
                    {ppgRank}<sup class="text-sm font-normal">{
                        (() => {
                            if (ppgRank === 1)
                                return "st";
                            if (ppgRank === 2)
                                return "nd";
                            if (ppgRank === 3)
                                return "rd";
                            return "th";
                        })()}
                    </sup>
                </h1>
                <h2>Best PPG</h2>
                <h3 class="text-sm">out of {data.team.simple.length}</h3>
            </a>
        </div>
    </div>

    <hr class="mx-24 my-8">

    <div class="mx-28 flex">
        <div class="text-w w-1/3">
            <a href={`https://www.thebluealliance.com/event/${EVENT_KEY}`} target="_blank"
                class="underline text-link text-xl">
                {data.event?.name ?? "?"}
            </a>
            <h2 class="ml-2 mb-3">Week: {data.event?.week ?? "?"}</h2>
            <h1>Rank: <b>{rank}</b></h1>
            <h1>Record: <b>{recordInfo.wins}-{recordInfo.losses}-{recordInfo.ties}</b></h1>
        </div>

        <div class="w-full">
            <h3 class="text-w text-center mb-4 text-lg">Green = Team Won Match</h3>
            <TeamTable stats={stats} existing={existing} teamid={teamid}/>
        </div>
    </div>

    <footer class="w-screen bg-nav shadow-lg flex border-t rounded-t mt-16">
        <p class="text-w m-8">Design <span class="italic">slightly</span> inspired by <a href={`https://statbotics.io/team/${teamid}`} target="_blank" class="text-link underline">Statbotics</a></p>
    </footer>

{:else}
    <div class="text-w text-center m-8">
        <h1 class="text-8xl font-bold mt-4">Error</h1>
        <h2 class="text-3xl mt-4">Team <span class="font-mono italic">{teamid}</span> Not Available</h2>
        <button on:click={() => history.back()} class="rounded bg-active p-2 w-fit mt-4">« Go back</button>
    </div>
{/if}