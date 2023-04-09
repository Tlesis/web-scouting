<script lang="ts">
    export var mode: string;

    import { scoutingData } from "../../../../stores/DataStore";
    let high: number,
        low: number;

    scoutingData.subscribe((data) => {
        high = mode === "auto" ? data.autoHigh : data.teleHigh;
        low  = mode === "auto" ? data.autoLow : data.teleLow;
    });

    const decHigh = () => {
        if (high <= 0) return;

        scoutingData.update((data) => {
            if (mode == "auto")
                data.autoHigh--;
            else
                data.teleHigh--;

            return data;
        });
    }

    const decLow = () => {
        if (low <= 0) return;

        scoutingData.update((data) => {
            if (mode == "auto")
                data.autoLow--;
            else
                data.teleLow--;

            return data;
        });
    }

    const incHigh = () => {
        scoutingData.update((data) => {
            if (mode == "auto")
                data.autoHigh++;
            else
                data.teleHigh++;

            return data;
        });
    }

    const incLow = () => {
        scoutingData.update((data) => {
            if (mode == "auto")
                data.autoLow++;
            else
                data.teleLow++;

            return data;
        });
    }
</script>

<div class="flex flex-col">
    <div class="flex flex-row justify-between h-[37vh]">
        <button class ="w-1/6 h-1/6 ml-2 mt-2 text shadow-sm rounded bg-gray-700 text-4xl"
            on:click={decHigh}>-</button>
        <button class ="w-3/5 h-100 border border-dashed" on:click={incHigh}>high</button>
        <label for="high" class="w-[15%] h-1/6 mr-2 mt-2 text shadow-sm rounded bg-gray-700 text-center text-4xl">{high}</label>
    </div>

    <div class="flex flex-row justify-between h-[37vh]">
        <button class ="w-1/6 h-1/6 ml-2 mt-8 text shadow-sm rounded bg-gray-700 text-4xl"
            on:click={decLow}>-</button>
        <button class ="w-3/5 h-100 border border-dashed" on:click={incLow}>low</button>
        <label for="low" class="w-[15%] h-1/6 mr-2 mt-8 text shadow-sm rounded bg-gray-700 text-center text-4xl">{low}</label>
    </div>
</div>