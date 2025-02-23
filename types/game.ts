export type League = "IPL" | "BBL"

export interface TeamData {
  id: string
  name: string
  league: League
  shortName: string
}

export interface Category {
  id: string
  name: string
  description: string
}

export interface PlayerData {
  id: string
  name: string
  nationality: string
  imageUrl?: string
  teams: string[] // Team IDs
  achievements: string[] // Category IDs they qualify for
}

export const teams: TeamData[] = [
  { id: "MI", name: "Mumbai Indians", league: "IPL", shortName: "MI" },
  { id: "CSK", name: "Chennai Super Kings", league: "IPL", shortName: "CSK" },
  { id: "RCB", name: "Royal Challengers Bangalore", league: "IPL", shortName: "RCB" },
  { id: "KKR", name: "Kolkata Knight Riders", league: "IPL", shortName: "KKR" },
  { id: "SRH", name: "Sunrisers Hyderabad", league: "IPL", shortName: "SRH" },
  { id: "DC", name: "Delhi Capitals", league: "IPL", shortName: "DC" },
  { id: "RR", name: "Rajasthan Royals", league: "IPL", shortName: "RR" },
  { id: "PBKS", name: "Punjab Kings", league: "IPL", shortName: "PBKS" },
  { id: "GT", name: "Gujarat Titans", league: "IPL", shortName: "GT" },
  { id: "LSG", name: "Lucknow Super Giants", league: "IPL", shortName: "LSG" },
  { id: "SCO", name: "Perth Scorchers", league: "BBL", shortName: "SCO" },
  { id: "SIX", name: "Sydney Sixers", league: "BBL", shortName: "SIX" },
  { id: "STR", name: "Adelaide Strikers", league: "BBL", shortName: "STR" },
  { id: "HEA", name: "Brisbane Heat", league: "BBL", shortName: "HEA" },
  { id: "STA", name: "Melbourne Stars", league: "BBL", shortName: "STA" },
  { id: "REN", name: "Melbourne Renegades", league: "BBL", shortName: "REN" },
  { id: "THU", name: "Sydney Thunder", league: "BBL", shortName: "THU" },
  { id: "HUR", name: "Hobart Hurricanes", league: "BBL", shortName: "HUR" },
]

export const categories: Category[] = [
  { id: "opening-bowler", name: "Opening Bowler", description: "Player who regularly opened the bowling" },
  { id: "final-winner", name: "Won a Final", description: "Player who has won a final with this team" },
  { id: "multiple-teams", name: "Played for 3+ Teams", description: "Player who has represented 3 or more teams" },
  { id: "century", name: "Scored a Century", description: "Player who has scored at least one century" },
  { id: "captain", name: "Team Captain", description: "Player who has captained this team" },
  { id: "most-sixes", name: "Most Sixes in Season", description: "Player who hit the most sixes in a single season" },
]

