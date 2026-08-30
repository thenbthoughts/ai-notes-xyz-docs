import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const DEMO_URL = 'https://demo.ai-notes.xyz';

const FeatureList = [
  {
    title: 'Chat',
    imageUrl: '/img/ai-notes-xyz-screenshot/ai-notes-chat.png',
    description: 'Ask a question. The answer comes from your notes, tasks, and events, not the public web.',
  },
  {
    title: 'Notes',
    imageUrl: '/img/ai-notes-xyz-screenshot/ai-notes-notes.png',
    description: 'Write first. AI adds tags and a short summary so you can find it later.',
  },
  {
    title: 'Tasks',
    imageUrl: '/img/ai-notes-xyz-screenshot/ai-notes-task.png',
    description: 'Move work on a board: Todo, Doing, Done. Ask chat what to do next.',
  },
  {
    title: 'Self-host',
    imageUrl: '/img/ai-notes-xyz-screenshot/ai-notes-setting.png',
    description: 'Run it on your server. Bring your own AI key (OpenRouter, Groq, Ollama, or local).',
  },
];

function Feature({ imageUrl, title, description }) {
  return (
    <div className={clsx('col col--6', styles.featureCard)}>
      <a
        href={DEMO_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.featureImageLink}
      >
        <img
          src={imageUrl}
          alt={title}
          className={styles.featureImage}
        />
      </a>
      <Heading as="h3" className={styles.featureTitle}>{title}</Heading>
      <p className={styles.featureDescription}>{description}</p>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className={styles.howItWorks}>
          <Heading as="h2" className={styles.sectionTitle}>
            How it works
          </Heading>
          <ol className={styles.steps}>
            <li>
              <strong>Write</strong> a note, task, or event.
            </li>
            <li>
              <strong>AI organizes</strong> it with tags and a short summary.
            </li>
            <li>
              <strong>Ask in Chat.</strong> It searches your data, not the public web.
            </li>
          </ol>
        </div>

        <div className={styles.featuresHeader}>
          <Heading as="h2" className={styles.sectionTitle}>
            What you get
          </Heading>
        </div>
        <div className="row">
          {FeatureList.map((props, idx) => {
            return (
              <Feature key={idx} {...props} />
            );
          })}
        </div>

        <p className={styles.alsoLine}>
          Also:{' '}
          <Link to="/docs/feature/supporting-features">calendar</Link>,{' '}
          <Link to="/docs/feature/life-events">life events</Link>,{' '}
          <Link to="/docs/feature/info-vault">info vault</Link>.
        </p>

        <div className={styles.privacyBox}>
          <p>
            Your data stays on your server. Use OpenRouter, Groq, Ollama, or a local model.
          </p>
        </div>

        <div className={styles.bottomCta}>
          <Link
            className={clsx('button button--primary button--lg', styles.bottomDemo)}
            to={DEMO_URL}
            target="_blank"
            rel="noreferrer noopener"
          >
            <span className={styles.bottomDemoText}>
              Try Demo
              <span className={styles.bottomDemoSub}>
                Username: demo / Password: demodemo
              </span>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
