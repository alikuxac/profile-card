'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Zap, Target, BookOpen, ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const [showSkills, setShowSkills] = useState(false);

  const skillGroups = [
    { category: 'Languages', items: ['TypeScript (1 year)', 'JavaScript', 'Python', 'Kotlin'] },
    { category: 'Frameworks', items: ['Node.js', 'NestJS', 'Next.js', 'Socket.io'] },
    { category: 'Edge/Cloud', items: ['Cloudflare Workers', 'Pages', 'R2 Storage'] },
    { category: 'Databases', items: ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis'] },
    { category: 'Tools', items: ['Git/GitHub', 'Jira', 'Confluence'] },
    { category: 'Other', items: ['English (Fluent)'] }
  ];

  return (
    <div className="profile-card-container" style={{
      flexDirection: 'column',
      gap: '1.5rem',
      paddingBottom: '1rem',
      minHeight: 'calc(100vh - 180px)',
      justifyContent: 'center'
    }}>
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: 'center', maxWidth: '800px' }}
      >
        <div style={{ position: 'relative', display: 'inline-block', marginBottom: '1.5rem' }}>
          <div className="original-pic" style={{ width: '122px', height: '122px', padding: '5px' }}>
            <img src="/pic.png" alt="Profile" style={{ width: '112px', height: '112px' }} />
          </div>
          <div style={{
            position: 'absolute',
            bottom: '6px',
            right: '6px',
            background: 'var(--primary)',
            color: 'white',
            padding: '4px 12px',
            borderRadius: '20px',
            fontSize: '0.75rem',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            boxShadow: '0 4px 12px rgba(99, 102, 241, 0.4)'
          }}>
            <Zap size={12} fill="currentColor" /> Online
          </div>
        </div>

        <h1 style={{ fontSize: '3.5rem', marginBottom: '0.75rem', fontWeight: '900', lineHeight: '1.1', letterSpacing: '-0.04em' }}>
          Alikuxac<span style={{ color: 'var(--primary)' }}>.</span>
        </h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--muted-foreground)', fontWeight: '500', marginBottom: '2rem', lineHeight: '1.4' }}>
          Creative Fullstack Developer building high-performance <br /> experiences on the Edge.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
          <Link href="/projects" className="original-contact-btn" style={{
            marginTop: 0,
            background: 'var(--primary)',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem',
            padding: '12px 36px',
            borderRadius: '12px',
            fontSize: '1rem'
          }}>
            Explore Projects <ArrowRight size={18} />
          </Link>
          <button
            onClick={() => setShowSkills(!showSkills)}
            className="original-contact-btn"
            style={{
              marginTop: 0,
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem',
              padding: '12px 36px',
              borderRadius: '12px',
              fontSize: '1rem',
              background: showSkills ? 'var(--secondary)' : 'transparent',
              cursor: 'pointer'
            }}
          >
            {showSkills ? <><ChevronUp size={20} /> Hide Skills</> : <><BookOpen size={20} /> View Skills</>}
          </button>
        </div>
      </motion.div>

      {/* CV Skills Section (Toggleable) */}
      <AnimatePresence>
        {showSkills && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: "circOut" }}
            style={{ overflow: 'hidden', width: '100%', maxWidth: '1200px' }}
          >
            <div className="glass" style={{
              borderRadius: '24px',
              padding: '2rem',
              marginTop: '0.5rem',
              border: '1px solid var(--glass-border)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{
                  padding: '8px 20px',
                  borderRadius: '50px',
                  border: '2px solid var(--primary)',
                  color: 'var(--primary)',
                  fontWeight: '800',
                  letterSpacing: '0.1em',
                  fontSize: '0.8rem'
                }}>
                  SKILLS PROFILE
                </div>
                <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, var(--primary), transparent)', opacity: 0.2 }} />
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '2rem'
              }}>
                {skillGroups.map((group, idx) => (
                  <div key={idx}>
                    <h4 style={{
                      fontSize: '1rem',
                      marginBottom: '1rem',
                      color: 'var(--primary)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      <Target size={18} /> {group.category}
                    </h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {group.items.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          style={{
                            padding: '6px 12px',
                            background: 'var(--secondary)',
                            borderRadius: '8px',
                            fontSize: '0.85rem',
                            fontWeight: '600',
                            color: 'var(--foreground)',
                            border: '1px solid var(--border)'
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
