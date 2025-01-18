import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useState, useEffect } from 'react';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Orders from './pages/Orders';
import Reservations from './pages/Reservations';
import Payments from './pages/Payments';
import Admin from './pages/Admin';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import LoadingScreen from './components/LoadingScreen';

function AppContent() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  
  // Não mostrar navbar na tela de login e no painel admin
  const hideNavbar = location.pathname === '/vuchada/login' || location.pathname.startsWith('/admin');
  
  // Não mostrar footer na tela de login e no painel admin
  const hideFooter = location.pathname === '/vuchada/login' || location.pathname.startsWith('/admin');

  // Get page title based on current route
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/menu':
        return 'Menu';
      case '/orders':
        return 'Pedidos';
      case '/reservations':
        return 'Reservas';
      case '/payments':
        return 'Pagamento';
      default:
        return 'Vuchada';
    }
  };

  useEffect(() => {
    // Mostrar loading em todas as páginas
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000); // 4 segundos de loading

    return () => clearTimeout(timer);
  }, [location.pathname]); // Re-executar quando mudar de página

  if (isLoading) {
    return <LoadingScreen pageTitle={getPageTitle()} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {!hideNavbar && <Navbar />}

      <main className="flex-grow pt-16 sm:pt-20"> {/* Added padding-top to account for fixed navbar */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/reservations" element={<Reservations />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/vuchada/login" element={<Login />} />
          <Route
            path="/admin/*"
            element={
              <PrivateRoute>
                <Admin />
              </PrivateRoute>
            }
          />
        </Routes>
      </main>

      {!hideFooter && <Footer />}

      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            style: {
              background: '#059669',
            },
          },
          error: {
            duration: 3000,
            style: {
              background: '#DC2626',
            },
          },
        }} 
      />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;