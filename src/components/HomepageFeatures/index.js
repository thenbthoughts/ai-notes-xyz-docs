import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'AI Notes Chat',
    imageUrl: '/img/ai-notes-xyz-screenshot/ai-notes-chat.png',
    description: (
      <>
        Experience intelligent AI-powered chat for brainstorming and note-taking.
      </>
    ),
  },
  {
    title: 'AI Notes Homepage',
    imageUrl: '/img/ai-notes-xyz-screenshot/ai-notes-homepage.png',
    description: (
      <>
        A clean and intuitive homepage to get you started quickly.
      </>
    ),
  },
  {
    title: 'AI Notes Memo',
    imageUrl: '/img/ai-notes-xyz-screenshot/ai-notes-memo.png',
    description: (
      <>
        Quickly capture and organize your thoughts with AI-assisted memos.
      </>
    ),
  },
  {
    title: 'AI Notes Task',
    imageUrl: '/img/ai-notes-xyz-screenshot/ai-notes-task.png',
    description: (
      <>
        Manage your tasks efficiently with AI-generated suggestions and organization.
      </>
    ),
  },
];

function Feature({imageUrl, title, description}) {
  return (
    <div className={clsx('col col--3')}>
      <div className="text--center">
        <a
          href="https://demo.ai-notes.xyz/"
          target='_blank'
        >
        <img
          src={imageUrl}
          alt={title}
          style={{
            maxWidth: '100%',
            height: 'auto',
            marginTop: '20px',
            marginBottom: '20px',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          }}
        />
        </a>
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
