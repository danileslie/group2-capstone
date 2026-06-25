function Footer() {
  return (
    <footer style={styles.footer}>
      <p style={styles.text}>© 2026 PeerConnect — Built for students, by students.</p>
    </footer>
  );
}

const styles = {
  footer: {
    textAlign: 'center',
    padding: '1.5rem',
    background: '#f1f3f4',
    borderTop: '1px solid #ddd',
    marginTop: 'auto',
  },
  text: { margin: 0, color: '#555', fontSize: '0.9rem' },
};

export default Footer;
