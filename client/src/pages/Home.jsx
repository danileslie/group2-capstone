import FeatureCard from '../components/FeatureCard';

function Home({ onNavigate }) {
  const features = [
    { icon: '👥', title: 'Study Groups', description: 'Create or join groups to study together.', page: 'groups' },
    { icon: '📚', title: 'Resources', description: 'Share and discover study materials.', page: 'resources' },
    { icon: '📅', title: 'Schedule', description: 'Plan and track your study sessions.', page: 'schedule' },
    { icon: '🤖', title: 'AI Quiz', description: 'Generate quizzes instantly with AI.', page: 'quiz' },
  ];

  return (
    <div style={styles.page}>
      <section style={styles.hero}>
        <h1 style={styles.heroTitle}>Welcome to PeerConnect</h1>
        <p style={styles.heroSub}>
          The peer study platform that helps students collaborate, share resources,
          and learn smarter together.
        </p>
        <button style={styles.cta} onClick={() => onNavigate('groups')}>
          Find a Study Group
        </button>
      </section>

      <section style={styles.features}>
        <h2 style={styles.sectionTitle}>What you can do</h2>
        <div style={styles.cards}>
          {features.map((f) => (
            <FeatureCard
              key={f.page}
              icon={f.icon}
              title={f.title}
              description={f.description}
              onClick={() => onNavigate(f.page)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

const styles = {
  page: { padding: '2rem' },
  hero: {
    textAlign: 'center',
    padding: '4rem 1rem',
    background: 'linear-gradient(135deg, #e8f0fe, #f8f9fa)',
    borderRadius: '12px',
    marginBottom: '3rem',
  },
  heroTitle: { fontSize: '2.5rem', margin: '0 0 1rem', color: '#1a73e8' },
  heroSub: { fontSize: '1.1rem', color: '#555', maxWidth: '520px', margin: '0 auto 2rem' },
  cta: {
    background: '#1a73e8',
    color: '#fff',
    border: 'none',
    padding: '12px 28px',
    fontSize: '1rem',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  features: { maxWidth: '1000px', margin: '0 auto' },
  sectionTitle: { textAlign: 'center', marginBottom: '1.5rem', color: '#333' },
  cards: { display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' },
};

export default Home;
