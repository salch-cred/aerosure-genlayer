import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { HugeiconsIcon } from "@hugeicons/react";
import { 
  Shield01Icon,
  ArrowRight01Icon, 
  Tick01Icon, 
  ZapIcon,
  GlobalIcon,
  Blockchain03Icon,
  SmartPhone01Icon
} from "@hugeicons/core-free-icons";

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="container">
      {/* Hero Section */}
      <section className="hero-section">
        <motion.div 
          className="hero-badge"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          Built on GenLayer &bull; The first intelligent contract protocol
        </motion.div>
        
        <motion.h1 
          className="hero-title"
          initial="hidden"
          animate="visible"
          variants={fadeUpVariants}
        >
          Parametric insurance, fully automated by AI.
        </motion.h1>
        
        <motion.p 
          className="hero-subtitle"
          initial="hidden"
          animate="visible"
          variants={fadeUpVariants}
        >
          AeroSure replaces human claims adjusters with decentralized LLMs. 
          Instant payouts for delayed flights, verified autonomously on the GenLayer testnet.
        </motion.p>
        
        <motion.div 
          style={{ display: 'flex', gap: '1rem' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <button className="saas-btn primary" onClick={() => navigate('/dashboard')}>
            Start Free Trial <HugeiconsIcon icon={ArrowRight01Icon} size={18} />
          </button>
          <button className="saas-btn" onClick={() => navigate('/docs')}>
            Read Documentation
          </button>
        </motion.div>
      </section>

      {/* Social Proof */}
      <motion.section 
        className="logo-cloud"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.5 }}
        viewport={{ once: true }}
      >
        <div style={{ fontWeight: 700, fontSize: '1.25rem', letterSpacing: '-0.03em', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          <HugeiconsIcon icon={GlobalIcon} size={24} /> GenLayer
        </div>
        <div style={{ fontWeight: 700, fontSize: '1.25rem', letterSpacing: '-0.03em', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          <HugeiconsIcon icon={Blockchain03Icon} size={24} /> Wagmi
        </div>
        <div style={{ fontWeight: 700, fontSize: '1.25rem', letterSpacing: '-0.03em', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          <HugeiconsIcon icon={Shield01Icon} size={24} /> Privy
        </div>
      </motion.section>

      {/* Bento Grid Features */}
      <section style={{ marginBottom: '8rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Enterprise-grade architecture.</h2>
          <p style={{ color: 'var(--text-muted)' }}>Everything you need to automate your insurance operations.</p>
        </div>
        
        <div className="bento-grid">
          <motion.div 
            className="saas-card bento-feature-large"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariants}
          >
            <div style={{ padding: '1rem', background: 'rgba(0,0,0,0.03)', width: 'fit-content', borderRadius: '12px', marginBottom: '2rem' }}>
              <HugeiconsIcon icon={ZapIcon} size={32} color="var(--text-main)" />
            </div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Instant Adjudication via LLM Consensus</h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: '500px' }}>
              Unlike standard smart contracts that wait for centralized oracles, AeroSure's intelligent contract 
              directly prompts a decentralized network of LLMs to browse the web for live flight status, achieving 
              trustless consensus in seconds.
            </p>
          </motion.div>
          
          <motion.div 
            className="saas-card"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariants}
          >
            <div style={{ padding: '1rem', background: 'rgba(0,0,0,0.03)', width: 'fit-content', borderRadius: '12px', marginBottom: '2rem' }}>
              <HugeiconsIcon icon={SmartPhone01Icon} size={32} color="var(--text-main)" />
            </div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Frictionless Onboarding</h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>
              Native Web3 users can connect via WalletConnect, while Web2 users can seamlessly onboard with Email via Privy.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Minimalist Pricing */}
      <section style={{ marginBottom: '8rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Simple, transparent pricing.</h2>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          <div className="saas-card">
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Developer</h3>
            <div style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>Free</div>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>For testing on GenLayer Testnet.</p>
            
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
              <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}><HugeiconsIcon icon={Tick01Icon} size={18} /> 1,000 requests/mo</li>
              <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}><HugeiconsIcon icon={Tick01Icon} size={18} /> Community Support</li>
            </ul>
            <button className="saas-btn" style={{ width: '100%', justifyContent: 'center' }}>Get Started</button>
          </div>
          
          <div className="saas-card" style={{ borderColor: 'var(--text-main)', boxShadow: 'var(--shadow-lg)' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Enterprise</h3>
            <div style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>Custom</div>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>For airlines and large travel agencies.</p>
            
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
              <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}><HugeiconsIcon icon={Tick01Icon} size={18} /> Unlimited requests</li>
              <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}><HugeiconsIcon icon={Tick01Icon} size={18} /> Dedicated Node Infrastructure</li>
              <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}><HugeiconsIcon icon={Tick01Icon} size={18} /> 24/7 SLA Support</li>
            </ul>
            <button className="saas-btn primary" style={{ width: '100%', justifyContent: 'center' }}>Contact Sales</button>
          </div>
        </div>
      </section>
    </div>
  );
}
