import { useState, useEffect } from 'react'
import './Clock.css'

function Clock() {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (date) => {
    return date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  }

  return (
    <div className="clock-container">
      <div className="clock">
        {formatTime(currentTime)}
      </div>
    </div>
  )
}

export default Clock
