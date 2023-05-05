<script lang="ts">
    import type { PageData } from "./$types";

    export let data: PageData;

    data.simple.sort((a, b) => a.team_number - b.team_number);
</script>

<h1 class="m-4 text-w text-4xl text-center">Please Choose A Team</h1>

<hr class="mx-36">

<div class="flex justify-center my-8">
    <table class="text-w text-center mt-2 w-1/3 font-thin">
        <thead>
            <th class="w-1/12 border-b border-r"><span class="w-11/12 rounded my-2 mx-auto text-2xl">Number</span></th>
            <th class="w-1/12 border-b border-l"><span class="w-11/12 rounded my-2 mx-auto text-2xl">Name</span></th>
        </thead>
        <tbody>
            {#each data.simple as team }
                <tr>
                    <td class="border-r"><a href={`/data/team/` + team.team_number.toString() }>{team.team_number}</a></td>
                    <td class="border-l break-words underline"><a href={`/data/team/` + team.team_number.toString() }>{team.nickname}</a></td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>