import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { HugeiconsIcon } from "@hugeicons/react";
import { Airplane01Icon, Logout01Icon, UserCircleIcon } from "@hugeicons/core-free-icons";
import { usePrivy } from '@privy-io/react-auth';
import Dashboard from './components/Dashboard';
import LandingPage from './components/LandingPage';
import Docs from './components/Docs';

function App() {
  const { login, logout, authenticated, user } = usePrivy();

  return (
    <Router>
      
      <nav className="navbar">
        <Link to="/" className="nav-logo">
          <HugeiconsIcon icon={Airplane01Icon} size={28} color="var(--brand)" />
          AeroSure
        </Link>
        <div className="nav-links">
          <Link to="/features">Features</Link>
          <Link to="/pricing">Pricing</Link>
          <Link to="/docs">Documentation</Link>
        </div>
        <div>
          {authenticated ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 500, color: 'var(--text-main)' }}>
                <HugeiconsIcon icon={UserCircleIcon} size={18} />
                {user?.email?.address || (user?.wallet?.address ? `${user.wallet.address.slice(0, 6)}...${user.wallet.address.slice(-4)}` : 'User')}
              </div>
              <Link to="/dashboard" className="saas-btn primary" style={{ padding: '0.5rem 1rem' }}>Dashboard</Link>
              <button className="saas-btn" onClick={logout} style={{ padding: '0.5rem' }}>
                <HugeiconsIcon icon={Logout01Icon} size={18} />
              </button>
            </div>
          ) : (
            <button className="saas-btn primary" onClick={login}>Get Started</button>
          )}
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/docs" element={<Docs />} />
      </Routes>
    </Router>
  );
}

export default App;
