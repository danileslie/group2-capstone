import { useState } from 'react';

const MOCK_GROUPS = [
  { id: 1, name: 'Calculus Study Circle', subject: 'Math', members: 5, open: true },
  { id: 2, name: 'Web Dev Bootcamp', subject: 'Computer Science', members: 8, open: true },
  { id: 3, name: 'Bio 101 Review', subject: 'Biology', members: 4, open: false },
  { id: 4, name: 'History Discussion', subject: 'History', members: 6, open: true },
];

function StudyGroups() {
  const [search, setSearch] = useState('');

  const filtered = MOCK_GROUPS.filter((g) =>
    g.name.toLowerCase().includes(search.toLowerCase()) ||
    g.subject.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Study Groups</h1>
      <p style={styles.sub}>Find or create a group to study with peers.</p>

      <div style={styles.toolbar}>
        <input
          style={styles.search}
          placeholder="Search groups or subjects..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button style={styles.btn}>+ Create Group</button>
      </div>

      <div style={styles.list}>
        {filtered.length === 0 && <p style={styles.empty}>No groups found.</p>}
        {filtered.map((g) => (
          <div key={g.id} style={styles.card}>
            <div>
              <h3 style={styles.groupName}>{g.name}</h3>
              <span style={styles.subject}>{g.subject}</span>
            </div>
            <div style={styles.right}>
              <span style={styles.members}>👤 {g.members}</span>
              <button
                style={{ ...styles.joinBtn, ...(g.open ? {} : styles.joinBtnDisabled) }}
                disabled={!g.open}
              >
                {g.open ? 'Join' : 'Full'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  page: { padding: '2rem', maxWidth: '800px', margin: '0 auto' },
  title: { color: '#1a73e8', marginBottom: '0.25rem' },
  sub: { color: '#555', marginBottom: '1.5rem' },
  toolbar: { display: 'flex', gap: '1rem', marginBottom: '1.5rem' },
  search: { flex: 1, padding: '8px 12px', borderRadius: '6px', border: '1px solid #ccc', fontSize: '0.95rem' },
  btn: { background: '#1a73e8', color: '#fff', border: 'none', padding: '8px 18px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.95rem' },
  list: { display: 'flex', flexDirection: 'column', gap: '1rem' },
  card: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff', border: '1px solid #e0e0e0', borderRadius: '8px', padding: '1rem 1.25rem' },
  groupName: { margin: '0 0 4px', fontSize: '1rem' },
  subject: { fontSize: '0.85rem', color: '#888' },
  right: { display: 'flex', alignItems: 'center', gap: '1rem' },
  members: { color: '#555', fontSize: '0.9rem' },
  joinBtn: { background: '#1a73e8', color: '#fff', border: 'none', padding: '6px 16px', borderRadius: '5px', cursor: 'pointer' },
  joinBtnDisabled: { background: '#ccc', cursor: 'default' },
  empty: { color: '#888', textAlign: 'center', padding: '2rem' },
};

export default StudyGroups;
