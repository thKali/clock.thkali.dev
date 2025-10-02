import { useState, useEffect, useRef } from 'react'
import './Timer.css'

function Timer() {
  const [totalSeconds, setTotalSeconds] = useState(300)
  const [isRunning, setIsRunning] = useState(false)
  const hasFinished = useRef(false)

  const playBeep = () => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)
    
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime)
    oscillator.type = 'sine'
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5)
    
    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.5)
  }

  useEffect(() => {
    let interval = null

    if (isRunning) {
      hasFinished.current = false
      interval = setInterval(() => {
        setTotalSeconds(prevTotalSeconds => {
          if (prevTotalSeconds > 0) {
            return prevTotalSeconds - 1;
          }

          if (prevTotalSeconds === 0 && !hasFinished.current) {
            hasFinished.current = true
            setIsRunning(false);
            playBeep();
            alert('Timer finished!');
          }
          return 0;
        });
      }, 1000);

      return () => clearInterval(interval)
    }
  }, [isRunning]);

  const start = () => setIsRunning(true)
  const pause = () => setIsRunning(false)
  const reset = () => {
    setIsRunning(false)
    setTotalSeconds(300)
  }

  const addTime = (addMinutes, addSeconds = 0) => {
    const additionalSeconds = addMinutes * 60 + addSeconds
    setTotalSeconds(prevTotalSeconds => prevTotalSeconds + additionalSeconds)
  }

  const removeTime = (removeMinutes, removeSeconds = 0) => {
    const removeTotalSeconds = removeMinutes * 60 + removeSeconds
    setTotalSeconds(prevTotalSeconds => {
      const newTotalSeconds = prevTotalSeconds - removeTotalSeconds
      return newTotalSeconds < 0 ? 0 : newTotalSeconds
    })
  }

  const formatTime = (totalSecs) => {
    const mins = Math.floor(totalSecs / 60)
    const secs = totalSecs % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="timer-container">
      <div className="timer">
        {formatTime(totalSeconds)}
      </div>

      <div className="timer-controls">
        <div className="time-buttons">
          <div className="add-buttons">
            <button onClick={() => addTime(0, 1)}>
              +1s
            </button>
            <button onClick={() => addTime(0, 10)}>
              +10s
            </button>
            <button onClick={() => addTime(0, 30)}>
              +30s
            </button>
            <button onClick={() => addTime(1, 0)}>
              +1m
            </button>
            <button onClick={() => addTime(5, 0)}>
              +5m
            </button>
            <button onClick={() => addTime(10, 0)}>
              +10m
            </button>
          </div>
          
          <div className="remove-buttons">
            <button onClick={() => removeTime(0, 1)}>
              -1s
            </button>
            <button onClick={() => removeTime(0, 10)}>
              -10s
            </button>
            <button onClick={() => removeTime(0, 30)}>
              -30s
            </button>
            <button onClick={() => removeTime(1, 0)}>
              -1m
            </button>
            <button onClick={() => removeTime(5, 0)}>
              -5m
            </button>
            <button onClick={() => removeTime(10, 0)}>
              -10m
            </button>
          </div>
        </div>
      </div>

      <div className="timer-buttons">
        <button onClick={start} disabled={isRunning || totalSeconds === 0}>
          Start
        </button>
        <button onClick={pause} disabled={!isRunning}>
          Pause
        </button>
        <button onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  )
}

export default Timer
