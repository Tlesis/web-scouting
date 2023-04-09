import { writable } from "svelte/store";
import { supabase } from "../supabase";

// data that will be collected
export interface ScoutingData {
    id: number;
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
    id: 0,
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

export const exportData = async () => {
    const { error } = await supabase.from('scouting-data').update(scoutingData);

    if (error)
     return console.error(error);
}

export const makeRow = async () => {

    scoutingData.update( (data) => {
        data.id = Date.now();
        return data;
    });

    const { data, error } = await supabase.from('scouting-data').insert(scoutingData);

    if (error)
        return console.error(error);
}

export const resetData = () => {
    scoutingData.update(() => defaultScoutingData);
}

/********** Page Store **********/
export const pageLocation = writable<string>("auto");