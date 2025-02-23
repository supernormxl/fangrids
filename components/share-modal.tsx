import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Twitter, Facebook, PhoneIcon as WhatsApp, Copy, Check } from "lucide-react"

interface ShareModalProps {
  isOpen: boolean
  onClose: () => void
  score: number
  gameNumber: number
}

export function ShareModal({ isOpen, onClose, score, gameNumber }: ShareModalProps) {
  const [copied, setCopied] = useState(false)

  const shareText = `I scored ${score.toLocaleString()} points in CricketFanGrids #${gameNumber}! Can you beat my score?`

  const handleCopy = () => {
    navigator.clipboard.writeText(shareText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleShare = (platform: string) => {
    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
      whatsapp: `whatsapp://send?text=${encodeURIComponent(shareText)}`,
    }
    window.open(urls[platform as keyof typeof urls], "_blank")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Your Score</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <p className="text-center px-4 py-3 bg-gray-800 rounded-lg">{shareText}</p>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" onClick={() => handleShare("twitter")} className="w-full">
              <Twitter className="w-4 h-4 mr-2" />
              Twitter
            </Button>
            <Button variant="outline" onClick={() => handleShare("whatsapp")} className="w-full">
              <WhatsApp className="w-4 h-4 mr-2" />
              WhatsApp
            </Button>
            <Button variant="outline" onClick={() => handleShare("facebook")} className="w-full">
              <Facebook className="w-4 h-4 mr-2" />
              Facebook
            </Button>
            <Button variant="outline" onClick={handleCopy} className="w-full">
              {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
              {copied ? "Copied!" : "Copy"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

