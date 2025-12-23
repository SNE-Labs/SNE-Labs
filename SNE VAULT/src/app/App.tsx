import { useState } from 'react';
import { Navigation } from './components/sne/Navigation';
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { Products } from './pages/Products';
import { Docs } from './pages/Docs';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'dashboard' | 'products' | 'docs'>('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={setCurrentPage} />;
      case 'dashboard':
        return <Dashboard />;
      case 'products':
        return <Products />;
      case 'docs':
        return <Docs />;
      default:
        return <Home onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--sne-bg)' }}>
      <Navigation 
        variant={currentPage === 'dashboard' ? 'dashboard' : 'default'} 
        onNavigate={setCurrentPage}
      />
      <main className="pt-16">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;