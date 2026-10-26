'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  FileText,
  Globe,
  Layers,
  MapPin,
  Terminal,
  Target,
  ExternalLink
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface SkillGroup {
  category: string;
  items: string[];
}

export default function Home() {
  const [showSkills, setShowSkills] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const email = 'contact@alikuxac.xyz';

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      // Fallback if clipboard API is restricted
      const textarea = document.createElement('textarea');
      textarea.value = email;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  const skillGroups: SkillGroup[] = [
    { category: 'Languages', items: ['Java', 'Kotlin', 'TypeScript', 'JavaScript', 'Python', 'SQL'] },
    { category: 'Backend & Frameworks', items: ['Node.js', 'NestJS', 'Next.js', 'Netty', 'Socket.io'] },
    { category: 'Cloudflare & Edge', items: ['Cloudflare Workers', 'Pages', 'D1 Database', 'R2 Storage'] },
    { category: 'Databases & Cache', items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'SQLite'] },
    { category: 'DevOps & Tooling', items: ['Docker', 'Git / GitHub', 'Jira / Atlassian', 'Confluence', 'Drizzle ORM'] },
    { category: 'Specialized', items: ['Paper/Spigot API', 'Forge / NeoForge', 'Network Protocols', 'Fluent English'] }
  ];

  const bentoHighlights = [
    {
      icon: <Globe size={22} />,
      title: 'Edge & Cloudflare Stack',
      role: 'Low-latency distributed compute',
      desc: 'Building serverless APIs, KV/D1 databases, and edge caching with Cloudflare Workers and Pages.',
      tags: ['Workers', 'D1 SQL', 'R2 Storage', 'Pages']
    },
    {
      icon: <Terminal size={22} />,
      title: 'Backend & Systems Engineering',
      role: 'High-concurrency & protocols',
      desc: 'Architecting JVM (Java/Kotlin) and TypeScript services with Netty, WebSockets, and tiered Redis caching.',
      tags: ['TypeScript', 'Node.js', 'Java / Kotlin', 'PostgreSQL', 'Redis']
    },
    {
      icon: <Layers size={22} />,
      title: 'Architecture & Modding',
      role: 'Extensible systems & tooling',
      desc: 'Developing multi-platform mod architectures (Forge/NeoForge), custom network packets, and open-source tooling.',
      tags: ['NeoForge', 'Docker', 'CI/CD Pipelines', 'REST & RPC']
    }
  ];

  return (
    <div className="profile-card-container">
      <div className="hero-wrapper">
        {/* Main Hero Card */}
        <motion.section
          className="hero-main-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          {/* Status Indicator */}
          <div>
            <div className="status-badge" aria-label="Current status: Available for new projects">
              <span className="status-dot-wrapper" aria-hidden="true">
                <span className="status-dot-ping" />
                <span className="status-dot-solid" />
              </span>
              <span>Available for Work / Online</span>
            </div>
          </div>

          {/* Avatar */}
          <div className="hero-avatar-container">
            <div className="hero-avatar-ring">
              <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden' }}>
                <Image
                  src="/pic.png"
                  alt="Alikuxac profile avatar"
                  fill
                  priority
                  sizes="128px"
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>

          {/* Heading & Meta */}
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.75rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: '0.75rem', letterSpacing: '-0.04em' }}>
            Alikuxac<span style={{ color: 'var(--primary)' }}>.</span>
          </h1>

          <div className="hero-meta-strip">
            <span className="hero-meta-item">
              <Terminal size={16} style={{ color: 'var(--primary)' }} />
              <strong>Backend & Systems Developer</strong>
            </span>
            <span>•</span>
            <span className="hero-meta-item">
              <MapPin size={16} />
              Ho Chi Minh City, VN
            </span>
          </div>

          <p style={{
            fontSize: '1.2rem',
            color: 'var(--muted-foreground)',
            maxWidth: '680px',
            margin: '0 auto 1.5rem',
            lineHeight: 1.5,
            fontWeight: 500
          }}>
            Building resilient web APIs, real-time distributed microservices, and high-performance server architectures on Cloudflare Edge.
          </p>

          {/* Action & Social Bar */}
          <div className="hero-action-bar">
            {/* Quick Social & Contact Icons */}
            <div className="quick-social-group">
              <a
                href="https://github.com/alikuxac"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="quick-icon-btn"
                title="GitHub Profile"
                aria-label="GitHub Profile"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </a>

              <a
                href="https://linkedin.com/in/alikuxac"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="quick-icon-btn"
                title="LinkedIn Profile"
                aria-label="LinkedIn Profile"
              >
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="quick-icon-btn"
                title={copiedEmail ? 'Copied to clipboard!' : `Copy Email (${email})`}
                aria-label={copiedEmail ? 'Email address copied' : 'Copy email address'}
                style={{ position: 'relative' }}
              >
                {copiedEmail ? <Check size={18} style={{ color: '#22c55e' }} /> : <Copy size={18} />}
              </button>

              <Link
                href="/links"
                className="quick-icon-btn"
                title="All Social Links"
                aria-label="View all links"
              >
                <ExternalLink size={18} />
              </Link>
            </div>

            {/* CTAs */}
            <Link href="/projects" className="hero-btn-primary">
              Explore Projects <ArrowRight size={18} />
            </Link>

            <Link href="/cv" className="hero-btn-secondary">
              <FileText size={18} /> View CV
            </Link>

            <button
              type="button"
              onClick={() => setShowSkills(!showSkills)}
              className="hero-btn-secondary"
              aria-expanded={showSkills}
              aria-controls="skills-drawer"
            >
              {showSkills ? (
                <>
                  <ChevronUp size={18} /> Hide Stack
                </>
              ) : (
                <>
                  <BookOpen size={18} /> Inspect Stack
                </>
              )}
            </button>
          </div>
        </motion.section>

        {/* Bento Grid Highlights */}
        <div className="hero-bento-grid">
          {bentoHighlights.map((card, idx) => (
            <motion.div
              key={idx}
              className="bento-card"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 + idx * 0.1 }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <div className="bento-icon-box">{card.icon}</div>
                  <span style={{ fontSize: '0.78rem', color: 'var(--muted-foreground)', fontWeight: 600 }}>
                    {card.role}
                  </span>
                </div>
                <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem', fontWeight: 700 }}>
                  {card.title}
                </h3>
                <p style={{ fontSize: '0.925rem', color: 'var(--muted-foreground)', lineHeight: 1.5 }}>
                  {card.desc}
                </p>
              </div>

              <div className="bento-tag-list">
                {card.tags.map((tag, tIdx) => (
                  <span key={tIdx} className="bento-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Expandable Skills Drawer */}
        <AnimatePresence>
          {showSkills && (
            <motion.div
              id="skills-drawer"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              style={{ overflow: 'hidden', width: '100%' }}
            >
              <div
                className="glass"
                style={{
                  borderRadius: '24px',
                  padding: '2.25rem 2rem',
                  border: '1px solid var(--glass-border)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.75rem' }}>
                  <div
                    style={{
                      padding: '6px 16px',
                      borderRadius: '50px',
                      border: '2px solid var(--primary)',
                      color: 'var(--primary)',
                      fontWeight: 800,
                      letterSpacing: '0.08em',
                      fontSize: '0.78rem'
                    }}
                  >
                    TECHNICAL SPECTRUM
                  </div>
                  <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, var(--primary), transparent)', opacity: 0.25 }} />
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                    gap: '1.75rem'
                  }}
                >
                  {skillGroups.map((group, idx) => (
                    <div key={idx}>
                      <h4
                        style={{
                          fontSize: '0.95rem',
                          marginBottom: '0.85rem',
                          color: 'var(--primary)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          fontWeight: 700
                        }}
                      >
                        <Target size={16} /> {group.category}
                      </h4>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                        {group.items.map((skill, sIdx) => (
                          <span
                            key={sIdx}
                            style={{
                              padding: '5px 12px',
                              background: 'var(--secondary)',
                              borderRadius: '8px',
                              fontSize: '0.825rem',
                              fontWeight: 600,
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
    </div>
  );
}
