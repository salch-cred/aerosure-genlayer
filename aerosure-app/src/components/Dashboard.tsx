import { useState } from 'react';
import { HugeiconsIcon } from "@hugeicons/react";
import { Airplane01Icon, Shield01Icon, Cancel01Icon, CheckmarkBadge01Icon } from "@hugeicons/core-free-icons";
import { motion } from 'framer-motion';

export default function Dashboard() {
  const [flightNumber, setFlightNumber] = useState("");
  const [flightDate, setFlightDate] = useState("");
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [policies, setPolicies] = useState<any[]>([
    { id: 0, flight: "DL101", date: "2026-08-20", premium: 10, payout: 100, status: "active" },
    { id: 1, flight: "DELAY404", date: "2026-08-15", premium: 15, payout: 150, status: "claimed" }
  ]);
  const [claimingId, setClaimingId] = useState<number | null>(null);

  const handlePurchase = async () => {
    if (!flightNumber || !flightDate) return;
    setIsPurchasing(true);
    
    // Simulate transaction delay
    setTimeout(() => {
      const newPolicy = {
        id: policies.length,
        flight: flightNumber,
        date: flightDate,
        premium: 20, // fixed for demo
        payout: 200,
        status: "active"
      };
      setPolicies([...policies, newPolicy]);
      setFlightNumber("");
      setFlightDate("");
      setIsPurchasing(false);
    }, 2000);
  };

  const handleClaim = async (id: number, flight: string) => {
    setClaimingId(id);
    
    // In a real scenario, this uses genlayer-js to call `claim_payout`
    // const client = createClient();
    // await client.writeContract({ address: CONTRACT_ADDRESS, functionName: 'claim_payout', args: [id] });
    
    setTimeout(() => {
      setPolicies(policies.map(p => {
        if (p.id === id) {
          // If mock flight contains DELAY or CANCEL, it succeeds.
          const isDelayed = flight.toUpperCase().includes("DELAY") || flight.toUpperCase().includes("CANCEL");
          return { ...p, status: isDelayed ? "claimed" : "rejected" };
        }
        return p;
      }));
      setClaimingId(null);
    }, 3000);
  };

  return (
    <div className="dashboard">
      <div className="dashboard-grid">
        <motion.div 
          className="glass-card purchase-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2><HugeiconsIcon icon={Airplane01Icon} size={24} /> Get Flight Insurance</h2>
          <p className="subtitle">Parametric protection powered by GenLayer</p>
          
          <div className="input-group">
            <label>Flight Number</label>
            <input 
              type="text" 
              placeholder="e.g. AA123, DELAY404" 
              value={flightNumber}
              onChange={(e) => setFlightNumber(e.target.value)}
            />
          </div>
          
          <div className="input-group">
            <label>Flight Date</label>
            <input 
              type="date" 
              value={flightDate}
              onChange={(e) => setFlightDate(e.target.value)}
            />
          </div>
          
          <div className="quote-box">
            <div className="quote-row">
              <span>Premium (Stake)</span>
              <strong>20 $GEN</strong>
            </div>
            <div className="quote-row highlight">
              <span>Guaranteed Payout</span>
              <strong>200 $GEN</strong>
            </div>
          </div>
          
          <button 
            className="btn-primary" 
            onClick={handlePurchase}
            disabled={isPurchasing || !flightNumber || !flightDate}
          >
            {isPurchasing ? (
              <span className="flex-center">Processing...</span>
            ) : (
              <span className="flex-center"><HugeiconsIcon icon={Shield01Icon} size={20} /> Purchase Policy</span>
            )}
          </button>
        </motion.div>

        <motion.div 
          className="glass-card policies-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2>My Policies</h2>
          <div className="policies-list">
            {policies.map(policy => (
              <div key={policy.id} className={`policy-item ${policy.status}`}>
                <div className="policy-header">
                  <span className="flight">{policy.flight}</span>
                  <span className={`status-badge ${policy.status}`}>
                    {policy.status === 'active' && 'ACTIVE'}
                    {policy.status === 'claimed' && <><HugeiconsIcon icon={CheckmarkBadge01Icon} size={14}/> PAID OUT</>}
                    {policy.status === 'rejected' && <><HugeiconsIcon icon={Cancel01Icon} size={14}/> REJECTED</>}
                  </span>
                </div>
                <div className="policy-details">
                  <span>Date: {policy.date}</span>
                  <span>Payout: {policy.payout} $GEN</span>
                </div>
                
                {policy.status === 'active' && (
                  <button 
                    className="btn-claim"
                    onClick={() => handleClaim(policy.id, policy.flight)}
                    disabled={claimingId === policy.id}
                  >
                    {claimingId === policy.id ? 'Adjudicating via LLM...' : 'File Claim'}
                  </button>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
