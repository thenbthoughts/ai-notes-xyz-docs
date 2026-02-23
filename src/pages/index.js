import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
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
            Your Second Brain.
          </Heading>
          <p className={clsx('hero__subtitle', styles.heroSubtitle)}>
            Notes + Tasks + AI. Private & Self-Hosted.
          </p>
          <p className={styles.heroDescription}>
            <strong>AI Notes</strong> connects everything you write, do, and remember into one intelligent workspace.
          </p>

          <div className={styles.trustBadges}>
            <span className={styles.badge}>
              <span className={styles.badgeIcon}>🧠</span>
              Remembers Everything
            </span>
            <span className={styles.badge}>
              <span className={styles.badgeIcon}>🔒</span>
              100% Private Data
            </span>
            <span className={styles.badge}>
              <span className={styles.badgeIcon}>⚡</span>
              Free & Open Source
            </span>
          </div>

          <div className={styles.scrollIndicator}>
            <span className={styles.scrollText}>See the Magic</span>
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
            <span className={styles.buttonIcon}>🎮</span>
            <span className={styles.buttonText}>
              Try Demo
              <span className={styles.buttonSubtext}>No signup needed</span>
            </span>
          </Link>
          <Link
            className={clsx('button button--secondary button--lg', styles.secondaryButton)}
            to="/docs/selfhost/selfhost-docker-build"
          >
            <span className={styles.buttonIcon}>⚡</span>
            <span className={styles.buttonText}>Install Now</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
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
