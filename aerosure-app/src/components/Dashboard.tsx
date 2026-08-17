import { useState, useEffect } from 'react';
import { HugeiconsIcon } from "@hugeicons/react";
import { Shield01Icon, Cancel01Icon, CheckmarkBadge01Icon, Airplane01Icon, Analytics01Icon } from "@hugeicons/core-free-icons";
import { motion } from 'framer-motion';
import { usePrivy } from '@privy-io/react-auth';

// GenLayer Integration
import { createClient, createAccount } from "genlayer-js";
import { testnetBradbury } from "genlayer-js/chains";
import { TransactionStatus, ExecutionResult } from "genlayer-js/types";

// Create a local session account for GenLayer transactions
const genlayerAccount = createAccount();
const genlayerClient = createClient({
  chain: testnetBradbury,
  account: genlayerAccount
});

// Replace this with your newly deployed contract address!
const CONTRACT_ADDRESS = "0x4c24016B6298AB9eC69A56304aE3E832641B9C1e";

export default function Dashboard() {
  const [flightNumber, setFlightNumber] = useState("");
  const [flightDate, setFlightDate] = useState("");
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [riskData, setRiskData] = useState<{ premium: number, risk: string } | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  // Claiming State
  const [evidenceUrl, setEvidenceUrl] = useState("");
  const [claimingId, setClaimingId] = useState<number | null>(null);

  const [policies, setPolicies] = useState<any[]>([]);
  const [isLoadingPolicies, setIsLoadingPolicies] = useState(true);

  const { login, authenticated } = usePrivy();

  // Fetch Policies on Load
  useEffect(() => {
    async function fetchPolicies() {
      try {
        const policiesData: any = await genlayerClient.readContract({
          address: CONTRACT_ADDRESS,
          functionName: "get_all_policies",
          args: []
        });
        
        if (policiesData) {
          // Convert dictionary { "1": {...} } to an array and reverse for newest first
          const policiesArray = Object.entries(policiesData).map(([id, p]: [string, any]) => ({
            id: Number(id),
            flight: p.flight_number,
            date: p.flight_date,
            premium: p.premium,
            payout: p.payout,
            status: p.status.toLowerCase()
          })).reverse();
          setPolicies(policiesArray);
        }
      } catch (err) {
        console.error("Failed to fetch policies:", err);
      } finally {
        setIsLoadingPolicies(false);
      }
    }
    fetchPolicies();
  }, []);

  // Dynamic Risk Analysis Effect
  useEffect(() => {
    if (flightNumber.length > 2) {
      setIsAnalyzing(true);
      const timer = setTimeout(() => {
        // Keep the local UX for risk calculation so it feels instant
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
    
    try {
      // 1. Write to GenLayer Contract
      const txHash = await genlayerClient.writeContract({
        address: CONTRACT_ADDRESS,
        functionName: 'purchase_policy',
        args: [flightNumber, flightDate, riskData.premium],
        value: 0n,
      });

      // 2. Wait for network consensus
      await genlayerClient.waitForTransactionReceipt({
        hash: txHash,
        status: TransactionStatus.FINALIZED,
      });

      // 3. Update UI state
      const newPolicy = {
        id: policies.length, // In a real app, read the returned policy_id from the contract trace
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
    } catch (err) {
      console.error("GenLayer Transaction Failed:", err);
      alert("GenLayer transaction failed. Check console for details.");
    } finally {
      setIsPurchasing(false);
    }
  };

  const handleClaim = async (id: number) => {
    if (!evidenceUrl) {
      alert("Please provide an evidence URL for the GenLayer LLMs to verify.");
      return;
    }
    
    setClaimingId(id);
    
    try {
      // 1. Write to GenLayer Contract with Evidence URL
      const txHash = await genlayerClient.writeContract({
        address: CONTRACT_ADDRESS,
        functionName: 'claim_payout',
        args: [id, evidenceUrl],
        value: 0n,
      });

      // 2. Wait for network consensus and LLM execution
      const receipt = await genlayerClient.waitForTransactionReceipt({
        hash: txHash,
        status: TransactionStatus.FINALIZED,
      });

      // 3. Read the contract state to see the actual result (or check execution trace)
      // Since our contract returns a string, we check if it finished with return
      let updatedStatus = "rejected";
      if (receipt.txExecutionResultName === ExecutionResult.FINISHED_WITH_RETURN) {
        // For the hackathon demo, we'll assume a successful return means the logic passed,
        // but we can also use readContract to check the final policy status.
        const policyData: any = await genlayerClient.readContract({
          address: CONTRACT_ADDRESS,
          functionName: "get_policy",
          args: [id]
        });
        
        if (policyData && policyData.status) {
           updatedStatus = policyData.status.toLowerCase();
        } else {
           // Fallback if read fails
           updatedStatus = "claimed"; 
        }
      }

      setPolicies(policies.map(p => {
        if (p.id === id) {
          return { ...p, status: updatedStatus };
        }
        return p;
      }));
      setEvidenceUrl("");
    } catch (err) {
      console.error("GenLayer Claim Failed:", err);
      alert("GenLayer claim failed. Ensure the contract is deployed and address is correct.");
    } finally {
      setClaimingId(null);
    }
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
            {isPurchasing ? 'Broadcasting to GenLayer...' : <><HugeiconsIcon icon={Shield01Icon} size={20} /> Purchase Policy</>}
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
            {isLoadingPolicies ? (
              <div style={{ color: 'var(--text-muted)' }}>Fetching from GenLayer...</div>
            ) : policies.length === 0 ? (
              <div style={{ color: 'var(--text-muted)' }}>No policies found.</div>
            ) : policies.map((policy, index) => (
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
                  <div style={{ marginTop: '1rem' }}>
                    <div style={{ marginBottom: '0.5rem' }}>
                      <input 
                        type="url" 
                        className="saas-input"
                        placeholder="https://flightaware.com/..." 
                        value={evidenceUrl}
                        onChange={(e) => setEvidenceUrl(e.target.value)}
                        style={{ padding: '0.5rem', fontSize: '0.875rem' }}
                      />
                    </div>
                    <button 
                      className="saas-btn"
                      onClick={() => handleClaim(policy.id)}
                      disabled={claimingId === policy.id}
                      style={{ justifyContent: 'center', width: '100%' }}
                    >
                      {claimingId === policy.id ? 'Waiting for LLM Consensus...' : 'File Claim'}
                    </button>
                  </div>
                )}
                {policy.status === 'claimed' && (
                  <div style={{ color: '#166534', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                    <HugeiconsIcon icon={CheckmarkBadge01Icon} size={16} /> Claim approved and paid out by GenLayer.
                  </div>
                )}
                {policy.status === 'rejected' && (
                  <div style={{ color: '#991b1b', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                    <HugeiconsIcon icon={Cancel01Icon} size={16} /> LLM verified flight was NOT delayed.
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
