import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import Heading from '@theme/Heading';
import styles from './index.module.css';

const DEMO_URL = 'https://demo.ai-notes.xyz';
const CHAT_SCREENSHOT = '/img/ai-notes-xyz-screenshot/ai-notes-chat.png';

function HomepageHeader() {
  return (
    <header
      className={clsx('hero hero--primary', styles.heroBanner)}
      style={{
        backgroundImage: 'url(/img/ai-notes-xyz-background.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className={styles.heroOverlay}></div>
      <div className={clsx('container', styles.heroContent)}>
        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <p className={styles.trustBadge}>
              <svg
                className={styles.badgeIcon}
                viewBox="0 0 24 24"
                width="16"
                height="16"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  fill="currentColor"
                  d="M12 2a5 5 0 0 1 5 5v2h1a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h1V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v2h6V7a3 3 0 0 0-3-3z"
                />
              </svg>
              Self-hosted, Bring your own AI key, Your data stays yours
            </p>
            <Heading as="h1" className={clsx('hero__title', styles.heroTitle)}>
              Your notes. Your AI. Your server.
            </Heading>
            <p className={styles.heroDescription}>
              AI Notes XYZ is a self-hosted notes and chat app. An AI agent answers from your notes, tasks, life events, and memory.
            </p>

            <ul className={styles.exampleList}>
              <li>What should I work on next?</li>
              <li>What should I buy at the store?</li>
              <li>Where did I put my passport?</li>
            </ul>

            <div className={styles.ctaBlock}>
              <div className={styles.buttons}>
                <Link
                  className={clsx('button button--lg', styles.primaryButton)}
                  to={DEMO_URL}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Try Demo
                </Link>
                <Link
                  className={clsx('button button--lg', styles.secondaryButton)}
                  to="/docs/selfhost/local-server-by-docker/overview"
                >
                  Install Now
                </Link>
              </div>
              <p className={styles.demoHint}>
                Demo login: <strong>demo</strong> / <strong>demodemo</strong>
              </p>
            </div>
          </div>

          <a
            className={styles.heroShotLink}
            href={DEMO_URL}
            target="_blank"
            rel="noreferrer noopener"
          >
            <img
              className={styles.heroShot}
              src={CHAT_SCREENSHOT}
              alt="Chat answering a question from your own tasks and notes"
            />
          </a>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  return (
    <Layout
      title="Your notes. Your AI. Your server."
      description="AI Notes XYZ is a self-hosted notes and chat app. An AI agent answers from your notes, tasks, life events, and memory."
    >
      <div className={styles.emailBar}>
        <p className={styles.emailBarText}>
          Questions or ideas? Email{' '}
          <a href="mailto:thenbthoughts@gmail.com">thenbthoughts@gmail.com</a>
        </p>
      </div>
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
