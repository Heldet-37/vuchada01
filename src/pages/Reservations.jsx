import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { reservationsApi } from '../lib/mockApi';
import { Plus, Minus, Trash2, Calendar, Clock, Users } from 'lucide-react';

function Reservations() {
  const [menuItems, setMenuItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    date: '',
    time: '',
    guests: 1,
  });
  const [loading, setLoading] = useState(true);

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

  // Função para calcular o total dos itens selecionados
  const calculateTotal = () => {
    return selectedItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Função para calcular o subtotal de um item
  const calculateItemSubtotal = (item) => {
    return item.price * item.quantity;
  };

  function addMenuItem(itemId) {
    const item = menuItems.find(item => item.id === parseInt(itemId));
    if (!item) return;

    const existingItem = selectedItems.find(selected => selected.id === item.id);
    if (existingItem) {
      const newQuantity = existingItem.quantity + 1;
      setSelectedItems(selectedItems.map(selected =>
        selected.id === item.id
          ? { ...selected, quantity: newQuantity }
          : selected
      ));
      toast.success(`${item.name} (${newQuantity}x) - Total: ${(item.price * newQuantity).toFixed(2)} MT`);
    } else {
      setSelectedItems([...selectedItems, { ...item, quantity: 1 }]);
      toast.success(`${item.name} adicionado - ${item.price.toFixed(2)} MT`);
    }
  }

  function updateItemQuantity(itemId, newQuantity) {
    if (newQuantity < 1) {
      removeMenuItem(itemId);
      return;
    }

    const item = selectedItems.find(item => item.id === itemId);
    const newSubtotal = item.price * newQuantity;

    setSelectedItems(selectedItems.map(currentItem =>
      currentItem.id === itemId
        ? { ...currentItem, quantity: newQuantity }
        : currentItem
    ));

    toast.success(`${item.name} (${newQuantity}x) - Total: ${newSubtotal.toFixed(2)} MT`);
  }

  function removeMenuItem(itemId) {
    const item = selectedItems.find(item => item.id === itemId);
    setSelectedItems(selectedItems.filter(item => item.id !== itemId));
    toast.success(`${item.name} removido da reserva`);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    toast.error('Reservas temporariamente indisponíveis');
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
        <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">Faça sua Reserva</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Reserve sua mesa e escolha seus pratos antecipadamente para uma experiência gastronômica única.
        </p>
      </div>

      {/* Notice about reservations being disabled */}
      <div className="max-w-3xl mx-auto mb-8">
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                <span className="font-medium">Atenção:</span> As reservas estão temporariamente indisponíveis. Por favor, entre em contato diretamente com o restaurante.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Dados Pessoais */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                <input
                  type="text"
                  value={formData.customer_name}
                  onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  required
                  disabled
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={formData.customer_email}
                  onChange={(e) => setFormData({ ...formData, customer_email: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  required
                  disabled
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
                <input
                  type="tel"
                  value={formData.customer_phone}
                  onChange={(e) => setFormData({ ...formData, customer_phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  required
                  disabled
                />
              </div>

              {/* Detalhes da Reserva */}
              <div className="flex items-center space-x-4">
                <Users className="h-5 w-5 text-gray-400" />
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Número de Pessoas
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value) })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    required
                    disabled
                  />
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Calendar className="h-5 w-5 text-gray-400" />
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Data</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    required
                    disabled
                  />
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Clock className="h-5 w-5 text-gray-400" />
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Hora</label>
                  <input
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    required
                    disabled
                  />
                </div>
              </div>
            </div>

            {/* Seleção de Pratos */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Adicionar Pratos à Reserva
              </label>
              <div className="flex gap-2">
                <select
                  className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-gray-100 cursor-not-allowed"
                  onChange={(e) => addMenuItem(e.target.value)}
                  value=""
                  disabled
                >
                  <option value="">Selecione um prato</option>
                  {menuItems.map(item => (
                    <option key={item.id} value={item.id}>
                      {item.name} - {item.price.toFixed(2)} MT
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-gray-400 text-white py-3 rounded-lg font-medium cursor-not-allowed"
                disabled
              >
                Reservas temporariamente indisponíveis
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Reservations;