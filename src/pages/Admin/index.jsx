import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { LogOut, Menu as MenuIcon, X, Home, Calendar, ShoppingBag, User, ChevronRight, LayoutDashboard } from 'lucide-react';
import Dashboard from './Dashboard';
import MenuManager from './MenuManager';
import ReservationManager from './ReservationManager';
import OrderManager from './OrderManager';
import Profile from './Profile';
import { logout } from '../../services/auth';

function Admin() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const [activePath, setActivePath] = useState(window.location.pathname);

  const handleLogout = async () => {
    await logout();
    navigate('/vuchada/login');
  };

  const handleNavigation = (path) => {
    setActivePath(path);
    navigate(path);
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  const menuItems = [
    { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/admin/menu', label: 'Cardápio', icon: Home },
    { path: '/admin/orders', label: 'Pedidos', icon: ShoppingBag },
    { path: '/admin/reservations', label: 'Reservas', icon: Calendar },
    { path: '/admin/profile', label: 'Perfil', icon: User },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Overlay para telas menores */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 sm:w-72 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="h-full flex flex-col">
          {/* Logo Section */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center transform transition-transform duration-300 hover:scale-110">
                <span className="text-xl font-bold text-white">V</span>
              </div>
              <h2 className="text-2xl font-serif font-bold bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
                Vuchada
              </h2>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 rounded-lg hover:bg-gray-100 lg:hidden transition-colors duration-200"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          {/* Navigation Menu */}
          <div className="flex-1 px-4 py-6 space-y-6 overflow-y-auto">
            <div className="space-y-2">
              <h3 className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Gestão
              </h3>
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activePath === item.path;
                return (
                  <button
                    key={item.path}
                    onClick={() => handleNavigation(item.path)}
                    className={`w-full flex items-center px-4 py-3 rounded-lg transition-all duration-200 group ${
                      isActive
                        ? 'bg-orange-50 text-orange-600 transform scale-[1.02]'
                        : 'text-gray-600 hover:bg-gray-50 hover:scale-[1.02]'
                    }`}
                  >
                    <Icon className={`h-5 w-5 ${isActive ? 'text-orange-600' : 'text-gray-400 group-hover:text-gray-500'}`} />
                    <span className="ml-3 font-medium">{item.label}</span>
                    <ChevronRight className={`ml-auto h-4 w-4 transition-transform ${
                      isActive ? 'text-orange-600 rotate-90' : 'text-gray-300'
                    }`} />
                  </button>
                );
              })}
            </div>

            {/* Quick Stats */}
            <div className="px-4 py-5 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl text-white transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
              <h4 className="text-sm font-semibold mb-3">Resumo do Dia</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-orange-100">Pedidos</p>
                  <p className="text-lg font-semibold">12</p>
                </div>
                <div>
                  <p className="text-xs text-orange-100">Reservas</p>
                  <p className="text-lg font-semibold">8</p>
                </div>
              </div>
            </div>
          </div>

          {/* Logout Section */}
          <div className="p-4 border-t border-gray-100">
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-4 py-3 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all duration-200 hover:scale-[1.02]"
            >
              <LogOut className="h-5 w-5" />
              <span className="ml-3 font-medium">Sair</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`lg:ml-72 transition-all duration-300 ease-in-out min-h-screen`}>
        {/* Top Bar */}
        <div className="sticky top-0 z-20 bg-white border-b border-gray-100 shadow-sm">
          <div className="flex items-center justify-between px-4 sm:px-6 py-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg hover:bg-gray-100 lg:hidden transition-all duration-200"
            >
              <MenuIcon className="h-6 w-6 text-gray-500" />
            </button>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center transform transition-all duration-300 hover:scale-110">
                <User className="h-4 w-4 text-gray-500" />
              </div>
              <span className="text-sm font-medium text-gray-700">Admin</span>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-4 sm:p-6 lg:p-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/menu" element={<MenuManager />} />
            <Route path="/reservations" element={<ReservationManager />} />
            <Route path="/orders" element={<OrderManager />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Admin;