import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { HugeiconsIcon } from "@hugeicons/react";
import { Airplane01Icon, Shield01Icon, Analytics01Icon, ArrowRight01Icon, Tick01Icon, ZapIcon } from "@hugeicons/core-free-icons";
import { useEffect, useState } from 'react';

// Character stagger animation
const letterVariants = {
  hidden: { opacity: 0, y: 50, rotateX: -90 },
  visible: { 
    opacity: 1, 
    y: 0, 
    rotateX: 0,
    transition: { damping: 12, stiffness: 100 }
  }
};

const StaggerText = ({ text }: { text: string }) => (
  <motion.span initial="hidden" animate="visible" transition={{ staggerChildren: 0.05 }} style={{ display: 'inline-block' }}>
    {text.split('').map((char, index) => (
      <motion.span key={index} variants={letterVariants} style={{ display: 'inline-block' }}>
        {char === ' ' ? '\u00A0' : char}
      </motion.span>
    ))}
  </motion.span>
);

// 3D Tilt Card Component
const TiltCard = ({ feature, index }: { feature: any, index: number }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.2, type: "spring", stiffness: 50 }}
    >
      <motion.div 
        className="clay-card"
        style={{ transform: "translateZ(30px)", display: 'flex', flexDirection: 'column', height: '100%' }}
        whileHover={{ scale: 1.02 }}
      >
        <motion.div 
          style={{ marginBottom: '2rem', color: 'var(--brand)', display: 'inline-block', transform: "translateZ(50px)" }}
        >
          <div style={{ background: 'var(--white)', padding: '1rem', borderRadius: '20px', display: 'inline-block', boxShadow: 'var(--clay-shadow-out-sm)' }}>
             <HugeiconsIcon icon={feature.icon} size={36} />
          </div>
        </motion.div>
        <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem', fontWeight: 800, transform: "translateZ(40px)" }}>{feature.title}</h3>
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, fontSize: '1.1rem', transform: "translateZ(20px)" }}>{feature.desc}</p>
      </motion.div>
    </motion.div>
  );
};

export default function LandingPage() {
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const yOffset = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const scaleHero = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Custom Cursor state
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  return (
    <div className="container" style={{ position: 'relative', overflow: 'hidden' }}>
      
      {/* Custom Ambient Follower */}
      <motion.div
        animate={{ x: mousePosition.x - 300, y: mousePosition.y - 300 }}
        transition={{ type: "spring", damping: 30, stiffness: 50, mass: 2 }}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: '600px', height: '600px',
          background: 'radial-gradient(circle, rgba(99,102,241,0.1) 0%, rgba(168,85,247,0) 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: -1,
          filter: 'blur(40px)'
        }}
      />

      <section className="hero-section" style={{ minHeight: '85vh', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        
        {/* Floating Badges */}
        <motion.div
          animate={{ y: [0, -25, 0], rotate: [0, 8, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          style={{ position: 'absolute', top: '15%', right: '5%', background: 'var(--white)', padding: '1rem', borderRadius: '16px', boxShadow: 'var(--clay-shadow-out)', zIndex: 1, border: '1px solid rgba(255,255,255,0.5)', backdropFilter: 'blur(10px)' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '0.9rem' }}>
            <div style={{ background: '#dcfce7', padding: '0.4rem', borderRadius: '50%' }}>
              <HugeiconsIcon icon={Tick01Icon} size={18} color="#166534" />
            </div>
            Payout Executed Instantly
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 25, 0], rotate: [0, -8, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          style={{ position: 'absolute', bottom: '25%', left: '0%', background: 'var(--white)', padding: '1rem', borderRadius: '16px', boxShadow: 'var(--clay-shadow-out)', zIndex: 1, border: '1px solid rgba(255,255,255,0.5)' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '0.9rem' }}>
             <HugeiconsIcon icon={ZapIcon} size={18} color="#fbbf24" />
             Zero Human Verification
          </div>
        </motion.div>

        <motion.div
          style={{ position: 'relative', zIndex: 10, maxWidth: '900px', margin: '0 auto', textAlign: 'center', scale: scaleHero, opacity: opacityHero }}
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
          >
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2.5rem', padding: '0.5rem 1.25rem', background: 'var(--white)', color: 'var(--brand)', borderRadius: '99px', fontWeight: 700, boxShadow: 'var(--clay-shadow-out-sm)', border: '2px solid rgba(255,255,255,0.6)' }}>
              <HugeiconsIcon icon={Airplane01Icon} size={20} />
              AeroSure on GenLayer
            </div>
          </motion.div>
          
          <h1 className="hero-title" style={{ fontSize: '6rem', lineHeight: 1.1, marginBottom: '1.5rem', fontWeight: 800, letterSpacing: '-0.03em' }}>
            <StaggerText text="Parametric Flight" /><br />
            <span style={{ 
              background: 'var(--brand-gradient-text)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              <StaggerText text="Insurance Protocol." />
            </span>
          </h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="hero-subtitle" 
            style={{ fontSize: '1.35rem', maxWidth: '700px', margin: '0 auto 3.5rem auto', color: 'var(--text-muted)' }}
          >
            Say goodbye to claims adjusters. AeroSure uses GenLayer Intelligent Contracts to autonomously adjudicate flight delays via live web LLM agents.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}
          >
            <motion.button 
              className="clay-btn primary"
              onClick={() => navigate('/dashboard')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ fontSize: '1.25rem', padding: '1.25rem 3rem' }}
            >
              Launch App <HugeiconsIcon icon={ArrowRight01Icon} size={24} />
            </motion.button>
            <motion.a 
              href="https://github.com/salch-cred/aerosure-genlayer" 
              target="_blank" 
              rel="noreferrer" 
              className="clay-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ fontSize: '1.25rem', padding: '1.25rem 3rem' }}
            >
              View Source
            </motion.a>
          </motion.div>
        </motion.div>
      </section>

      <motion.div style={{ y: yOffset, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2rem', marginTop: '5rem', paddingBottom: '10rem', width: '100%', position: 'relative', zIndex: 20 }}>
        {[
          { icon: Shield01Icon, title: "Trustless Execution", desc: "No insurance adjusters. Claims are verified automatically against authoritative aviation web sources." },
          { icon: Airplane01Icon, title: "Live Aviation Data", desc: "GenLayer Intelligent contracts securely query the open internet to check your flight status in real-time." },
          { icon: Analytics01Icon, title: "Dynamic Risk Pricing", desc: "Premiums dynamically adjust instantly based on historical delay data for your specific flight path." }
        ].map((feature, i) => (
          <TiltCard key={i} feature={feature} index={i} />
        ))}
      </motion.div>
    </div>
  );
}
