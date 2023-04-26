<script lang="ts">
    import Checkbox from "./ScoringCheckbox.svelte";

    const rows = [0, 1, 2, 3, 4, 5, 6, 7, 8];

    export let order: number[];

    const getColor = (row: number, order: number) => {
        if (order === 2)
            return "checked:bg-ground";
        if (row % 3 === 1)
            return "checked:bg-purple-800";

        return "checked:bg-yellow-600";
    };
</script>

{#each rows as row}
    <tr>
        <td>
            <Checkbox bgcolor={getColor(row, order[0])}
                      order={order[0]}
                      row={row}/>
        </td>
        <td class="border-x-2 border-dashed">
            <Checkbox bgcolor={getColor(row, order[1])}
                      order={order[1]}
                      row={row}/>
        </td>
        <td>
            <Checkbox bgcolor={getColor(row, order[2])}
                      order={order[2]}
                      row={row}/>
        </td>
    </tr>
{/each}
