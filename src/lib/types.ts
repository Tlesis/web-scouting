export interface TBAMatch {
    actual_time:      number | null;
    alliances:        Alliances;
    comp_level:       string;
    event_key:        string;
    key:              string | null;
    match_number:     number;
    post_result_time: number | null;
    predicted_time:   number | null;
    score_breakdown:  ScoreBreakdown | null;
    set_number:       number;
    time:             number | null;
    videos:           Video[] | null;
    winning_alliance: string | null;
}

export interface Alliances {
    blue: AlliancesBlue;
    red:  AlliancesBlue;
}

export interface AlliancesBlue {
    dq_team_keys:        any[];
    score:               number;
    surrogate_team_keys: string[];
    team_keys:           string[];
}

export interface ScoreBreakdown {
    blue: ScoreBreakdownBlue;
    red:  ScoreBreakdownBlue;
}

export interface ScoreBreakdownBlue {
    activationBonusAchieved:     boolean;
    adjustPoints:                number;
    autoBridgeState:             string;
    autoChargeStationPoints:     number;
    autoChargeStationRobot1:     string;
    autoChargeStationRobot2:     string;
    autoChargeStationRobot3:     string;
    autoCommunity:               Community;
    autoDocked:                  boolean;
    autoGamePieceCount:          number;
    autoGamePiecePoints:         number;
    autoMobilityPoints:          number;
    autoPoints:                  number;
    coopGamePieceCount:          number;
    coopertitionCriteriaMet:     boolean;
    endGameBridgeState:          string;
    endGameChargeStationPoints:  number;
    endGameChargeStationRobot1:  string;
    endGameChargeStationRobot2:  string;
    endGameChargeStationRobot3:  string;
    endGameParkPoints:           number;
    foulCount:                   number;
    foulPoints:                  number;
    linkPoints:                  number;
    links:                       Link[];
    mobilityRobot1:              string;
    mobilityRobot2:              string;
    mobilityRobot3:              string;
    rp:                          number;
    sustainabilityBonusAchieved: boolean;
    techFoulCount:               number;
    teleopCommunity:             Community;
    teleopGamePieceCount:        number;
    teleopGamePiecePoints:       number;
    teleopPoints:                number;
    totalChargeStationPoints:    number;
    totalPoints:                 number;
}

export interface Community {
    B: string[];
    M: string[];
    T: string[];
}


export interface Link {
    nodes: number[];
    row:   string;
}

export interface Video {
    key:  string;
    type: string;
}