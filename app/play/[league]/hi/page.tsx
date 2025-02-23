import { CricketGridGame } from "@/components/cricket-grid-game"

export default function PlayPageHindi({
  params,
}: {
  params: { league: string }
}) {
  return <CricketGridGame language="hi" />
}

