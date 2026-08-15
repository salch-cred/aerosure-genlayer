import Dashboard from './components/Dashboard';
import { HugeiconsIcon } from "@hugeicons/react";
import { Airplane01Icon } from "@hugeicons/core-free-icons";

function App() {
  return (
    <div className="app-container">
      <div className="liquid-bg"></div>
      
      <header className="glass-header">
        <div className="logo">
          <HugeiconsIcon icon={Airplane01Icon} size={28} />
          <span>AeroSure</span>
        </div>
        <nav>
          <a href="#" className="active">Insurance</a>
          <a href="#">My Policies</a>
          <a href="#">Docs</a>
        </nav>
        <button className="btn-connect">Connect Wallet</button>
      </header>

      <main>
        <div className="hero">
          <h1>Parametric Flight Insurance</h1>
          <p>Powered by GenLayer Intelligent Contracts. Automated payouts with zero human intervention.</p>
        </div>
        <Dashboard />
      </main>
    </div>
  );
}

export default App;
