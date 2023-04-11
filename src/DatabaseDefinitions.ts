export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      "scouting-data": {
        Row: {
          autoHeld: boolean
          autoHigh: number
          autoLow: number
          autoTaxi: boolean
          color: string
          colorSensor: boolean
          endClimbPos: string
          id: number
          matchid: number
          notes: string
          teamid: number
          teleHigh: number
          teleLow: number
          won: boolean
        }
        Insert: {
          autoHeld?: boolean
          autoHigh?: number
          autoLow?: number
          autoTaxi?: boolean
          color?: string
          colorSensor?: boolean
          endClimbPos?: string
          id?: number
          matchid: number
          notes?: string
          teamid: number
          teleHigh?: number
          teleLow?: number
          won?: boolean
        }
        Update: {
          autoHeld?: boolean
          autoHigh?: number
          autoLow?: number
          autoTaxi?: boolean
          color?: string
          colorSensor?: boolean
          endClimbPos?: string
          id?: number
          matchid?: number
          notes?: string
          teamid?: number
          teleHigh?: number
          teleLow?: number
          won?: boolean
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
