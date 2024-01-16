<script lang="ts">
    import { AllianceColor, scoutingData, scoutingPage } from "$lib/ScoutingDataStore";

    const teamcolor = $scoutingData.teamcolor;
    const order = (teamcolor === AllianceColor.red) ? [0, 1, 2] : [2, 1, 0];

    const rows = [0, 1, 2, 3, 4, 5, 6, 7, 8];

    const getColor = (row: number, order: number) => {
        if (order === 2)
            return "checked:bg-ground";
        if (row % 3 === 1)
            return "checked:bg-purple-800";

        return "checked:bg-yellow-600";
    };
</script>

<div class={`border-8 ${(teamcolor === AllianceColor.blue) ? "border-blue-900" : "border-active"} rounded`}>
    <table class="text-w text-center mt-2 w-full">
        <thead>
            <tr>
                {#if teamcolor === AllianceColor.red}
                    <th class="w-1/3"><p class="w-11/12 bg-inactive rounded mx-auto">Top</p></th>
                    <th class="w-1/3"><p class="w-11/12 bg-inactive rounded mx-auto">Middle</p></th>
                    <th class="w-1/3"><p class="w-11/12 bg-inactive rounded mx-auto">Bottom</p></th>
                {:else}
                    <th class="w-1/3"><p class="w-11/12 bg-inactive rounded mx-auto">Bottom</p></th>
                    <th class="w-1/3"><p class="w-11/12 bg-inactive rounded mx-auto">Middle</p></th>
                    <th class="w-1/3"><p class="w-11/12 bg-inactive rounded mx-auto">Top</p></th>
                {/if}
            </tr>
        </thead>
        <tbody>
            {#each rows as row, i}
                <tr class={`${(i === 3 || i === 6) ? "border-t-2 border-gray-800" : ""} `}>
                    {#each order as j}
                        <td class={`${(j === 1) ? "border-x-2 border-dashed" : ""}`}>
                            <input type="checkbox"
                                bind:checked={$scoutingData.auto[j].activated[row]}
                                name="{$scoutingPage}-{order}-{row}"
                                class={`appearance-none rounded shadow-sm p-4 ${getColor(row, j)} bg-inactive my-1`}/>
                        </td>
                    {/each}
                </tr>
            {/each}
        </tbody>
    </table>
</div>
