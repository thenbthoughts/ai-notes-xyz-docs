import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Dashboard',
    imageUrl: '/img/ai-notes-xyz-screenshot/ai-notes-homepage.png',
    description: (
      <>
        Quick access to everything. See your tasks, notes, and AI suggestions at a glance.
      </>
    ),
  },
  {
    title: 'AI Chat',
    imageUrl: '/img/ai-notes-xyz-screenshot/ai-notes-chat.png',
    description: (
      <>
        Ask anything. AI searches YOUR notes, tasks, and Info Vault automatically.
      </>
    ),
  },
  {
    title: 'Smart Notes',
    imageUrl: '/img/ai-notes-xyz-screenshot/ai-notes-notes.png',
    description: (
      <>
        Write ideas, meeting notes, reminders. AI adds tags and summaries automatically.
      </>
    ),
  },
  {
    title: 'Task Management',
    imageUrl: '/img/ai-notes-xyz-screenshot/ai-notes-task.png',
    description: (
      <>
        Kanban boards (Todo → Doing → Done). Move tasks between columns, set priorities, generate with AI.
      </>
    ),
  },
  {
    title: 'Life Events',
    imageUrl: '/img/ai-notes-xyz-screenshot/ai-notes-life-events.png',
    description: (
      <>
        Track birthdays, anniversaries, milestones. AI auto-categorizes and adds tags.
      </>
    ),
  },
  {
    title: 'Info Vault',
    imageUrl: '/img/ai-notes-xyz-screenshot/ai-notes-info-vault.png',
    description: (
      <>
        Central database for contacts, places, documents. AI searches it automatically.
      </>
    ),
  },
  {
    title: 'Task Schedule',
    imageUrl: '/img/ai-notes-xyz-screenshot/ai-notes-task-schedule.png',
    description: (
      <>
        Automated recurring tasks. Daily/weekly/monthly schedules with email reminders.
      </>
    ),
  }
];

function Feature({ imageUrl, title, description, idx }) {
  return (
    <div className={clsx('col col--12')}>
      <div className="text--center">
        <a
          href="https://demo.ai-notes.xyz/"
          target='_blank'
        >
          <img
            src={imageUrl}
            alt={title}
            style={{
              width: '600px',
              maxWidth: '100%',
              height: 'auto',
              marginTop: '20px',
              marginBottom: '20px',
              borderRadius: '10px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            }}
          />
        </a>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <a
            href={imageUrl}
            target='_blank'
            rel='noopener noreferrer'
            style={{
              display: 'block',
              width: '600px',
              maxWidth: '100%',
              marginTop: '8px',
              marginBottom: '8px',
              padding: '8px 16px',
              background: 'linear-gradient(135deg, var(--ifm-color-primary), var(--ifm-color-primary-light))',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '25px',
              fontSize: '14px',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              boxShadow: '0 4px 15px rgba(46, 133, 85, 0.3)',
              border: '2px solid transparent',
              position: 'relative',
              overflow: 'hidden',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              transform: 'translateY(0)',
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 8px 25px rgba(46, 133, 85, 0.4)';
              e.target.style.background = 'linear-gradient(135deg, var(--ifm-color-primary-dark), var(--ifm-color-primary))';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 15px rgba(46, 133, 85, 0.3)';
              e.target.style.background = 'linear-gradient(135deg, var(--ifm-color-primary), var(--ifm-color-primary-light))';
            }}
          >
            <span style={{ position: 'relative', zIndex: 1 }}>
              🔍 View Full Size
            </span>
          </a>
        </div>
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>

      {FeatureList.length !== idx + 1 && (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <div style={{
            borderBottom: '1px solid var(--ifm-color-emphasis-300)',
            marginTop: '16px',
            marginBottom: '16px',
            width: '100%',
            maxWidth: '600px',
          }}>
          </div>
        </div>
      )}
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
