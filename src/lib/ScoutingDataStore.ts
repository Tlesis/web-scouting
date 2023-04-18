import { writable } from "svelte/store";

interface ScoutingData {
    auto: Scoring[],
    autoCharge: ChargeStationLevel,
    autoMobility: boolean
    teleop: Scoring[],
    endgame: ChargeStationLevel,
    playDirty: boolean,
    win: boolean,
    notes: string
}

interface Scoring {
    place: string,
    activated: boolean[]
}

export enum ChargeStationLevel {
    NotAttempted = "Not Attempted",
    failed = "Failed",
    docked = "Docked",
    balanced = "Engaged"
}

const defaultScoutingData = {auto: [{place: "auto-top", activated: [false, false, false, false, false, false, false, false, false]},
                                    {place: "auto-mid", activated: [false, false, false, false, false, false, false, false, false]},
                                    {place: "auto-bot", activated: [false, false, false, false, false, false, false, false, false]}],
                            autoCharge: ChargeStationLevel.NotAttempted,
                            autoMobility: false,
                            teleop: [{place: "tele-top", activated: [false, false, false, false, false, false, false, false, false]},
                                     {place: "tele-mid", activated: [false, false, false, false, false, false, false, false, false]},
                                     {place: "tele-bot", activated: [false, false, false, false, false, false, false, false, false]}],
                            endgame: ChargeStationLevel.NotAttempted,
                            playDirty: false,
                            win: false,
                            notes: ""};

export const scoutingData = writable<ScoutingData>(defaultScoutingData);