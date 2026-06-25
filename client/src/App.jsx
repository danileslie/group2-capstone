import { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import StudyGroups from './pages/StudyGroups';
import Resources from './pages/Resources';
import Schedule from './pages/Schedule';
import AIQuiz from './pages/AIQuiz';

const PAGES = {
  home: Home,
  groups: StudyGroups,
  resources: Resources,
  schedule: Schedule,
  quiz: AIQuiz,
};

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const PageComponent = PAGES[currentPage] || Home;

  return (
    <div style={styles.app}>
      <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />
      <main style={styles.main}>
        <PageComponent onNavigate={setCurrentPage} />
      </main>
      <Footer />
    </div>
  );
}

const styles = {
  app: { display: 'flex', flexDirection: 'column', minHeight: '100vh', fontFamily: 'Segoe UI, sans-serif', background: '#f8f9fa' },
  main: { flex: 1 },
};

export default App;
