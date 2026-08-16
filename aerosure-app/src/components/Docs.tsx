import { motion } from 'framer-motion';

export default function Docs() {
  return (
    <div className="container">
      <div className="docs-layout">
        <aside className="docs-sidebar">
          <div className="docs-sidebar-section">Getting Started</div>
          <a href="#" className="docs-sidebar-link">Introduction</a>
          <a href="#" className="docs-sidebar-link">Quick Start</a>
          <a href="#" className="docs-sidebar-link">Authentication</a>
          
          <div className="docs-sidebar-section">Core Concepts</div>
          <a href="#" className="docs-sidebar-link">GenLayer Architecture</a>
          <a href="#" className="docs-sidebar-link">LLM Consensus</a>
          <a href="#" className="docs-sidebar-link">Intelligent Contracts</a>
          
          <div className="docs-sidebar-section">Integration</div>
          <a href="#" className="docs-sidebar-link">Web3 SDK</a>
          <a href="#" className="docs-sidebar-link">REST API</a>
          <a href="#" className="docs-sidebar-link">Webhooks</a>
        </aside>

        <main className="docs-content">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1>Introduction to AeroSure</h1>
            <p>
              AeroSure is the first fully autonomous parametric flight insurance protocol built entirely on GenLayer. 
              By leveraging GenLayer's non-deterministic Intelligent Contracts, AeroSure entirely eliminates the need 
              for human claims adjusters or centralized oracles like Chainlink.
            </p>
            
            <h2 style={{ marginTop: '2.5rem', marginBottom: '1rem', fontSize: '1.75rem' }}>How It Works</h2>
            <p>
              Traditional parametric insurance relies on centralized APIs publishing flight delay data on-chain. AeroSure 
              inverts this model by deploying an LLM (Large Language Model) directly into the consensus layer of the blockchain.
            </p>
            
            <h3 style={{ marginTop: '2rem', marginBottom: '1rem', fontSize: '1.25rem' }}>The GenLayer Contract</h3>
            <p>
              When a user files a claim, the network validators each independently run a Python-based intelligent contract. 
              This contract uses <code>prompt_non_comparative</code> to task an LLM with browsing live internet data to 
              determine the status of a specific flight.
            </p>
            
            <pre>
{`# GenLayer Consensus Block
decision = gl.eq_principle.prompt_non_comparative(
    get_input,
    task="Search the web and analyze if this flight was delayed for more than 2 hours or canceled.",
    criteria="The response must be exactly one word: DELAYED or ON_TIME.",
)`}
            </pre>
            
            <p>
              If the validators reach consensus that the LLM output is "DELAYED", the smart contract autonomously triggers 
              a payout to the policyholder's wallet.
            </p>
            
            <div style={{ marginTop: '3rem', padding: '1.5rem', background: 'rgba(0,0,0,0.03)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
              <h4 style={{ marginBottom: '0.5rem' }}>Want to see the code?</h4>
              <p style={{ margin: 0, fontSize: '0.875rem' }}>
                The full Python contract implementation is open source. You can copy it directly into GenLayer Studio to deploy your own instance of the protocol.
              </p>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
