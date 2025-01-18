import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { ShoppingCart, Plus, Minus, Trash2, X } from 'lucide-react';
import { ordersApi } from '../lib/mockApi';

function Orders() {
  const [menuItems, setMenuItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
  });
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [observations, setObservations] = useState('');

  useEffect(() => {
    fetchMenuItems();
  }, []);

  async function fetchMenuItems() {
    try {
      const response = await fetch('https://apireserva.up.railway.app/api/menu-items/');
      if (!response.ok) {
        throw new Error('Erro ao carregar menu');
      }
      const data = await response.json();
      setMenuItems(data);
    } catch (error) {
      console.error('Erro:', error);
      toast.error('Erro ao carregar menu');
    } finally {
      setLoading(false);
    }
  }

  function handleAddToCart(item) {
    setSelectedItem(item);
    setQuantity(1);
    setObservations('');
    setIsModalOpen(true);
  }

  function handleConfirmAddToCart() {
    const itemToAdd = {
      ...selectedItem,
      quantity,
      observations,
      total: selectedItem.price * quantity
    };

    const existingItem = cart.find((cartItem) => cartItem.id === selectedItem.id);
    if (existingItem) {
      setCart(
        cart.map((cartItem) =>
          cartItem.id === selectedItem.id
            ? { ...itemToAdd, quantity: cartItem.quantity + quantity }
            : cartItem
        )
      );
    } else {
      setCart([...cart, itemToAdd]);
    }

    toast.success(`${selectedItem.name} adicionado ao carrinho`);
    setIsModalOpen(false);
    setSelectedItem(null);
    setQuantity(1);
    setObservations('');
  }

  function removeFromCart(itemId) {
    const item = cart.find((cartItem) => cartItem.id === itemId);
    setCart(cart.filter((cartItem) => cartItem.id !== itemId));
    toast.success(`${item.name} removido do carrinho`);
  }

  function updateQuantity(itemId, newQuantity) {
    if (newQuantity < 1) {
      removeFromCart(itemId);
      return;
    }

    const item = cart.find((cartItem) => cartItem.id === itemId);
    const newTotal = item.price * newQuantity;

    setCart(
      cart.map((cartItem) =>
        cartItem.id === itemId
          ? { ...cartItem, quantity: newQuantity, total: newTotal }
          : cartItem
      )
    );

    toast.success(`${item.name} (${newQuantity}x) - Total: ${newTotal.toFixed(2)} MT`);
  }

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  async function handleSubmit(e) {
    e.preventDefault();
    if (cart.length === 0) {
      toast.error('Adicione itens ao carrinho');
      return;
    }

    try {
      await ordersApi.create({
        ...formData,
        total,
        items: cart.map(item => ({
          menu_item_id: item.id,
          quantity: item.quantity,
          price: item.price * item.quantity,
          observations: item.observations
        }))
      });

      toast.success('Pedido realizado com sucesso!');
      setCart([]);
      setFormData({
        customer_name: '',
        customer_email: '',
        customer_phone: '',
      });
    } catch (error) {
      toast.error('Erro ao fazer pedido');
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">Faça seu Pedido</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Escolha seus pratos favoritos e faça seu pedido online.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Menu Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-serif font-bold mb-6">Menu</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {menuItems.map((item) => (
                <div
                  key={item.id}
                  className="border rounded-lg p-4 hover:border-orange-500 transition-colors duration-200"
                >
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                  )}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">{item.name}</h3>
                      <p className="text-sm text-gray-600">{item.description}</p>
                      <p className="text-sm text-gray-500 mt-1">Categoria: {item.category}</p>
                    </div>
                    <span className="font-bold text-orange-600">{item.price.toFixed(2)} MT</span>
                  </div>
                  <button
                    onClick={() => handleAddToCart(item)}
                    disabled={!item.available}
                    className={`w-full px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors duration-200
                      ${item.available 
                        ? 'bg-orange-600 text-white hover:bg-orange-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                  >
                    <Plus className="h-5 w-5" />
                    {item.available ? 'Adicionar ao Carrinho' : 'Processando'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Cart and Checkout */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-serif font-bold">Seu Pedido</h2>
              <div className="flex items-center gap-2 text-gray-600">
                <ShoppingCart className="h-5 w-5" />
                <span>{totalItems} {totalItems === 1 ? 'item' : 'itens'}</span>
              </div>
            </div>

            {cart.length === 0 ? (
              <p className="text-gray-500 text-center py-8">Seu carrinho está vazio</p>
            ) : (
              <div className="space-y-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-start pb-4 border-b">
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-600">
                        Preço unitário: {item.price.toFixed(2)} MT
                      </p>
                      {item.observations && (
                        <p className="text-sm text-gray-500 italic">
                          Obs: {item.observations}
                        </p>
                      )}
                      <p className="text-sm font-semibold text-orange-600">
                        Subtotal: {(item.price * item.quantity).toFixed(2)} MT
                      </p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="text-gray-500 hover:text-gray-700 w-8 h-8 flex items-center justify-center rounded-full border"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="text-gray-500 hover:text-gray-700 w-8 h-8 flex items-center justify-center rounded-full border"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 ml-2"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}

                <div className="border-t pt-4">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total do Pedido:</span>
                    <span className="text-orange-600">{total.toFixed(2)} MT</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    Total de itens: {totalItems}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                    <input
                      type="text"
                      value={formData.customer_name}
                      onChange={(e) =>
                        setFormData({ ...formData, customer_name: e.target.value })
                      }
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      value={formData.customer_email}
                      onChange={(e) =>
                        setFormData({ ...formData, customer_email: e.target.value })
                      }
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
                    <input
                      type="tel"
                      value={formData.customer_phone}
                      onChange={(e) =>
                        setFormData({ ...formData, customer_phone: e.target.value })
                      }
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition-colors duration-200 font-medium flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    Finalizar Pedido
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">{selectedItem.name}</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {selectedItem.image && (
              <img
                src={selectedItem.image}
                alt={selectedItem.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
            )}

            <div className="mb-4">
              <p className="text-gray-600 mb-2">{selectedItem.description}</p>
              <p className="text-orange-600 font-semibold">
                Preço: {selectedItem.price.toFixed(2)} MT
              </p>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantidade
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="text-gray-500 hover:text-gray-700 w-8 h-8 flex items-center justify-center rounded-full border"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-8 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="text-gray-500 hover:text-gray-700 w-8 h-8 flex items-center justify-center rounded-full border"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Observações
              </label>
              <textarea
                value={observations}
                onChange={(e) => setObservations(e.target.value)}
                placeholder="Ex: Sem cebola, bem passado, etc."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                rows="3"
              />
            </div>

            <div className="flex justify-between items-center">
              <p className="font-semibold">
                Total: {(selectedItem.price * quantity).toFixed(2)} MT
              </p>
              <button
                onClick={handleConfirmAddToCart}
                className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors duration-200 flex items-center gap-2"
              >
                <ShoppingCart className="h-5 w-5" />
                Adicionar ao Carrinho
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Orders;