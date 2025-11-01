import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Unified Dashboard',
    imageUrl: '/img/ai-notes-xyz-screenshot/ai-notes-homepage.png',
    description: (
      <>
        Your command center. See all your tasks, notes, upcoming events, and AI-powered suggestions in one beautiful view.
      </>
    ),
  },
  {
    title: 'AI Chat Assistant',
    imageUrl: '/img/ai-notes-xyz-screenshot/ai-notes-chat.png',
    description: (
      <>
        Ask natural questions and get instant answers. The AI searches through YOUR personal notes, tasks, contacts, and events—all automatically.
      </>
    ),
  },
  {
    title: 'Smart Notes',
    imageUrl: '/img/ai-notes-xyz-screenshot/ai-notes-notes.png',
    description: (
      <>
        Write your notes naturally—AI will automatically add tags, generate summaries, and let you chat with your notes or find them instantly with simple search.
      </>
    ),
  },
  {
    title: 'Visual Task Boards',
    imageUrl: '/img/ai-notes-xyz-screenshot/ai-notes-task.png',
    description: (
      <>
        Kanban-style boards (Todo → Doing → Done). Drag and drop tasks, set priorities, and even generate tasks with AI assistance.
      </>
    ),
  },
  {
    title: 'Life Events Tracker',
    imageUrl: '/img/ai-notes-xyz-screenshot/ai-notes-life-events.png',
    description: (
      <>
        Never miss an important date. Track birthdays, anniversaries, milestones, and more. AI automatically categorizes and tags everything.
      </>
    ),
  },
  {
    title: 'Info Vault',
    imageUrl: '/img/ai-notes-xyz-screenshot/ai-notes-info-vault.png',
    description: (
      <>
        Your personal knowledge base. Store contacts, places, documents, and any important information. Effortlessly find what you need using search.
      </>
    ),
  },
  {
    title: 'Automated Scheduling',
    imageUrl: '/img/ai-notes-xyz-screenshot/ai-notes-task-schedule.png',
    description: (
      <>
        Create recurring tasks with daily, weekly, or monthly schedules.<br />
        You can also create email reminders to yourself that are automatically delivered to your inbox.
      </>
    ),
  }
];

function Feature({ imageUrl, title, description, idx }) {
  return (
    <div className={clsx('col col--12', styles.featureCard)} style={{ animationDelay: `${idx * 0.1}s` }}>
      <div className="text--center">
        <a
          href="https://demo.ai-notes.xyz/"
          target='_blank'
          rel="noopener noreferrer"
          className={styles.featureImageLink}
        >
          <img
            src={imageUrl}
            alt={title}
            className={styles.featureImage}
          />
        </a>
        <div className={styles.viewFullSizeWrapper}>
          <a
            href={imageUrl}
            target='_blank'
            rel='noopener noreferrer'
            className={styles.viewFullSizeButton}
          >
            <span className={styles.buttonIcon}>🔍</span>
            View Full Size
          </a>
        </div>
      </div>
      <div className={clsx('text--center padding-horiz--md', styles.featureContent)}>
        <Heading as="h3" className={styles.featureTitle}>{title}</Heading>
        <p className={styles.featureDescription}>{description}</p>
      </div>

      {FeatureList.length !== idx + 1 && (
        <div className={styles.featureDivider}>
          <div className={styles.dividerLine}></div>
        </div>
      )}
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className={styles.featuresHeader}>
          <Heading as="h2" className={styles.featuresTitle}>
            Everything You Need, All in One Place
          </Heading>
          <p className={styles.featuresSubtitle}>
            AI Notes XYZ connects your notes, tasks, contacts, and events—then helps you find anything instantly with AI-powered search.
          </p>
        </div>
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
