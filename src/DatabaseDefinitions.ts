export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json }
    | Json[];

export interface Database {
    public: {
        Tables: {
            "ppg-data": {
                Row: {
                    matchesPlayed: number;
                    meanTeleop: number;
                    meanAuto: number;
                    meanEndgame: number;
                    pointTotal: number;
                    teamid: number;
                    totalAuto: number;
                    totalEndgame: number;
                    totalTeleop: number;
                };
                Insert: {
                    matchesPlayed?: number;
                    meanTeleop?: number;
                    meanAuto?: number;
                    meanEndgame?: number;
                    pointTotal?: number;
                    teamid: number;
                    totalAuto?: number;
                    totalEndgame?: number;
                    totalTeleop?: number;
                };
                Update: {
                    matchesPlayed?: number;
                    meanTeleop?: number;
                    meanAuto?: number;
                    meanEndgame?: number;
                    pointTotal?: number;
                    teamid?: number;
                    totalAuto?: number;
                    totalEndgame?: number;
                    totalTeleop?: number;
                };
            };
            "scouting-data": {
                Row: {
                    autoCharge: string | null;
                    autoHigh: number | null;
                    autoLow: number | null;
                    autoMid: number | null;
                    autoMobility: boolean | null;
                    endCharge: string | null;
                    id: number;
                    matchid: number;
                    notes: string | null;
                    playDirty: boolean | null;
                    teamcolor: number;
                    teamid: number;
                    teleHigh: number | null;
                    teleLow: number | null;
                    teleMid: number | null;
                    win: boolean | null;
                };
                Insert: {
                    autoCharge?: string | null;
                    autoHigh?: number | null;
                    autoLow?: number | null;
                    autoMid?: number | null;
                    autoMobility?: boolean | null;
                    endCharge?: string | null;
                    id?: number;
                    matchid: number;
                    notes?: string | null;
                    playDirty?: boolean | null;
                    teamcolor: number;
                    teamid: number;
                    teleHigh?: number | null;
                    teleLow?: number | null;
                    teleMid?: number | null;
                    win?: boolean | null;
                };
                Update: {
                    autoCharge?: string | null;
                    autoHigh?: number | null;
                    autoLow?: number | null;
                    autoMid?: number | null;
                    autoMobility?: boolean | null;
                    endCharge?: string | null;
                    id?: number;
                    matchid?: number;
                    notes?: string | null;
                    playDirty?: boolean | null;
                    teamcolor?: number;
                    teamid?: number;
                    teleHigh?: number | null;
                    teleLow?: number | null;
                    teleMid?: number | null;
                    win?: boolean | null;
                };
            };
        };
        Views: {
            [_ in never]: never;
        };
        Functions: {
            [_ in never]: never;
        };
        Enums: {
            [_ in never]: never;
        };
        CompositeTypes: {
            [_ in never]: never;
        };
    };
}
