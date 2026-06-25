import { useState } from 'react';

const MOCK_RESOURCES = [
  { id: 1, title: 'Calculus Cheat Sheet', type: 'PDF', subject: 'Math', uploadedBy: 'Alice' },
  { id: 2, title: 'JavaScript Crash Course Notes', type: 'Doc', subject: 'CS', uploadedBy: 'Bob' },
  { id: 3, title: 'Cell Biology Slides', type: 'Slides', subject: 'Biology', uploadedBy: 'Carol' },
  { id: 4, title: 'World War II Timeline', type: 'PDF', subject: 'History', uploadedBy: 'David' },
];

const TYPE_ICONS = { PDF: '📄', Doc: '📝', Slides: '📊' };

function Resources() {
  const [search, setSearch] = useState('');

  const filtered = MOCK_RESOURCES.filter((r) =>
    r.title.toLowerCase().includes(search.toLowerCase()) ||
    r.subject.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Resources</h1>
      <p style={styles.sub}>Browse and share study materials with your peers.</p>

      <div style={styles.toolbar}>
        <input
          style={styles.search}
          placeholder="Search resources..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button style={styles.btn}>+ Upload</button>
      </div>

      <div style={styles.grid}>
        {filtered.length === 0 && <p style={styles.empty}>No resources found.</p>}
        {filtered.map((r) => (
          <div key={r.id} style={styles.card}>
            <div style={styles.icon}>{TYPE_ICONS[r.type] || '📁'}</div>
            <div>
              <h3 style={styles.resourceTitle}>{r.title}</h3>
              <p style={styles.meta}>{r.type} · {r.subject} · by {r.uploadedBy}</p>
            </div>
            <button style={styles.downloadBtn}>Download</button>
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
  grid: { display: 'flex', flexDirection: 'column', gap: '1rem' },
  card: { display: 'flex', alignItems: 'center', gap: '1rem', background: '#fff', border: '1px solid #e0e0e0', borderRadius: '8px', padding: '1rem 1.25rem' },
  icon: { fontSize: '2rem' },
  resourceTitle: { margin: '0 0 4px', fontSize: '1rem' },
  meta: { margin: 0, color: '#888', fontSize: '0.85rem' },
  downloadBtn: { marginLeft: 'auto', background: 'none', border: '1px solid #1a73e8', color: '#1a73e8', padding: '6px 14px', borderRadius: '5px', cursor: 'pointer', fontSize: '0.85rem' },
  empty: { color: '#888', textAlign: 'center', padding: '2rem' },
};

export default Resources;
