import type React from "react"
import { useState, useEffect } from "react"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Share2, HelpCircle, Trophy } from "lucide-react"
import { LeaderboardDrawer } from "./leaderboard-drawer"
import { Team, Stat, type PlayerData, teams, stats, players } from "@/types/game"

const CricketGridGame: React.FC = () => {
  const [grid, setGrid] = useState<(PlayerData | null)[][]>(
    Array(stats.length)
      .fill(null)
      .map(() => Array(teams.length).fill(null)),
  )
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [score, setScore] = useState(0)
  const [guessesRemaining, setGuessesRemaining] = useState(9)
  const [gameOver, setGameOver] = useState(false)
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false)

  useEffect(() => {
    if (grid.every((row) => row.every((cell) => cell !== null)) || guessesRemaining === 0) {
      setGameOver(true)
    }
  }, [grid, guessesRemaining])

  const handleCellClick = (rowIndex: number, colIndex: number) => {
    if (!grid[rowIndex][colIndex] && !gameOver && guessesRemaining > 0) {
      setSelectedCell([rowIndex, colIndex])
    }
  }

  const handlePlayerSelect = (player: PlayerData) => {
    if (selectedCell && !grid[selectedCell[0]][selectedCell[1]] && guessesRemaining > 0) {
      const [rowIndex, colIndex] = selectedCell
      const newGrid = [...grid]
      newGrid[rowIndex][colIndex] = player
      setGrid(newGrid)
      setSelectedCell(null)
      setSearchTerm("")
      setGuessesRemaining(guessesRemaining - 1)

      // Scoring based on correct team-stat match
      const team = teams[colIndex]
      const stat = stats[rowIndex]
      if (player.teams.includes(team.id) && player.stats[stat.id] > 0) {
        const rarityScore = Math.floor(Math.random() * 100000) + 50000 // Random score between 50000 and 150000
        setScore((prevScore) => prevScore + rarityScore)
      }
    }
  }

  const filteredPlayers = players
    .filter((player) => player.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .slice(0, 10)

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">Cricket Fan Grids</h1>

        <div className="flex justify-between items-center mb-6">
          <div>
            <div className="text-xl font-bold">Score: {score.toLocaleString()}</div>
            <div className="text-sm">Guesses left: {guessesRemaining}</div>
          </div>
          <Button
            onClick={() => setIsLeaderboardOpen(true)}
            variant="outline"
            className="bg-gray-800 hover:bg-gray-700"
          >
            <Trophy className="h-4 w-4 mr-2" />
            Leaderboard
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="p-2 border border-gray-700"></th>
                {teams.map((team) => (
                  <th key={team.id} className="p-2 border border-gray-700">
                    <Image
                      src={team.logo || "/placeholder.svg"}
                      alt={team.name}
                      width={40}
                      height={40}
                      className="mx-auto"
                    />
                    <div className="text-xs mt-1">{team.shortName}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {stats.map((stat, rowIndex) => (
                <tr key={stat.id}>
                  <th className="p-2 border border-gray-700 text-left text-sm">{stat.name}</th>
                  {teams.map((_, colIndex) => (
                    <td key={`${rowIndex}-${colIndex}`} className="p-2 border border-gray-700">
                      <button
                        className={`w-full h-full min-h-[80px] ${
                          grid[rowIndex][colIndex] ? "bg-gray-800" : "bg-gray-900 hover:bg-gray-800"
                        }`}
                        onClick={() => handleCellClick(rowIndex, colIndex)}
                        disabled={!!grid[rowIndex][colIndex] || gameOver}
                      >
                        {grid[rowIndex][colIndex] && (
                          <div className="text-center">
                            <div className="w-8 h-8 mx-auto mb-1 rounded-full bg-gray-700 flex items-center justify-center">
                              {grid[rowIndex][colIndex]!.nationality[0]}
                            </div>
                            <span className="text-xs">{grid[rowIndex][colIndex]!.name}</span>
                          </div>
                        )}
                      </button>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selectedCell && !gameOver && (
          <div className="mt-4">
            <Input
              type="text"
              placeholder="Search for a player"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full mb-2 bg-gray-800 text-white"
            />
            <div className="max-h-40 overflow-y-auto">
              {filteredPlayers.map((player) => (
                <Button
                  key={player.id}
                  onClick={() => handlePlayerSelect(player)}
                  className="w-full mb-1 text-left justify-start bg-gray-800 hover:bg-gray-700"
                >
                  {player.name} ({player.nationality})
                </Button>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-center space-x-4 mt-6">
          <Button variant="outline" size="icon" className="bg-gray-800 hover:bg-gray-700">
            <Share2 className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="bg-gray-800 hover:bg-gray-700">
            <HelpCircle className="h-4 w-4" />
          </Button>
        </div>

        {gameOver && (
          <div className="text-center mt-6">
            <h2 className="text-2xl font-bold mb-2">Game Over!</h2>
            <p className="mb-4">Final Score: {score.toLocaleString()}</p>
            <Button onClick={() => window.location.reload()} className="bg-gray-800 hover:bg-gray-700">
              Play Again
            </Button>
          </div>
        )}
      </div>

      <LeaderboardDrawer isOpen={isLeaderboardOpen} onClose={() => setIsLeaderboardOpen(false)} />
    </div>
  )
}

export default CricketGridGame

