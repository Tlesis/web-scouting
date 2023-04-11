import { writable } from "svelte/store";
import { supabase } from "../supabase";

// data that will be collected
export interface ScoutingData {
    matchid: number;
    teamid: number;
    color: string;

    autoHigh: number;
    autoLow: number;
    autoTaxi: boolean;
    autoHeld: boolean;

    teleHigh: number;
    teleLow: number;

    endClimbPos: string;

    colorSensor: boolean;
    won: boolean;
    notes: string;
}

// defaulted scouting data
const defaultScoutingData: ScoutingData = {
    matchid: 0,
    teamid: 0,
    color: "",
    autoHigh: 0,
    autoLow: 0,
    autoTaxi: false,
    autoHeld: false,
    teleHigh: 0,
    teleLow: 0,
    endClimbPos: "Did not Climb",
    colorSensor: false,
    won: false,
    notes: ""
};

export const scoutingData = writable<ScoutingData>(defaultScoutingData);

var currId: number = 19;
var readOnlyData: ScoutingData;
scoutingData.subscribe((data) => readOnlyData = data);

export const exportData = async () => {
    console.log(readOnlyData);
    const { error } = await supabase.from('scouting-data').update(readOnlyData).match({id: currId});

    if (error) {
        alert(error);
        return console.error(error);
    }

    location.href='/';

}

export const makeRow = async (matchid: number, teamid: number) => {
    scoutingData.update((data) => {
        data.matchid = matchid;
        data.teamid = teamid;
        return data;
    });

    const { data, error } = await supabase.from('scouting-data').insert(readOnlyData).select();

    if (error)
        return console.error(error);

    currId = data[0].id;
}

export const setClimb = (distance: string) => {
    scoutingData.update((data) => {
        if (data.endClimbPos === distance) {
            data.endClimbPos = "no climb";
        } else {
            data.endClimbPos = distance;
        }

        return data;
    }
    );
}

/********** Page Store **********/
export const pageLocation = writable<string>("match");