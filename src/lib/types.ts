import { PUBLIC_FRC_API_KEY, PUBLIC_FRC_USERNAME } from "$env/static/public";

export const EVENT_KEY = "2023cttd";

export const fetchOptions = {
    headers: {
        "Authorization": `Basic ${btoa(`${PUBLIC_FRC_USERNAME}:${PUBLIC_FRC_API_KEY}`)}`
    }
};

export interface TeamSimple {
    city: string;
    country: string;
    key: string;
    name: string;
    nickname: string;
    state_prov: string;
    team_number: number;
}

export interface TBAEvent {
    key:                 string;
    name:                string;
    event_code:          string;
    event_type:          number;
    district:            District;
    city:                string;
    state_prov:          string;
    country:             string;
    start_date:          Date;
    end_date:            Date;
    year:                number;
    short_name:          string;
    event_type_string:   string;
    week:                number;
    address:             string;
    postal_code:         string;
    gmaps_place_id:      string;
    gmaps_url:           string;
    lat:                 number;
    lng:                 number;
    location_name:       string;
    timezone:            string;
    website:             string;
    first_event_id:      string;
    first_event_code:    string;
    webcasts:            Webcast[];
    division_keys:       string[];
    parent_event_key:    string;
    playoff_type:        number;
    playoff_type_string: string;
}

export interface District {
    abbreviation: string;
    display_name: string;
    key:          string;
    year:         number;
}

export interface Webcast {
    type:    string;
    channel: string;
    date:    string;
    file:    string;
}

export interface Statbotics {
    key:                  string;
    year:                 number;
    event:                string;
    comp_level:           string;
    set_number:           number;
    match_number:         number;
    offseason:            boolean;
    status:               string;
    video:                null | string;
    red_1:                number;
    red_2:                number;
    red_3:                number;
    red_dq:               string;
    red_surrogate:        string;
    red_epa_sum:          number;
    red_auto_epa_sum:     number;
    red_teleop_epa_sum:   number;
    red_endgame_epa_sum:  number;
    red_rp_1_epa_sum:     number;
    red_rp_2_epa_sum:     number;
    blue_1:               number;
    blue_2:               number;
    blue_3:               number;
    blue_dq:              string;
    blue_surrogate:       string;
    blue_epa_sum:         number;
    blue_auto_epa_sum:    number;
    blue_teleop_epa_sum:  number;
    blue_endgame_epa_sum: number;
    blue_rp_1_epa_sum:    number;
    blue_rp_2_epa_sum:    number;
    winner:               null | string;
    epa_winner:           string;
    epa_win_prob:         number;
    red_rp_1_prob:        number;
    red_rp_2_prob:        number;
    blue_rp_1_prob:       number;
    blue_rp_2_prob:       number;
    playoff:              boolean;
    time:                 null | number;
    predicted_time:       null | number;
    red_score:            null | number;
    blue_score:           null | number;
    red_auto:             null | number;
    red_auto_movement:    null | number;
    red_teleop:           null | number;
    red_endgame:          null | number;
    red_no_fouls:         null | number;
    red_fouls:            null | number;
    red_rp_1:             null | number;
    red_rp_2:             null | number;
    red_tiebreaker:       null | number;
    blue_auto:            null | number;
    blue_auto_movement:   null | number;
    blue_teleop:          null | number;
    blue_endgame:         null | number;
    blue_no_fouls:        null | number;
    blue_fouls:           null | number;
    blue_rp_1:            null | number;
    blue_rp_2:            null | number;
    blue_tiebreaker:      null | number;
}

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

export interface FRCTeams {
    teams:          Team[];
    teamCountTotal: number;
    teamCountPage:  number;
    pageCurrent:    number;
    pageTotal:      number;
}

export interface Team {
    schoolName:   string;
    website:      string;
    homeCMP:      string;
    teamNumber:   number;
    nameFull:     string;
    nameShort:    string;
    city:         string;
    stateProv:    string;
    country:      string;
    rookieYear:   number;
    robotName:    string;
    districtCode: null;
}

export enum AllianceColor {
    red = 1,
    blue
}

export enum ScoutingPage {
    auto = 1,
    teleop,
    endgame,
    loading
}

export interface StatMatch {
    key:                  string;
    year:                 number;
    event:                string;
    comp_level:           CompLevel;
    set_number:           number;
    match_number:         number;
    offseason:            boolean;
    status:               string;
    video:                null | string;
    red_1:                number;
    red_2:                number;
    red_3:                number;
    red_dq:               string;
    red_surrogate:        string;
    red_epa_sum:          number;
    red_auto_epa_sum:     number;
    red_teleop_epa_sum:   number;
    red_endgame_epa_sum:  number;
    red_rp_1_epa_sum:     number;
    red_rp_2_epa_sum:     number;
    blue_1:               number;
    blue_2:               number;
    blue_3:               number;
    blue_dq:              string;
    blue_surrogate:       string;
    blue_epa_sum:         number;
    blue_auto_epa_sum:    number;
    blue_teleop_epa_sum:  number;
    blue_endgame_epa_sum: number;
    blue_rp_1_epa_sum:    number;
    blue_rp_2_epa_sum:    number;
    winner:               Winner;
    epa_winner:           Winner;
    epa_win_prob:         number;
    red_rp_1_prob:        number;
    red_rp_2_prob:        number;
    blue_rp_1_prob:       number;
    blue_rp_2_prob:       number;
    playoff:              boolean;
    time:                 number;
    predicted_time:       number;
    red_score:            number;
    blue_score:           number;
    red_auto:             number;
    red_auto_movement:    number;
    red_teleop:           number;
    red_endgame:          number;
    red_no_fouls:         number;
    red_fouls:            number;
    red_rp_1:             number;
    red_rp_2:             number;
    red_tiebreaker:       number;
    blue_auto:            number;
    blue_auto_movement:   number;
    blue_teleop:          number;
    blue_endgame:         number;
    blue_no_fouls:        number;
    blue_fouls:           number;
    blue_rp_1:            number;
    blue_rp_2:            number;
    blue_tiebreaker:      number;
}

export enum CompLevel {
    F = "f",
    Qm = "qm",
    Sf = "sf",
}

export enum Winner {
    Blue = "blue",
    Draw = "draw",
    Red = "red",
}

export interface FRCEvents {
    Events:     Event[];
    eventCount: number;
}

export interface Event {
    address:      string;
    website:      string;
    webcasts:     string[];
    timezone:     string;
    code:         string;
    divisionCode: string | null;
    name:         string;
    type:         string;
    districtCode: string;
    venue:        string;
    city:         string;
    stateprov:    string;
    country:      string;
    dateStart:    Date | null;
    dateEnd:      Date | null;
}