import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { HugeiconsIcon } from "@hugeicons/react";
import { Airplane01Icon, Logout01Icon, UserCircleIcon } from "@hugeicons/core-free-icons";
import { usePrivy } from '@privy-io/react-auth';
import Dashboard from './components/Dashboard';
import LandingPage from './components/LandingPage';

function App() {
  const { login, logout, authenticated, user } = usePrivy();

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
        <div>
          {authenticated ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, color: 'var(--brand)' }}>
                <HugeiconsIcon icon={UserCircleIcon} size={20} />
                {user?.email?.address || user?.wallet?.address.slice(0, 6) + '...' + user?.wallet?.address.slice(-4) || 'User'}
              </div>
              <button className="clay-btn" onClick={logout} style={{ padding: '0.5rem 1rem' }}>
                <HugeiconsIcon icon={Logout01Icon} size={18} />
              </button>
            </div>
          ) : (
            <button className="clay-btn primary" onClick={login}>Login / Connect Wallet</button>
          )}
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
