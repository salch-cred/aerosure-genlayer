import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { HugeiconsIcon } from "@hugeicons/react";
import { Airplane01Icon } from "@hugeicons/core-free-icons";
import Dashboard from './components/Dashboard';
import LandingPage from './components/LandingPage';

function App() {
  return (
    <Router>
      <div className="bg-blobs">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
      </div>
      
      <nav className="navbar">
        <Link to="/" className="nav-logo">
          <HugeiconsIcon icon={Airplane01Icon} size={28} color="var(--brand)" />
          AeroSure
        </Link>
        <div className="nav-links">
          <Link to="/dashboard">Insurance</Link>
          <a href="#">Whitepaper</a>
        </div>
        <button className="clay-btn">Connect Wallet</button>
      </nav>

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
