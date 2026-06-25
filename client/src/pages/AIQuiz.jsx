import { useState } from 'react';

const SAMPLE_QUESTIONS = [
  {
    question: 'What is the derivative of x²?',
    options: ['x', '2x', 'x²', '2'],
    answer: 1,
  },
  {
    question: 'What does HTML stand for?',
    options: ['HyperText Markup Language', 'High-Level Text Machine Language', 'Hyperlink and Text Markup Language', 'HyperText Machine Language'],
    answer: 0,
  },
  {
    question: 'Which organelle is the powerhouse of the cell?',
    options: ['Nucleus', 'Ribosome', 'Mitochondria', 'Golgi apparatus'],
    answer: 2,
  },
];

function AIQuiz() {
  const [topic, setTopic] = useState('');
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const handleStart = () => {
    if (!topic.trim()) return;
    setStarted(true);
    setCurrent(0);
    setScore(0);
    setFinished(false);
    setSelected(null);
  };

  const handleSelect = (idx) => {
    if (selected !== null) return;
    setSelected(idx);
    if (idx === SAMPLE_QUESTIONS[current].answer) setScore((s) => s + 1);
  };

  const handleNext = () => {
    if (current + 1 >= SAMPLE_QUESTIONS.length) {
      setFinished(true);
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
    }
  };

  const q = SAMPLE_QUESTIONS[current];

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>AI Quiz Generator</h1>
      <p style={styles.sub}>Enter a topic and get an instant quiz generated for you.</p>

      {!started && (
        <div style={styles.startBox}>
          <input
            style={styles.input}
            placeholder="Enter a topic (e.g. Calculus, Cell Biology...)"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleStart()}
          />
          <button style={styles.btn} onClick={handleStart}>Generate Quiz</button>
        </div>
      )}

      {started && !finished && (
        <div style={styles.quizBox}>
          <p style={styles.progress}>Question {current + 1} of {SAMPLE_QUESTIONS.length}</p>
          <h2 style={styles.question}>{q.question}</h2>
          <div style={styles.options}>
            {q.options.map((opt, idx) => {
              let bg = '#fff';
              if (selected !== null) {
                if (idx === q.answer) bg = '#e6f4ea';
                else if (idx === selected) bg = '#fce8e6';
              }
              return (
                <button
                  key={idx}
                  style={{ ...styles.option, background: bg }}
                  onClick={() => handleSelect(idx)}
                >
                  {opt}
                </button>
              );
            })}
          </div>
          {selected !== null && (
            <button style={styles.nextBtn} onClick={handleNext}>
              {current + 1 < SAMPLE_QUESTIONS.length ? 'Next →' : 'See Results'}
            </button>
          )}
        </div>
      )}

      {finished && (
        <div style={styles.results}>
          <h2 style={styles.resultsTitle}>Quiz Complete!</h2>
          <p style={styles.scoreText}>You scored <strong>{score}</strong> out of <strong>{SAMPLE_QUESTIONS.length}</strong></p>
          <button style={styles.btn} onClick={() => setStarted(false)}>Try Another Topic</button>
        </div>
      )}
    </div>
  );
}

const styles = {
  page: { padding: '2rem', maxWidth: '700px', margin: '0 auto' },
  title: { color: '#1a73e8', marginBottom: '0.25rem' },
  sub: { color: '#555', marginBottom: '2rem' },
  startBox: { display: 'flex', gap: '1rem' },
  input: { flex: 1, padding: '10px 14px', borderRadius: '6px', border: '1px solid #ccc', fontSize: '1rem' },
  btn: { background: '#1a73e8', color: '#fff', border: 'none', padding: '10px 22px', borderRadius: '6px', cursor: 'pointer', fontSize: '1rem' },
  quizBox: { background: '#fff', border: '1px solid #e0e0e0', borderRadius: '10px', padding: '2rem' },
  progress: { color: '#888', fontSize: '0.85rem', marginBottom: '0.5rem' },
  question: { margin: '0 0 1.5rem', color: '#333', fontSize: '1.2rem' },
  options: { display: 'flex', flexDirection: 'column', gap: '0.75rem' },
  option: { border: '1px solid #ddd', borderRadius: '6px', padding: '12px 16px', textAlign: 'left', cursor: 'pointer', fontSize: '1rem', transition: 'background 0.2s' },
  nextBtn: { marginTop: '1.5rem', background: '#1a73e8', color: '#fff', border: 'none', padding: '10px 22px', borderRadius: '6px', cursor: 'pointer', fontSize: '1rem' },
  results: { textAlign: 'center', padding: '3rem' },
  resultsTitle: { color: '#1a73e8', marginBottom: '1rem' },
  scoreText: { fontSize: '1.2rem', marginBottom: '1.5rem', color: '#333' },
};

export default AIQuiz;
