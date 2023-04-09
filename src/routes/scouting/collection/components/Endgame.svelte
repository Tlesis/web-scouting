<script lang="ts">
    import Checklist from "./List.svelte";
</script>

<div class="h-[75vh] flex flex-col justify-evenly">
    <h1 class="text text-center text-2xl font-bold">Climb Height</h1>
    <Checklist distance="Traversal"/>
    <Checklist distance="High"/>
    <Checklist distance="Middle"/>
    <Checklist distance="Low"/>
</div>