import { useState, useEffect } from 'react';
import { HugeiconsIcon } from "@hugeicons/react";
import { Shield01Icon, Cancel01Icon, CheckmarkBadge01Icon, Airplane01Icon, Analytics01Icon } from "@hugeicons/core-free-icons";
import { motion } from 'framer-motion';
import { usePrivy } from '@privy-io/react-auth';

export default function Dashboard() {
  const [flightNumber, setFlightNumber] = useState("");
  const [flightDate, setFlightDate] = useState("");
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [riskData, setRiskData] = useState<{ premium: number, risk: string } | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const [policies, setPolicies] = useState<any[]>([
    { id: 0, flight: "DL101", date: "2026-08-20", premium: 10, payout: 100, status: "active" },
    { id: 1, flight: "DELAY404", date: "2026-08-15", premium: 15, payout: 150, status: "claimed" }
  ]);
  const [claimingId, setClaimingId] = useState<number | null>(null);

  const { login, authenticated } = usePrivy();

  // Dynamic Risk Analysis Effect
  useEffect(() => {
    if (flightNumber.length > 2) {
      setIsAnalyzing(true);
      const timer = setTimeout(() => {
        // Simulate dynamic risk calculation
        const isHighRisk = flightNumber.toUpperCase().includes('DELAY');
        setRiskData({
          premium: isHighRisk ? 35 : 10,
          risk: isHighRisk ? 'HIGH' : 'LOW'
        });
        setIsAnalyzing(false);
      }, 800);
      return () => clearTimeout(timer);
    } else {
      setRiskData(null);
    }
  }, [flightNumber]);

  const handlePurchase = async () => {
    if (!authenticated) {
      login();
      return;
    }
    if (!flightNumber || !flightDate || !riskData) return;
    setIsPurchasing(true);
    
    setTimeout(() => {
      const newPolicy = {
        id: policies.length,
        flight: flightNumber,
        date: flightDate,
        premium: riskData.premium,
        payout: riskData.premium * 10,
        status: "active"
      };
      setPolicies([newPolicy, ...policies]);
      setFlightNumber("");
      setFlightDate("");
      setRiskData(null);
      setIsPurchasing(false);
    }, 1500);
  };

  const handleClaim = async (id: number, flight: string) => {
    setClaimingId(id);
    
    setTimeout(() => {
      setPolicies(policies.map(p => {
        if (p.id === id) {
          const isDelayed = flight.toUpperCase().includes("DELAY") || flight.toUpperCase().includes("CANCEL");
          return { ...p, status: isDelayed ? "claimed" : "rejected" };
        }
        return p;
      }));
      setClaimingId(null);
    }, 2500);
  };

  return (
    <div className="container">
      <div style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Dashboard</h1>
        <p style={{ color: 'var(--text-muted)' }}>Manage your decentralized flight insurance policies.</p>
      </div>

      <div className="dashboard-grid">
        <motion.div 
          className="saas-card"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
            <HugeiconsIcon icon={Airplane01Icon} size={24} /> Get Covered
          </h2>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <label className="input-label">Flight Number</label>
            <input 
              type="text" 
              className="saas-input"
              placeholder="e.g. AA123 (Try DELAY404)" 
              value={flightNumber}
              onChange={(e) => setFlightNumber(e.target.value)}
            />
          </div>
          
          <div style={{ marginBottom: '2rem' }}>
            <label className="input-label">Flight Date</label>
            <input 
              type="date" 
              className="saas-input"
              value={flightDate}
              onChange={(e) => setFlightDate(e.target.value)}
            />
          </div>

          {isAnalyzing && (
            <div className="risk-alert">
              <HugeiconsIcon icon={Analytics01Icon} size={20} className="spin" />
              <span>Analyzing historical delay risk...</span>
            </div>
          )}

          {!isAnalyzing && riskData && (
            <motion.div 
              className={`risk-alert ${riskData.risk === 'HIGH' ? 'high' : ''}`}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
            >
              <HugeiconsIcon icon={Analytics01Icon} size={20} />
              <div style={{ flex: 1 }}>
                <strong style={{ display: 'block', marginBottom: '0.25rem' }}>Risk Profile: {riskData.risk}</strong>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', marginTop: '1rem' }}>
                  <span>Premium: <strong>{riskData.premium} $GEN</strong></span>
                  <span>Payout: <strong>{riskData.premium * 10} $GEN</strong></span>
                </div>
              </div>
            </motion.div>
          )}
          
          <button 
            className="saas-btn primary" 
            onClick={handlePurchase}
            disabled={isPurchasing || !flightNumber || !flightDate || !riskData}
            style={{ width: '100%', marginTop: '2rem', justifyContent: 'center' }}
          >
            {isPurchasing ? 'Processing Transaction...' : <><HugeiconsIcon icon={Shield01Icon} size={20} /> Purchase Policy</>}
          </button>
        </motion.div>

        <motion.div 
          className="saas-card"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h2 style={{ marginBottom: '2rem' }}>Active Policies</h2>
          <div className="policy-list">
            {policies.map((policy, index) => (
              <motion.div 
                key={policy.id} 
                className="policy-card"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="policy-header">
                  <span>{policy.flight}</span>
                  <span className={`badge ${policy.status}`}>
                    {policy.status.toUpperCase()}
                  </span>
                </div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                  Date: {policy.date} &bull; Payout: {policy.payout} $GEN
                </div>
                
                {policy.status === 'active' && (
                  <button 
                    className="saas-btn"
                    onClick={() => handleClaim(policy.id, policy.flight)}
                    disabled={claimingId === policy.id}
                    style={{ marginTop: '0.5rem', justifyContent: 'center', width: '100%' }}
                  >
                    {claimingId === policy.id ? 'Verifying with GenLayer LLM...' : 'File Claim'}
                  </button>
                )}
                {policy.status === 'claimed' && (
                  <div style={{ color: '#166534', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                    <HugeiconsIcon icon={CheckmarkBadge01Icon} size={16} /> Claim successfully paid out via intelligent contract.
                  </div>
                )}
                {policy.status === 'rejected' && (
                  <div style={{ color: '#991b1b', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                    <HugeiconsIcon icon={Cancel01Icon} size={16} /> LLM verified flight was not delayed.
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
