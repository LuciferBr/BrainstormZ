import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import BrainstormPage from './pages/BrainstormPage';
import AboutBrainstorm from './pages/AboutBrainstorm';
import BrainstormingPage from './pages/BrainstormingPage';
import LuciferBOFLAI from './pages/LuciferBOFLAI';
import IGCPage from './pages/IGCPage';
import GameplaysPage from './pages/GameplaysPage';
import ContactPage from './pages/ContactPage';
import FeedbackPage from './pages/FeedbackPage';

function App() {
  return (
    <Router>
      <div className="App App-2070s">
        <header className="App-header">
          <img src={logo} className="App-logo App-logo-holo" alt="Brainstorm 2070s logo" />
          <h1 className="App-title-neon">Brainstorm</h1>
          <p className="AppSubtitle-cyber">
            Neural hub for staff, events, and quantum ideas | 2070s edition
          </p>
          <nav className="App-nav-cyber">
            <Link to="/" className="App-nav-link">Core</Link>
            <Link to="/about" className="App-nav-link">About</Link>
            <Link to="/brainstorming" className="App-nav-link">Nexus</Link>
            <Link to="/luciferbofl" className="App-nav-link">LuciferBOFL</Link>
            <Link to="/igc" className="App-nav-link">IGC</Link>
            <Link to="/gameplays" className="App-nav-link">Matrix</Link>
            <Link to="/contact" className="App-nav-link">Grid</Link>
            <Link to="/feedback" className="App-nav-link">Portal</Link>
          </nav>
        </header>
        <main className="App-main-grid">
          <Routes>
            <Route path="/" element={<BrainstormPage />} />
            <Route path="/about" element={<AboutBrainstorm />} />
            <Route path="/brainstorming" element={<BrainstormingPage />} />
            <Route path="/luciferbofl" element={<LuciferBOFLAI />} />
            <Route path="/igc" element={<IGCPage />} />
            <Route path="/gameplays" element={<GameplaysPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/feedback" element={<FeedbackPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;