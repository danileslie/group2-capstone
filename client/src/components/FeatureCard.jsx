function FeatureCard({ icon, title, description, onClick }) {
  return (
    <div style={styles.card} onClick={onClick}>
      <div style={styles.icon}>{icon}</div>
      <h3 style={styles.title}>{title}</h3>
      <p style={styles.desc}>{description}</p>
    </div>
  );
}

const styles = {
  card: {
    background: '#fff',
    border: '1px solid #e0e0e0',
    borderRadius: '10px',
    padding: '2rem 1.5rem',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'box-shadow 0.2s',
    flex: '1 1 200px',
    maxWidth: '260px',
  },
  icon: { fontSize: '2.5rem', marginBottom: '0.75rem' },
  title: { margin: '0 0 0.5rem', fontSize: '1.1rem', color: '#1a73e8' },
  desc: { margin: 0, color: '#555', fontSize: '0.9rem', lineHeight: 1.5 },
};

export default FeatureCard;
