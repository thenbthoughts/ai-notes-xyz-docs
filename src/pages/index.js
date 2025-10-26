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
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">
          {siteConfig.tagline}
          <br />
          Lightweight, privacy-first note taking with AI features - self-hostable.
        </p>

        <div
          className={`${styles.buttons} ${styles.buttondiv}`}
        >
          <Link
            className="button button--primary button--lg"
            to="https://demo.ai-notes.xyz"
            target="_blank"
            rel="noreferrer noopener"
            style={{
              border: '1px solid #fff',
            }}
          >
            Live Demo
          </Link>
          <Link
            className="button button--secondary button--lg"
            to="/docs/roadmap"
            style={{
              margin: '1rem',
            }}
          >
            Features
          </Link>
          <Link
            className="button button--primary button--lg"
            to="/docs/selfhost/selfhost-docker-build"
            style={{
              border: '1px solid #fff',
            }}
          >
            Self Host
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
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
