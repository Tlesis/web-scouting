<script lang="ts">

    export let headers: string[];
</script>


<table>
    <thead>
        {#each headers as header}
            <th>{header}</th>
        {/each}
    </thead>
</table>