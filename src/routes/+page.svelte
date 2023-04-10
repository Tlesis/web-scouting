<main class="flex flex-col gap-10">
    <button type="button" on:click={() => location.href='/'}
        class="w-1/4 ml-2 text-w shadow-sm rounded bg-rose-800 py-2 text-xl mt-2">
        Log out
    </button>

    <button type="button" on:click={() => location.href='/scouting'}
        class="w-2/3 mx-auto text-w shadow-sm rounded bg-active py-[10vh] mb-[5vh] mt-[3vh] text-xl">
        Start<br>Scouting
    </button>

    <button type="button" class="w-2/3 mx-auto text-w shadow-sm rounded bg-active py-[10vh] text-xl">
        Data
    </button>
</main>