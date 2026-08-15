import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { HugeiconsIcon } from "@hugeicons/react";
import { Airplane01Icon, Shield01Icon, Analytics01Icon } from "@hugeicons/core-free-icons";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <section className="hero-section">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', padding: '0.5rem 1rem', background: 'var(--brand)', color: 'white', borderRadius: '99px', fontWeight: 600 }}>
            <HugeiconsIcon icon={Airplane01Icon} size={20} />
            AeroSure on GenLayer
          </div>
          <h1 className="hero-title">
            Parametric Flight Insurance,<br />
            Fully Autonomous.
          </h1>
          <p className="hero-subtitle">
            Say goodbye to slow claims processing. AeroSure uses GenLayer Intelligent Contracts to autonomously verify flight delays and instantly execute payouts based on live web data.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button 
              className="clay-btn primary"
              onClick={() => navigate('/dashboard')}
            >
              Launch App
            </button>
            <a href="https://github.com/salch-cred/aerosure-genlayer" target="_blank" rel="noreferrer" className="clay-btn">
              View Source
            </a>
          </div>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2rem', marginTop: '6rem', width: '100%' }}>
          {[
            { icon: Shield01Icon, title: "Trustless Execution", desc: "No insurance adjusters. Claims are verified automatically against authoritative web sources." },
            { icon: Airplane01Icon, title: "Live Aviation Data", desc: "GenLayer contracts query the live internet to check your flight status in real-time." },
            { icon: Analytics01Icon, title: "Dynamic Risk", desc: "Premiums adjust dynamically based on historical delay data for your specific flight path." }
          ].map((feature, i) => (
            <motion.div 
              key={i}
              className="clay-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.5 }}
              style={{ textAlign: 'left', padding: '2rem' }}
            >
              <div style={{ marginBottom: '1rem', color: 'var(--brand)' }}>
                <HugeiconsIcon icon={feature.icon} size={32} />
              </div>
              <h3 style={{ marginBottom: '0.5rem', fontSize: '1.25rem' }}>{feature.title}</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.5 }}>{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
