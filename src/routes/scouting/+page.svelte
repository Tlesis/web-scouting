<script lang="ts">
    import { enhance } from "$app/forms";
    import type { ActionData, PageData } from "./$types";
    export let form: ActionData;
    export let data: PageData;

    const { matches, supabase } = data;
    let existing = data.existing;

    const handleUpdate = async () => {
        const { data, error } = await supabase.from("scouting-data").select("matchid, teamid");
        if (error) return;
        existing = data;
    };

    supabase
        .channel("any")
        .on("postgres_changes", { event: "INSERT", schema: "public", table: "scouting-data" }, handleUpdate)
        .on("postgres_changes", { event: "DELETE", schema: "public", table: "scouting-data" }, handleUpdate)
        .subscribe();

    let matchid: string;

    $: match = ((match) => {
        if (!match) return { red: [], blue: [] };
        const rows = existing.filter((row) => row.matchid === match.matchNumber);
        if (rows.length === 0) return match;
        return {
            red: match.red.filter((team) => !rows.some((row) => row.teamid === team)),
            blue: match.blue.filter((team) => !rows.some((row) => row.teamid === team))
        };
    })(matches.find((match) => match.matchNumber === Number(matchid)));
</script>

<a href="/" class="inline-block portrait:w-1/4 landscape:w-1/6 text-w text-center text-xl shadow-sm rounded bg-active py-2 m-2">Back</a>

{#if form?.error}
    <span class="flex justify-center m-3 text-red-700 text-center text-2xl font-bold capitalize">{form.error}</span>
{/if}

<form autocomplete="off" class="mx-10 my-8 max-w-screen-sm bg-primary rounded-lg py-2" method="post" use:enhance>
    <div class="mt-2">
        <label for="matchid" class="block text-w text-3xl font-bold text-center mb-2">Match</label>
        <input type="tel" required name="matchid" bind:value={matchid} placeholder="Qualification Match ID"
            class="block m-auto portrait:w-5/6 landscape:w-2/3 text-xl text-center rounded-lg shadow-sm">
    </div>

    <div class="mt-2">
        <label for="teamid" class="block text-w text-3xl font-bold text-center mb-2">Team</label>
        <input type="tel" name="teamid" placeholder="Team Number"
            class="block m-auto portrait:w-5/6 landscape:w-2/3 text-xl text-center rounded-lg shadow-sm">
    </div>
    <div class="mt-2 flex portrait:flex-col landscape:justify-center portrait:h-10 landscape:h-8">
        <strong class="text-center text-w">&nbsp;Teams Available to Scout:&nbsp;</strong>
        <div class="landscape:flex-row justify-center">
            <p class="text-center font-bold text-red-600">{match.red.join(" ")}</p>
            <p class="text-center font-bold text-blue-400">{match.blue.join(" ")}</p>
        </div>
    </div>

    <div class="landscape:mt-6 portrait:mt-12">
        <button type="submit" class="block mx-auto landscape:w-2/6 portrait:w-1/2 text-center text-w text-2xl shadow-sm rounded bg-active py-4 px-8">Start</button>
    </div>
</form>
