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
    blue: Alliance;
    red:  Alliance;
}

export interface Alliance {
    dq_team_keys:        unknown[];
    score:               number;
    surrogate_team_keys: string[];
    team_keys:           string[];
}

export interface ScoreBreakdown {
    blue: ScoreBreakdown;
    red:  ScoreBreakdown;
}

export interface ScoreBreakdown {
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

export interface TeamStatus {
    alliance:          Alliance | null;
    allianceStatusStr: string | null;
    lastMatchKey:      string | null;
    nextMatchKey:      string| null;
    overallStatusStr:  string | null;
    playoff:           Playoff | null;
    playoffStatusStr:  string | null;
    qual:              Qual;
}

export interface Alliance {
    backup: null;
    name:   string;
    number: number;
    pick:   number;
}

export interface Playoff {
    currentLevelRecord: Record;
    level:              Level;
    playoffAverage:     null;
    record:             Record;
    status:             PlayoffStatus;
}

export interface Record {
    losses: number;
    ties:   number;
    wins:   number;
}

export enum Level {
    F = "f",
    Sf = "sf",
}

export enum PlayoffStatus {
    Eliminated = "eliminated",
    Playing = "playing",
    Won = "won",
}

export interface Qual {
    numTeams:      number;
    ranking:       Ranking;
    sortOrderInfo: SortOrderInfo[];
    status:        QualStatus;
}

export interface Ranking {
    dq:            number;
    matchesPlayed: number;
    qualAverage:   null;
    rank:          number;
    record:        Record;
    sortOrders:    number[];
    teamKey:       string;
}

export interface SortOrderInfo {
    name:      Name;
    precision: number;
}

export enum Name {
    AvgAuto = "Avg Auto",
    AvgChargeStation = "Avg Charge Station",
    AvgMatch = "Avg Match",
    RankingScore = "Ranking Score",
}

export enum QualStatus {
    Completed = "completed",
}

export enum AllianceColor {
    red = 1,
    blue
}

export enum ScoutingPages {
    auto = 1,
    teleop,
    endgame
}
