import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu as MenuIcon, X } from 'lucide-react';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/90 backdrop-blur-md shadow-lg' : 'bg-white/50 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 sm:h-20">
          <div className="flex items-center">
            <Link 
              to="/" 
              className="flex items-center space-x-3 group"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className={`w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center transform transition-all duration-500 ${
                isScrolled ? 'rotate-0 scale-100' : 'group-hover:rotate-6 group-hover:scale-110'
              }`}>
                <span className="text-xl font-bold text-white">V</span>
              </div>
              <span className={`text-2xl sm:text-3xl font-serif font-bold transition-all duration-300 ${
                isScrolled 
                  ? 'bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent'
                  : 'text-orange-600'
              }`}>
                Vuchada
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-1">
            <NavLink to="/menu" isScrolled={isScrolled}>Menu</NavLink>
            <NavLink to="/orders" isScrolled={isScrolled}>Pedidos</NavLink>
            <NavLink to="/reservations" isScrolled={isScrolled}>Reservas</NavLink>
            <NavLink to="/payments" isScrolled={isScrolled}>Pagamentos</NavLink>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className={`inline-flex items-center justify-center p-2 rounded-lg transition-all duration-200 ${
                isScrolled
                  ? 'text-gray-700 hover:text-orange-600 hover:bg-gray-100'
                  : 'text-gray-600 hover:text-orange-500 hover:bg-white/50'
              }`}
            >
              <span className="sr-only">Abrir menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <MenuIcon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-500 ease-in-out ${
          isMenuOpen 
            ? 'max-h-64 opacity-100 translate-y-0'
            : 'max-h-0 opacity-0 -translate-y-4'
        } overflow-hidden`}
      >
        <div className={`px-2 pt-2 pb-3 space-y-1 ${
          isScrolled ? 'bg-white/90 backdrop-blur-md' : 'bg-white/50 backdrop-blur-sm'
        }`}>
          <MobileNavLink to="/menu" onClick={() => setIsMenuOpen(false)} isScrolled={isScrolled}>
            Menu
          </MobileNavLink>
          <MobileNavLink to="/orders" onClick={() => setIsMenuOpen(false)} isScrolled={isScrolled}>
            Pedidos
          </MobileNavLink>
          <MobileNavLink to="/reservations" onClick={() => setIsMenuOpen(false)} isScrolled={isScrolled}>
            Reservas
          </MobileNavLink>
          <MobileNavLink to="/payments" onClick={() => setIsMenuOpen(false)} isScrolled={isScrolled}>
            Pagamento
          </MobileNavLink>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ to, children, isScrolled }) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 group overflow-hidden rounded-lg ${
        isActive
          ? 'text-orange-600'
          : isScrolled
          ? 'text-gray-700 hover:text-orange-600'
          : 'text-gray-800 hover:text-orange-500'
      }`}
    >
      {/* Hover effect */}
      <span className="absolute inset-0 bg-orange-50 transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100 -z-10" />
      {children}
    </Link>
  );
}

function MobileNavLink({ to, onClick, children, isScrolled }) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`block px-3 py-2 rounded-lg text-base font-medium transition-all duration-300 ${
        isActive
          ? 'bg-orange-50 text-orange-600 transform scale-[1.02]'
          : isScrolled
          ? 'text-gray-700 hover:text-orange-600 hover:bg-gray-50'
          : 'text-gray-800 hover:text-orange-500 hover:bg-white/50'
      }`}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}

export default Navbar;