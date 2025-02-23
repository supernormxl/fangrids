import { GameGrid } from "@/components/game-grid"
import { teams, categories } from "@/types/game"

export default function PlayPage({
  params,
}: {
  params: { league: string }
}) {
  const leagueTeams = teams.filter((team) => team.league.toLowerCase() === params.league.toLowerCase())

  return (
    <div className="min-h-screen bg-black text-white py-8">
      <GameGrid
        teams={leagueTeams.slice(0, 3)} // Show 3 teams per day
        categories={categories}
        onComplete={(grid) => {
          // Handle game completion
          console.log(grid)
        }}
      />
    </div>
  )
}

