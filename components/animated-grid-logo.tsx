"use client"

import { useEffect, useRef } from "react"

export function AnimatedGridLogo() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const cellSize = 20
    const gridSize = 3
    const canvasSize = cellSize * gridSize
    canvas.width = canvasSize
    canvas.height = canvasSize

    const colors = ["#f97316", "#ec4899", "#8b5cf6"]
    let currentCell = 0

    const animate = () => {
      ctx.clearRect(0, 0, canvasSize, canvasSize)

      for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
          const cellIndex = i * gridSize + j
          const x = j * cellSize
          const y = i * cellSize

          ctx.fillStyle = cellIndex <= currentCell ? colors[cellIndex % colors.length] : "#2a2a2a"
          ctx.fillRect(x, y, cellSize - 2, cellSize - 2)
        }
      }

      currentCell = (currentCell + 1) % (gridSize * gridSize)
      setTimeout(() => requestAnimationFrame(animate), 300)
    }

    animate()
  }, [])

  return <canvas ref={canvasRef} className="w-16 h-16" />
}

