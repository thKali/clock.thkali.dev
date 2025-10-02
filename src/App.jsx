import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Clock from './components/clock/Clock'
import Timer from './components/timer/Timer'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <nav style={{ marginBottom: '2rem' }}>
          <Link to="/" style={{ marginRight: '1rem', color: '#646cff' }}>Clock</Link>
          <Link to="/timer" style={{ marginRight: '1rem', color: '#646cff' }}>Timer</Link>
          <Link to="/pomodoro" style={{ color: '#646cff' }}>Pomodoro</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Clock />} />
          <Route path="/timer" element={<Timer />} />
          <Route path="/pomodoro" element={<div>Building...</div>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
