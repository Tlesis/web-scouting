<script lang="ts">
    import { empty } from "svelte/internal";
    import { scoutingData, exportData, makeRow } from "../../stores/DataStore";

    let matchid: number,
        teamid: number;

    const submitData = () => {
        scoutingData.update((data) => {
            data.matchid = matchid;
            data.teamid = teamid;

            return data;
        });

        makeRow();
        exportData();

        location.href="/scouting/collection"
    }
</script>

<form on:submit|preventDefault={submitData}>
    <div class="flex flex-col align-middle my-10">
        <label for="matchid" class="text-w font-bold mb-2 text-center text-3xl">Match</label>
        <input type="text" bind:value={matchid} name="matchid" placeholder="Qualification Match ID"
            class="appearance-none shadow-sm border border-slate-400 focus:border-gray-600 rounded-lg text-center text-xl mx-[5vw]">
    </div>

    <div class="flex flex-col align-middle my-10">
        <label for="teamid" class="text-w font-bold mb-2 text-center text-3xl">Team</label>
        <input type="text" bind:value={teamid} name="teamid" placeholder="Team Number"
            class="appearance-none shadow-sm border border-slate-400 focus:border-gray-600 rounded-lg text-center text-xl mx-[5vw]">
    </div>

    <div class="flex justify-center my-20">
        <button type="submit" class={`w-1/2 text-w shadow-sm rounded ${((matchid != null && teamid != null)
                                                                       && (matchid != 0 && teamid != 0)) ?
                                                                       'bg-active' : 'bg-inactive'} py-4 px-8 text-2xl`}>
                Start
        </button>
    </div>
</form>