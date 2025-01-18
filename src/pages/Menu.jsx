import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

function Menu() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    fetchMenuItems();
  }, []);

  async function fetchMenuItems() {
    try {
      const response = await fetch('https://apireserva.up.railway.app/api/menu-items/');
      const data = await response.json();
      setMenuItems(data);
    } catch (error) {
      toast.error('Erro ao carregar o menu');
    } finally {
      setLoading(false);
    }
  }

  const categories = ['Todos', ...new Set(menuItems.map(item => item.category))];
  const filteredItems = selectedCategory === 'all' 
    ? menuItems
    : menuItems.filter(item => item.category === selectedCategory);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">Nosso Menu</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Descubra nossa seleção de pratos preparados com ingredientes frescos e técnicas refinadas.
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex justify-center mb-12 space-x-4">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200
              ${selectedCategory === category
                ? 'bg-orange-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105"
          >
            {item.image && (
              <div className="relative h-48">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-serif font-bold">{item.name}</h3>
                <span className="text-lg font-bold text-orange-600">
                  {item.price.toFixed(2)} MT
                </span>
              </div>
              <p className="text-gray-600 mb-6">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Menu;