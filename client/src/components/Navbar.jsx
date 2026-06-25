function Navbar({ currentPage, onNavigate }) {
  const links = [
    { label: 'Home', page: 'home' },
    { label: 'Study Groups', page: 'groups' },
    { label: 'Resources', page: 'resources' },
    { label: 'Schedule', page: 'schedule' },
    { label: 'AI Quiz', page: 'quiz' },
  ];

  return (
    <nav style={styles.nav}>
      <span style={styles.brand}>PeerConnect</span>
      <ul style={styles.ul}>
        {links.map(({ label, page }) => (
          <li key={page}>
            <button
              style={{
                ...styles.link,
                ...(currentPage === page ? styles.active : {}),
              }}
              onClick={() => onNavigate(page)}
            >
              {label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

const styles = {
  nav: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 2rem',
    height: '60px',
    background: '#1a73e8',
    color: '#fff',
  },
  brand: { fontSize: '1.4rem', fontWeight: 700, letterSpacing: '0.5px' },
  ul: { display: 'flex', gap: '0.5rem', listStyle: 'none', margin: 0, padding: 0 },
  link: {
    background: 'none',
    border: 'none',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '0.95rem',
    padding: '6px 12px',
    borderRadius: '4px',
  },
  active: { background: 'rgba(255,255,255,0.25)', fontWeight: 600 },
};

export default Navbar;
