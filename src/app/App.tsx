import { useState } from 'react';
import { Navigation } from './components/sne/Navigation';
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { Products } from './pages/Products';
import { Docs } from './pages/Docs';

type Page = 'home' | 'dashboard' | 'products' | 'docs';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const handleNavigate = (page: Page | 'contracts') => {
    if (page === 'contracts') {
      // Handle contracts page if needed
      return;
    }
    setCurrentPage(page);
  };

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
        onNavigate={handleNavigate}
      />
      <main className="pt-16">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;