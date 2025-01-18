import { TrendingUp, Users, ShoppingBag, Calendar, ArrowUp, ArrowDown } from 'lucide-react';

function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Painel de Controle</h1>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <span>Última atualização:</span>
          <span className="font-medium">{new Date().toLocaleTimeString()}</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 hover:shadow-md transition-all duration-300 transform hover:scale-[1.02]">
          <div className="flex items-center justify-between">
            <div className="bg-blue-50 p-3 rounded-lg">
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
            <span className="px-2.5 py-0.5 text-sm font-medium text-green-600 bg-green-50 rounded-full">
              +12%
            </span>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500">Faturamento Hoje</h3>
            <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">MT 12,426</p>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <ArrowUp className="h-4 w-4 text-green-500" />
            <span className="text-green-500 font-medium ml-1">18%</span>
            <span className="text-gray-500 ml-2">vs. ontem</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 hover:shadow-md transition-all duration-300 transform hover:scale-[1.02]">
          <div className="flex items-center justify-between">
            <div className="bg-orange-50 p-3 rounded-lg">
              <ShoppingBag className="h-6 w-6 text-orange-600" />
            </div>
            <span className="px-2.5 py-0.5 text-sm font-medium text-green-600 bg-green-50 rounded-full">
              +5%
            </span>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500">Pedidos Hoje</h3>
            <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">48</p>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <ArrowUp className="h-4 w-4 text-green-500" />
            <span className="text-green-500 font-medium ml-1">12%</span>
            <span className="text-gray-500 ml-2">vs. ontem</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 hover:shadow-md transition-all duration-300 transform hover:scale-[1.02]">
          <div className="flex items-center justify-between">
            <div className="bg-purple-50 p-3 rounded-lg">
              <Calendar className="h-6 w-6 text-purple-600" />
            </div>
            <span className="px-2.5 py-0.5 text-sm font-medium text-red-600 bg-red-50 rounded-full">
              -3%
            </span>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500">Reservas Hoje</h3>
            <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">16</p>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <ArrowDown className="h-4 w-4 text-red-500" />
            <span className="text-red-500 font-medium ml-1">8%</span>
            <span className="text-gray-500 ml-2">vs. ontem</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 hover:shadow-md transition-all duration-300 transform hover:scale-[1.02]">
          <div className="flex items-center justify-between">
            <div className="bg-pink-50 p-3 rounded-lg">
              <Users className="h-6 w-6 text-pink-600" />
            </div>
            <span className="px-2.5 py-0.5 text-sm font-medium text-green-600 bg-green-50 rounded-full">
              +2%
            </span>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500">Clientes Hoje</h3>
            <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">64</p>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <ArrowUp className="h-4 w-4 text-green-500" />
            <span className="text-green-500 font-medium ml-1">4%</span>
            <span className="text-gray-500 ml-2">vs. ontem</span>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 hover:shadow-md transition-all duration-300">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Últimos Pedidos</h2>
          <div className="space-y-4">
            {[
              { id: 1, customer: 'João Silva', items: 3, total: 'MT 156', status: 'Preparando' },
              { id: 2, customer: 'Maria Santos', items: 2, total: 'MT 98', status: 'Entregue' },
              { id: 3, customer: 'Pedro Costa', items: 4, total: 'MT 245', status: 'Pendente' },
            ].map((order) => (
              <div key={order.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                <div>
                  <h3 className="font-medium text-gray-900">{order.customer}</h3>
                  <p className="text-sm text-gray-500">{order.items} itens • {order.total}</p>
                </div>
                <span className={`mt-2 sm:mt-0 px-2.5 py-0.5 text-sm font-medium rounded-full ${
                  order.status === 'Entregue' ? 'bg-green-50 text-green-600' :
                  order.status === 'Preparando' ? 'bg-blue-50 text-blue-600' :
                  'bg-yellow-50 text-yellow-600'
                }`}>
                  {order.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 hover:shadow-md transition-all duration-300">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Próximas Reservas</h2>
          <div className="space-y-4">
            {[
              { id: 1, customer: 'Ana Oliveira', time: '12:30', guests: 4, status: 'Confirmada' },
              { id: 2, customer: 'Carlos Mendes', time: '13:00', guests: 2, status: 'Pendente' },
              { id: 3, customer: 'Lucia Santos', time: '13:30', guests: 6, status: 'Confirmada' },
            ].map((reservation) => (
              <div key={reservation.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                <div>
                  <h3 className="font-medium text-gray-900">{reservation.customer}</h3>
                  <p className="text-sm text-gray-500">{reservation.time} • {reservation.guests} pessoas</p>
                </div>
                <span className={`mt-2 sm:mt-0 px-2.5 py-0.5 text-sm font-medium rounded-full ${
                  reservation.status === 'Confirmada' ? 'bg-green-50 text-green-600' : 'bg-yellow-50 text-yellow-600'
                }`}>
                  {reservation.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;