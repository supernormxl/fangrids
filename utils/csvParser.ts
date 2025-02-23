import Papa from "papaparse"

export interface PlayerData {
  fullName: string
  nationality: string
  imageUrl: string
  iplDebut: string
  dateOfBirth: string
  specialisation: string
  matches: number
}

export async function parsePlayerData(url: string): Promise<PlayerData[]> {
  const response = await fetch(url)
  const csvData = await response.text()

  return new Promise((resolve, reject) => {
    Papa.parse(csvData, {
      header: true,
      complete: (results) => {
        const players = results.data.map((row: any) => ({
          fullName: row["Full Name"],
          nationality: row["Nationality"],
          imageUrl: row["Image excluding default"] || row["Image Link"],
          iplDebut: row["IPL Debut"],
          dateOfBirth: row["Date of Birth"],
          specialisation: row["Specialisation"],
          matches: Number.parseInt(row["Number of Matches"], 10) || 0,
        }))
        resolve(players as PlayerData[])
      },
      error: (error) => {
        reject(error)
      },
    })
  })
}

