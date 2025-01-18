import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { format } from 'date-fns';
import { ordersApi } from '../../lib/mockApi';

function OrderManager() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    try {
      const data = await ordersApi.getAll();
      setOrders(data);
    } catch (error) {
      toast.error('Erro ao carregar pedidos');
    } finally {
      setLoading(false);
    }
  }

  async function updateOrderStatus(id, status) {
    try {
      await ordersApi.update(id, status);
      toast.success('Status do pedido atualizado');
      fetchOrders();
    } catch (error) {
      toast.error('Erro ao atualizar status do pedido');
    }
  }

  if (loading) {
    return <div className="text-center py-8">Carregando...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
      <h2 className="text-xl font-bold mb-4">Gerenciar Pedidos</h2>
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="border rounded-lg p-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 space-y-2 sm:space-y-0">
              <div>
                <h3 className="text-lg font-semibold">Pedido #{order.id.slice(0, 8)}</h3>
                <p className="text-sm text-gray-500">
                  {format(new Date(order.created_at || Date.now()), 'dd/MM/yyyy HH:mm')}
                </p>
                <p className="text-sm text-gray-600">{order.customer_name}</p>
                <p className="text-sm text-gray-600">{order.customer_phone}</p>
              </div>
              <select
                value={order.status}
                onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                className="w-full sm:w-auto rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 text-sm"
              >
                <option value="pending">Pendente</option>
                <option value="preparing">Preparando</option>
                <option value="ready">Pronto</option>
                <option value="delivered">Entregue</option>
                <option value="cancelled">Cancelado</option>
              </select>
            </div>

            <div className="border-t pt-4">
              <h4 className="font-semibold mb-2">Itens do Pedido:</h4>
              <div className="space-y-2">
                {order.order_items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>
                      {item.quantity}x {item.menu_items.name}
                    </span>
                    <span className="font-medium">{item.price.toFixed(2)} MT</span>
                  </div>
                ))}
              </div>
              <div className="border-t mt-4 pt-4 flex justify-between font-bold">
                <span>Total:</span>
                <span>{order.total.toFixed(2)} MT</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderManager;