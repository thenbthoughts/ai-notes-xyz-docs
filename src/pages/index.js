import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header
      className={clsx('hero hero--primary', styles.heroBanner)}
      style={{
        backgroundImage: 'url(/img/ai-notes-xyz-background.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '85vh',
      }}
    >
      <div className={styles.heroOverlay}></div>
      <div className={clsx('container', styles.heroContent)}>
        <div className={styles.heroTextWrapper}>
          <Heading as="h1" className={clsx('hero__title', styles.heroTitle)}>
            {siteConfig.title}
          </Heading>
          <p className={clsx('hero__subtitle', styles.heroSubtitle)}>
            {siteConfig.tagline}
          </p>
          <p className={styles.heroDescription}>
            Never lose track of what matters. AI automatically connects your notes, tasks, contacts, and events. 
            <strong> Search everything instantly.</strong> Self-hosted. Private. Yours.
          </p>
          
          <div className={styles.trustBadges}>
            <span className={styles.badge}>
              <span className={styles.badgeIcon}>🤖</span>
              AI-Powered Search
            </span>
            <span className={styles.badge}>
              <span className={styles.badgeIcon}>🔒</span>
              100% Private
            </span>
            <span className={styles.badge}>
              <span className={styles.badgeIcon}>🚀</span>
              Self-Hostable
            </span>
            <span className={styles.badge}>
              <span className={styles.badgeIcon}>⚡</span>
              Fast & Simple
            </span>
          </div>
          
          <div className={styles.scrollIndicator}>
            <span className={styles.scrollText}>Scroll to explore features</span>
            <div className={styles.scrollArrow}>↓</div>
          </div>
        </div>

        <div className={`${styles.buttons} ${styles.buttondiv}`}>
          <Link
            className={clsx('button button--primary button--lg', styles.primaryButton)}
            to="https://demo.ai-notes.xyz"
            target="_blank"
            rel="noreferrer noopener"
          >
            <span className={styles.buttonIcon}>🚀</span>
            <span className={styles.buttonText}>
              Try Live Demo
              <span className={styles.buttonSubtext}>No signup • Instant access</span>
            </span>
          </Link>
          <Link
            className={clsx('button button--secondary button--lg', styles.secondaryButton)}
            to="/docs/intro"
          >
            <span className={styles.buttonIcon}>📚</span>
            <span className={styles.buttonText}>View Documentation</span>
          </Link>
          <Link
            className={clsx('button button--primary button--lg', styles.tertiaryButton)}
            to="/docs/selfhost/selfhost-docker-build"
          >
            <span className={styles.buttonIcon}>⚙️</span>
            <span className={styles.buttonText}>Self-Host Guide</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="Never lose track of what matters. AI Notes XYZ connects your notes, tasks, contacts, and events with AI-powered search. Self-hostable, private, and completely yours.">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
