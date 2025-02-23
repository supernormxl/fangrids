"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Info, Share2, Trophy, RabbitIcon as Duck } from "lucide-react"
import { LeaderboardDrawer } from "./leaderboard-drawer"
import { ShareModal } from "./share-modal"
import { topPlayers } from "@/data/players"
import type { TeamData, Category } from "@/types/game"
import "@/styles/animations.css"

interface GameGridProps {
  teams: TeamData[]
  categories: Category[]
  onComplete: (grid: any[][]) => void
}

export function GameGrid({ teams, categories, onComplete }: GameGridProps) {
  const [grid, setGrid] = useState<any[][]>(
    Array(3)
      .fill(null)
      .map(() => Array(3).fill(null)),
  )
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [guessesRemaining, setGuessesRemaining] = useState(9)
  const [score, setScore] = useState(0)
  const [showSearch, setShowSearch] = useState(false)
  const [showInstructions, setShowInstructions] = useState(false)
  const [showLeaderboard, setShowLeaderboard] = useState(false)
  const [showShare, setShowShare] = useState(false)
  const [cellStates, setCellStates] = useState<("correct" | "incorrect" | null)[][]>(
    Array(3)
      .fill(null)
      .map(() => Array(3).fill(null)),
  )
  const [scoreChange, setScoreChange] = useState<"increase" | "decrease" | null>(null)
  const scoreRef = useRef<HTMLDivElement>(null)

  const rowHeaders = [
    "Mumbai Indians",
    "Chennai Super Kings",
    "Opening Bowler: Player who regularly opened the bowling",
  ]

  const columnHeaders = [
    "Royal Challengers Bangalore",
    "Delhi Capitals",
    "Won a Final: Player who has won a final with this team",
  ]

  useEffect(() => {
    if (scoreChange) {
      scoreRef.current?.classList.add("explode", `score-${scoreChange}`)
      const timer = setTimeout(() => {
        scoreRef.current?.classList.remove("explode", `score-${scoreChange}`)
        setScoreChange(null)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [scoreChange])

  const handleCellClick = (rowIndex: number, colIndex: number) => {
    if (!grid[rowIndex][colIndex] && guessesRemaining > 0) {
      setSelectedCell([rowIndex, colIndex])
      setShowSearch(true)
      setSearchTerm("")
    }
  }

  const handlePlayerSelect = (player: any) => {
    if (selectedCell && guessesRemaining > 0) {
      const [rowIndex, colIndex] = selectedCell
      const newGrid = [...grid]
      newGrid[rowIndex][colIndex] = player
      setGrid(newGrid)

      // For MVP, alternate between correct and incorrect
      const isCorrect = guessesRemaining % 2 === 0
      const newCellStates = [...cellStates]
      newCellStates[rowIndex][colIndex] = isCorrect ? "correct" : "incorrect"
      setCellStates(newCellStates)

      setGuessesRemaining(guessesRemaining - 1)
      const scoreIncrement = isCorrect ? 100000 : -50000
      setScore((prevScore) => prevScore + scoreIncrement)
      setScoreChange(isCorrect ? "increase" : "decrease")
      setShowSearch(false)
      setSelectedCell(null)

      if (guessesRemaining === 1) {
        setTimeout(() => setShowShare(true), 1500)
      }
    }
  }

  const filteredPlayers = topPlayers
    .filter((player) => player.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .slice(0, 10)

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <div ref={scoreRef} className="text-2xl font-bold tabular-nums">
            {score.toLocaleString()}
          </div>
          <div className="text-sm text-gray-400">SCORE</div>
        </div>
        <div>
          <div className="text-2xl font-bold tabular-nums">{guessesRemaining}</div>
          <div className="text-sm text-gray-400">GUESSES LEFT</div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowInstructions(true)}
            className="bg-white text-gray-800 hover:bg-gray-100"
          >
            <Info className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowShare(true)}
            className="bg-white text-gray-800 hover:bg-gray-100"
          >
            <Share2 className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowLeaderboard(true)}
            className="bg-white text-gray-800 hover:bg-gray-100"
          >
            <Trophy className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Game Layout */}
      <div className="w-full overflow-x-auto">
        <div className="min-w-[600px]">
          {/* Column Headers */}
          <div className="grid grid-cols-[150px_1fr_1fr_1fr] gap-2 mb-2">
            <div></div>
            {columnHeaders.map((header, index) => (
              <div key={index} className="text-center text-sm font-bold p-2 bg-gray-800 rounded-lg">
                {header}
              </div>
            ))}
          </div>

          {/* Grid with Row Headers */}
          {rowHeaders.map((rowHeader, rowIndex) => (
            <div key={rowIndex} className="grid grid-cols-[150px_1fr_1fr_1fr] gap-2 mb-2">
              <div className="text-sm font-bold p-2 bg-gray-800 rounded-lg flex items-center justify-end">
                {rowHeader}
              </div>
              {grid[rowIndex].map((cell, colIndex) => (
                <button
                  key={`${rowIndex}-${colIndex}`}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                  className={`
                    aspect-square rounded-lg shadow-md transition-all flex items-center justify-center
                    ${cell ? "bg-gray-800" : "bg-gray-900 hover:bg-gray-800"}
                    ${cellStates[rowIndex][colIndex] === "correct" ? "shimmer" : ""}
                  `}
                  disabled={!!cell || guessesRemaining === 0}
                >
                  {cell ? (
                    cellStates[rowIndex][colIndex] === "incorrect" ? (
                      <Duck className="w-8 h-8 text-red-500" />
                    ) : (
                      <span className="text-xs text-center break-words">{cell.name}</span>
                    )
                  ) : null}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Search Dialog */}
      <Dialog open={showSearch} onOpenChange={setShowSearch}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Select Player</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              type="text"
              placeholder="Search players..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-gray-800"
              autoFocus
            />
            <div className="max-h-64 overflow-y-auto space-y-2">
              {filteredPlayers.map((player) => (
                <Button
                  key={player.id}
                  variant="ghost"
                  className="w-full justify-start text-left"
                  onClick={() => handlePlayerSelect(player)}
                >
                  {player.name}
                </Button>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Instructions Dialog */}
      <Dialog open={showInstructions} onOpenChange={setShowInstructions}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>How to Play</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>Fill in the grid with players who match both the team (row/column) and the category (row/column).</p>
            <p>You have 9 guesses to complete as much of the grid as possible.</p>
            <p>Your score increases for correct answers and decreases for incorrect ones.</p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Share Modal */}
      <ShareModal
        isOpen={showShare}
        onClose={() => setShowShare(false)}
        score={score}
        gameNumber={463} // This would come from your game state
      />

      {/* Leaderboard Drawer */}
      <LeaderboardDrawer isOpen={showLeaderboard} onClose={() => setShowLeaderboard(false)} />
    </div>
  )
}

