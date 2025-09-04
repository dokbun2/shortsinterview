import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Sidebar } from './components/Sidebar/Sidebar';
import { MainContent } from './components/MainContent/MainContent';
import { Gallery } from './components/Gallery/Gallery';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-dark-bg">
        <Header />
        
        <Routes>
          <Route
            path="/"
            element={
              <div className="flex-1 flex overflow-hidden">
                <div className="flex-shrink-0">
                  <Sidebar />
                </div>
                <div className="flex-1">
                  <MainContent />
                </div>
              </div>
            }
          />
          <Route path="/gallery" element={<Gallery />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;