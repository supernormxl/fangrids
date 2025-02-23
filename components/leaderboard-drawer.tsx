import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, Trophy, Clock, PhoneIcon as WhatsApp, Mail } from "lucide-react"

interface LeaderboardEntry {
  rank: number
  name: string
  score: number
}

const mockLeaderboard: LeaderboardEntry[] = Array.from({ length: 100 }, (_, i) => ({
  rank: i + 1,
  name: `Player${i + 1}`,
  score: Math.floor(Math.random() * 1000000),
})).sort((a, b) => b.score - a.score)

interface LeaderboardDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export function LeaderboardDrawer({ isOpen, onClose }: LeaderboardDrawerProps) {
  const [timeLeft, setTimeLeft] = useState(0)
  const [email, setEmail] = useState("")
  const [whatsapp, setWhatsapp] = useState("")
  const [notificationMethod, setNotificationMethod] = useState<"email" | "whatsapp">("email")

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)
      const diff = midnight.getTime() - now.getTime()
      setTimeLeft(diff)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleNotifyMe = async () => {
    // Here you would integrate with your notification service
    console.log(`Notification set for: ${notificationMethod === "email" ? email : whatsapp}`)
    // You could also show a success message to the user
  }

  const formatTime = (ms: number) => {
    const hours = Math.floor(ms / (1000 * 60 * 60))
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((ms % (1000 * 60)) / 1000)
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }

  const progressPercentage = (timeLeft / (24 * 60 * 60 * 1000)) * 100

  return (
    <div
      className={`fixed inset-y-0 right-0 w-full sm:w-96 bg-gray-900 shadow-xl transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } flex flex-col`}
    >
      <div className="flex justify-between items-center p-4 border-b border-gray-800">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Trophy className="w-5 h-5" /> Leaderboard
        </h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="w-5 h-5" />
        </Button>
      </div>

      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center gap-2 mb-2">
          <Clock className="w-4 h-4" />
          <h3 className="font-semibold">Next Game In</h3>
        </div>
        <div className="text-2xl font-mono mb-2">{formatTime(timeLeft)}</div>
        <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-blue-500 transition-all duration-1000 ease-in-out"
            style={{
              width: `${progressPercentage}%`,
              animation: "wobble 2s ease-in-out infinite",
            }}
          ></div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {mockLeaderboard.map((entry) => (
          <div key={entry.rank} className="flex items-center justify-between p-3 border-b border-gray-800">
            <div className="flex items-center gap-3">
              <span className="text-lg font-mono w-8">{entry.rank}</span>
              <div className="font-medium">{entry.name}</div>
            </div>
            <div className="font-mono">{entry.score.toLocaleString()}</div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-gray-800">
        <h3 className="font-semibold mb-2">Get Daily Reminders</h3>
        <div className="flex gap-2 mb-2">
          <Button
            variant={notificationMethod === "email" ? "default" : "outline"}
            onClick={() => setNotificationMethod("email")}
            className="flex-1"
          >
            <Mail className="w-4 h-4 mr-2" /> Email
          </Button>
          <Button
            variant={notificationMethod === "whatsapp" ? "default" : "outline"}
            onClick={() => setNotificationMethod("whatsapp")}
            className="flex-1"
          >
            <WhatsApp className="w-4 h-4 mr-2" /> WhatsApp
          </Button>
        </div>
        {notificationMethod === "email" ? (
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-2"
          />
        ) : (
          <Input
            type="tel"
            placeholder="Enter your WhatsApp number"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            className="mb-2"
          />
        )}
        <Button onClick={handleNotifyMe} className="w-full">
          Get Notified
        </Button>
      </div>
    </div>
  )
}

