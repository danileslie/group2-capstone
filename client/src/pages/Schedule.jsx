import { useState } from 'react';

const MOCK_SESSIONS = [
  { id: 1, group: 'Calculus Study Circle', date: '2026-06-27', time: '3:00 PM', location: 'Library Room 2' },
  { id: 2, group: 'Web Dev Bootcamp', date: '2026-06-28', time: '5:00 PM', location: 'Online (Zoom)' },
  { id: 3, group: 'Bio 101 Review', date: '2026-06-30', time: '10:00 AM', location: 'Science Hall 105' },
];

function Schedule() {
  const [sessions] = useState(MOCK_SESSIONS);

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Schedule</h1>
      <p style={styles.sub}>View and manage your upcoming study sessions.</p>

      <div style={styles.toolbar}>
        <button style={styles.btn}>+ New Session</button>
      </div>

      {sessions.length === 0 && <p style={styles.empty}>No upcoming sessions.</p>}

      <div style={styles.list}>
        {sessions.map((s) => (
          <div key={s.id} style={styles.card}>
            <div style={styles.dateBadge}>
              <span style={styles.month}>{new Date(s.date).toLocaleString('default', { month: 'short' })}</span>
              <span style={styles.day}>{new Date(s.date).getDate()}</span>
            </div>
            <div style={styles.info}>
              <h3 style={styles.groupName}>{s.group}</h3>
              <p style={styles.detail}>🕐 {s.time} &nbsp;|&nbsp; 📍 {s.location}</p>
            </div>
            <button style={styles.cancelBtn}>Cancel</button>
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
  toolbar: { marginBottom: '1.5rem' },
  btn: { background: '#1a73e8', color: '#fff', border: 'none', padding: '8px 18px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.95rem' },
  list: { display: 'flex', flexDirection: 'column', gap: '1rem' },
  card: { display: 'flex', alignItems: 'center', gap: '1.25rem', background: '#fff', border: '1px solid #e0e0e0', borderRadius: '8px', padding: '1rem 1.25rem' },
  dateBadge: { display: 'flex', flexDirection: 'column', alignItems: 'center', background: '#e8f0fe', borderRadius: '8px', padding: '0.5rem 0.75rem', minWidth: '50px' },
  month: { fontSize: '0.75rem', color: '#1a73e8', textTransform: 'uppercase', fontWeight: 600 },
  day: { fontSize: '1.5rem', fontWeight: 700, color: '#1a73e8', lineHeight: 1 },
  info: { flex: 1 },
  groupName: { margin: '0 0 4px', fontSize: '1rem' },
  detail: { margin: 0, color: '#666', fontSize: '0.9rem' },
  cancelBtn: { background: 'none', border: '1px solid #e57373', color: '#e57373', padding: '6px 14px', borderRadius: '5px', cursor: 'pointer', fontSize: '0.85rem' },
  empty: { color: '#888', textAlign: 'center', padding: '2rem' },
};

export default Schedule;
