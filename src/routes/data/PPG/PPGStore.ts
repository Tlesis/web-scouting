import { writable } from "svelte/store";

export interface PPG {
    teamid: number;
    teamName: string | undefined;
    overallMeanPPG: number;
    // ppgTotal: PPGData;
    ppgMean: PPGData;
    record: string;
}

interface PPGData {
    auto: number;
    teleop: number;
    endgame: number;
}

export const ppgStore = writable<PPG[]>([]);