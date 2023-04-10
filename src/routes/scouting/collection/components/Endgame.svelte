<script lang="ts">
    import ClimbDistance from "./ClimbList.svelte";
</script>

<div class="h-[75vh] flex flex-col justify-evenly">
    <h1 class="text-w text-center text-2xl font-bold">Climb Height</h1>
    <ClimbDistance distance="Traversal"/>
    <ClimbDistance distance="High"/>
    <ClimbDistance distance="Middle"/>
    <ClimbDistance distance="Low"/>
</div>