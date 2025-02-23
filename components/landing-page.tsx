"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Globe, Grid, Zap } from "lucide-react"
import { AnimatedGridLogo } from "@/components/animated-grid-logo"

export function LandingPage() {
  const [language, setLanguage] = useState<"en" | "hi">("en")

  const content = {
    en: {
      title: "Ultimate Cricket Trivia",
      subtitle: "Test your cricket knowledge daily",
      description: "New challenge every day at midnight IST",
      playIpl: "Play IPL Edition",
      playBbl: "Play BBL Edition",
      switchToHindi: "हिंदी में खेलें",
      switchToEnglish: "Play in English",
      createAccount: "Create Account to Join Leaderboard",
    },
    hi: {
      title: "अल्टीमेट क्रिकेट ट्रिविया",
      subtitle: "रोज़ अपने क्रिकेट ज्ञान की परीक्षा लें",
      description: "हर रात 12 बजे IST पर नई चुनौती",
      playIpl: "IPL संस्करण खेलें",
      playBbl: "BBL संस्करण खेलें",
      switchToHindi: "हिंदी में खेलें",
      switchToEnglish: "Play in English",
      createAccount: "लीडरबोर्ड में शामिल होने के लिए खाता बनाएं",
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1c2b] to-[#2a1c2b] text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Language Toggle */}
        <div className="absolute top-4 right-4">
          <Button
            variant="ghost"
            size="sm"
            className="text-white/80 hover:text-white"
            onClick={() => setLanguage(language === "en" ? "hi" : "en")}
          >
            <Globe className="w-4 h-4 mr-2" />
            {content[language][language === "en" ? "switchToHindi" : "switchToEnglish"]}
          </Button>
        </div>

        <div className="max-w-2xl mx-auto pt-20 text-center space-y-8">
          {/* Animated Logo */}
          <div className="relative w-24 h-24 mx-auto">
            <div className="absolute inset-0 bg-white/10 rounded-2xl rotate-12" />
            <div className="absolute inset-0 bg-white/10 rounded-2xl -rotate-12" />
            <div className="absolute inset-0 flex items-center justify-center">
              <AnimatedGridLogo />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-6xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
            {content[language].title}
          </h1>

          {/* Subtitle */}
          <div className="space-y-2">
            <p className="text-xl sm:text-2xl font-medium">{content[language].subtitle}</p>
            <p className="text-white/60">{content[language].description}</p>
          </div>

          {/* Game Selection */}
          <div className="grid sm:grid-cols-2 gap-4 max-w-lg mx-auto pt-8">
            <Link href={language === "en" ? "/play/ipl" : "/play/ipl/hi"} className="group">
              <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-orange-500 to-pink-600 p-1">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative bg-[#1a1c2b] rounded-lg p-4 transition-transform group-hover:translate-y-1">
                  <div className="flex items-center justify-center h-32 mb-4">
                    <Zap className="w-24 h-24 text-orange-500" />
                  </div>
                  <Button className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-400 hover:to-pink-400 border-0">
                    {content[language].playIpl}
                  </Button>
                </div>
              </div>
            </Link>

            <Link href={language === "en" ? "/play/bbl" : "/play/bbl/hi"} className="group">
              <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-purple-500 to-blue-600 p-1">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative bg-[#1a1c2b] rounded-lg p-4 transition-transform group-hover:translate-y-1">
                  <div className="flex items-center justify-center h-32 mb-4">
                    <Grid className="w-24 h-24 text-purple-500" />
                  </div>
                  <Button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-400 hover:to-blue-400 border-0">
                    {content[language].playBbl}
                  </Button>
                </div>
              </div>
            </Link>
          </div>

          {/* Create Account Button */}
          <div className="pt-12">
            <Button
              variant="ghost"
              className="text-white/80 hover:text-white border border-white/20 hover:border-white/40 transition-colors duration-300 group"
            >
              <span className="mr-2 group-hover:mr-3 transition-all duration-300">🏆</span>
              {content[language].createAccount}
              <span className="ml-2 opacity-0 group-hover:opacity-100 transition-all duration-300">→</span>
            </Button>
          </div>

          {/* Footer */}
          <footer className="pt-16 pb-8 text-sm text-white/40">
            <p>Made with ❤️ for cricket fans worldwide</p>
          </footer>
        </div>
      </div>
    </div>
  )
}

