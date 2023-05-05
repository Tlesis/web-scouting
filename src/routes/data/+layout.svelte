<nav class="w-screen bg-nav shadow-lg flex border-b rounded-b top-0">
    <a href="/" class="group text-w wide-text text-2xl px-8 py-2 my-2">
        CATATRONICS
        <span class="block max-w-0 group-hover:max-w-full transition-all duration-300 h-0.5 bg-w"></span>
    </a>
    <div class="w-1/5 flex justify-around text-md text-w font-thin">
        <a href="/data" class="group my-5 transition duration-300">
            Data
            <span class="block max-w-0 group-hover:max-w-full transition-all duration-200 h-px bg-w"></span>
        </a>
        <a href="/data/PPG" class="group my-5 transition duration-300">
            PPG
            <span class="block max-w-0 group-hover:max-w-full transition-all duration-200 h-px bg-w"></span>
        </a>
        <a href="/data/teams" class="group my-5 transition duration-300">
            Teams
            <span class="block max-w-0 group-hover:max-w-full transition-all duration-200 h-px bg-w"></span>
        </a>
        <a href="/data/matches" class="group my-5 transition duration-300">
            Matches
            <span class="block max-w-0 group-hover:max-w-full transition-all duration-200 h-px bg-w"></span>
        </a>
    </div>
</nav>

<slot/>

<style lang="postcss">
    .wide-text {
        letter-spacing: 5px;
    }
</style>