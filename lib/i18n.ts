const translations = {
  en: {
    title: "Ultimate Cricket Trivia",
    subtitle: "Test your cricket knowledge with daily challenges and compete with fans worldwide",
    playNow: "Play Now",
    gameOver: "Game Over",
    score: "SCORE",
    guessesRemaining: "GUESSES REMAINING",
    share: "Share",
    copyLink: "Copy Link",
    instructions: "Instructions",
    restart: "Restart",
    shareText: "I scored {score} points in today's CricketFanGrids #{gameNumber}! Can you beat my score?",
  },
  hi: {
    title: "अल्टीमेट क्रिकेट ट्रिविया",
    subtitle: "दैनिक चुनौतियों के साथ अपने क्रिकेट ज्ञान का परीक्षण करें और दुनिया भर के प्रशंसकों के साथ प्रतिस्पर्धा करें",
    playNow: "अभी खेलें",
    gameOver: "खेल समाप्त",
    score: "स्कोर",
    guessesRemaining: "शेष अनुमान",
    share: "शेयर करें",
    copyLink: "लिंक कॉपी करें",
    instructions: "निर्देश",
    restart: "पुनः प्रारंभ करें",
    shareText: "मैंने आज के CricketFanGrids #{gameNumber} में {score} अंक स्कोर किए! क्या आप मेरे स्कोर को पछाड़ सकते हैं?",
  },
}

export function useTranslation(locale: "en" | "hi") {
  return {
    t: (key: keyof (typeof translations)["en"], params?: Record<string, string | number>) => {
      let text = translations[locale][key] || translations["en"][key]
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          text = text.replace(`{${key}}`, String(value))
        })
      }
      return text
    },
  }
}

