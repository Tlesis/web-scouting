<script lang="ts">
    import { scoutingData } from "../../../stores/DataStore";

    export var description: string,
               id: number;

    var listener: boolean;
    scoutingData.subscribe((data) => {
        switch (id) {
            case 1:
                listener = data.colorSensor;
                break;
            case 2:
                listener = data.won;
                break;
            default:
                listener = false;
                console.error("<QualitativeList id={" + id + "}/> recived invalid id\n\tlistener defaulted to false");
                break;
        }
    });

    const trigger = () => {
        scoutingData.update((data) => {
            switch (id) {
                case 1:
                    data.colorSensor = !data.colorSensor;
                    break;
                case 2:
                    data.won = !data.won;
                    break;
                default:
                    console.error("<QualitativeList id={" + id + "}/> recived invalid id\n\tno was data set");
                    break;
            }

            return data;
        });
    }
</script>

<div class="flex flex-row justify-evenly my-2">
    <button type="button" class={`w-0 text-w text-center shadow-sm rounded ${(listener) ?'bg-active' : 'bg-inactive'} p-4 my-2`}
        on:click={trigger}></button>
    <label for={id.toString()} class="text-w text-base w-16 p-0">{description}</label>
</div>