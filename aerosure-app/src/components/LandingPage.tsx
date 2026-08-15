import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { HugeiconsIcon } from "@hugeicons/react";
import { Airplane01Icon, Shield01Icon, Analytics01Icon, ArrowRight01Icon, Tick01Icon } from "@hugeicons/core-free-icons";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 70, damping: 15 } }
};

export default function LandingPage() {
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const yOffset = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div className="container" style={{ position: 'relative' }}>
      <section className="hero-section" style={{ minHeight: '85vh', position: 'relative' }}>
        
        {/* Floating Decorative Elements */}
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          style={{ position: 'absolute', top: '10%', right: '10%', background: 'var(--white)', padding: '1rem', borderRadius: '16px', boxShadow: 'var(--clay-shadow-out)', zIndex: 1 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700 }}>
            <div style={{ background: '#dcfce7', padding: '0.5rem', borderRadius: '50%' }}>
              <HugeiconsIcon icon={Tick01Icon} size={20} color="#166534" />
            </div>
            Claim Approved
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          style={{ position: 'absolute', bottom: '20%', left: '5%', background: 'var(--white)', padding: '1rem', borderRadius: '16px', boxShadow: 'var(--clay-shadow-out)', zIndex: 1 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700 }}>
             <HugeiconsIcon icon={Analytics01Icon} size={20} color="var(--brand)" />
             Live Risk: Low
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ position: 'relative', zIndex: 10, maxWidth: '800px', margin: '0 auto' }}
        >
          <motion.div variants={itemVariants}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', padding: '0.5rem 1rem', background: 'var(--brand)', color: 'white', borderRadius: '99px', fontWeight: 600, boxShadow: '0 4px 14px rgba(37,99,235,0.4)' }}>
              <HugeiconsIcon icon={Airplane01Icon} size={20} />
              AeroSure on GenLayer
            </div>
          </motion.div>
          
          <motion.h1 variants={itemVariants} className="hero-title" style={{ fontSize: '5.5rem' }}>
            Parametric Flight Insurance,<br />
            <motion.span 
              initial={{ backgroundPosition: '0% 50%' }}
              animate={{ backgroundPosition: '100% 50%' }}
              transition={{ duration: 5, repeat: Infinity, repeatType: 'reverse' }}
              style={{ 
                background: 'linear-gradient(270deg, #2563eb, #7c3aed, #2563eb)',
                backgroundSize: '200% 200%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block'
              }}
            >
              Fully Autonomous.
            </motion.span>
          </motion.h1>
          
          <motion.p variants={itemVariants} className="hero-subtitle" style={{ fontSize: '1.5rem', maxWidth: '700px', margin: '0 auto 3rem auto' }}>
            Say goodbye to slow claims processing. AeroSure uses GenLayer Intelligent Contracts to autonomously verify flight delays and instantly execute payouts based on live web data.
          </motion.p>
          
          <motion.div variants={itemVariants} style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
            <motion.button 
              className="clay-btn primary"
              onClick={() => navigate('/dashboard')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ fontSize: '1.25rem', padding: '1rem 2.5rem' }}
            >
              Launch App <HugeiconsIcon icon={ArrowRight01Icon} size={24} />
            </motion.button>
            <motion.a 
              href="https://github.com/salch-cred/aerosure-genlayer" 
              target="_blank" 
              rel="noreferrer" 
              className="clay-btn"
              whileHover={{ scale: 1.05, boxShadow: '10px 10px 20px #d1d9e6, -10px -10px 20px #ffffff' }}
              whileTap={{ scale: 0.95 }}
              style={{ fontSize: '1.25rem', padding: '1rem 2.5rem' }}
            >
              View Source
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div style={{ y: yOffset, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2rem', marginTop: '10rem', width: '100%' }}>
          {[
            { icon: Shield01Icon, title: "Trustless Execution", desc: "No insurance adjusters. Claims are verified automatically against authoritative web sources." },
            { icon: Airplane01Icon, title: "Live Aviation Data", desc: "GenLayer contracts query the live internet to check your flight status in real-time." },
            { icon: Analytics01Icon, title: "Dynamic Risk", desc: "Premiums adjust dynamically based on historical delay data for your specific flight path." }
          ].map((feature, i) => (
            <motion.div 
              key={i}
              className="clay-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.2, type: "spring", stiffness: 50 }}
              whileHover={{ 
                y: -10, 
                boxShadow: '15px 15px 30px #c8d0e0, -15px -15px 30px #ffffff',
                scale: 1.02
              }}
              style={{ textAlign: 'left', padding: '2.5rem' }}
            >
              <motion.div 
                whileHover={{ rotate: 15, scale: 1.1 }}
                style={{ marginBottom: '1.5rem', color: 'var(--brand)', display: 'inline-block' }}
              >
                <HugeiconsIcon icon={feature.icon} size={40} />
              </motion.div>
              <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem', fontWeight: 800 }}>{feature.title}</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, fontSize: '1.1rem' }}>{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
}
