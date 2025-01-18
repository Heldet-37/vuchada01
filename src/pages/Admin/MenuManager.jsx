import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import { authFetch } from '../../services/auth';
import { useNavigate } from 'react-router-dom';

function MenuManager() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: null,
  });

  useEffect(() => {
    fetchItems();
  }, []);

  async function fetchItems() {
    try {
      const data = await authFetch('https://apireserva.up.railway.app/api/menu-items/');
      setItems(data);
    } catch (error) {
      toast.error('Erro ao carregar itens do menu');
      if (error.message === 'Sessão expirada') {
        navigate('/vuchada/login');
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const formDataObj = new FormData();
      formDataObj.append('name', formData.name);
      formDataObj.append('description', formData.description);
      formDataObj.append('price', formData.price);
      formDataObj.append('category', formData.category);
      if (formData.image) {
        formDataObj.append('image', formData.image);
      }

      const url = editingItem 
        ? `https://apireserva.up.railway.app/api/menu-editar/${editingItem.id}`
        : 'https://apireserva.up.railway.app/api/menu-adicionar/';

      await authFetch(url, {
        method: editingItem ? 'PUT' : 'POST',
        body: formDataObj
      });

      toast.success(editingItem ? 'Item atualizado' : 'Item adicionado');
      setFormData({
        name: '',
        description: '',
        price: '',
        category: '',
        image: null,
      });
      setEditingItem(null);
      fetchItems();
    } catch (error) {
      toast.error('Erro ao salvar item');
      if (error.message === 'Sessão expirada') {
        navigate('/vuchada/login');
      }
    }
  }

  async function handleDelete(id) {
    if (!confirm('Tem certeza que deseja excluir este item?')) return;

    try {
      await authFetch(`https://apireserva.up.railway.app/api/menu-deletar/${id}`, {
        method: 'DELETE'
      });

      toast.success('Item excluído');
      fetchItems();
    } catch (error) {
      toast.error('Erro ao excluir item');
      if (error.message === 'Sessão expirada') {
        navigate('/vuchada/login');
      }
    }
  }

  function handleEdit(item) {
    setEditingItem(item);
    setFormData({
      name: item.name,
      description: item.description,
      price: item.price.toString(),
      category: item.category,
      image: null,
    });
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-6">
        {/* Formulário */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">
            {editingItem ? 'Editar Item' : 'Adicionar Novo Item'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nome</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Preço</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 text-sm"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Descrição</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 text-sm"
                rows="3"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Categoria</label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Imagem</label>
                <input
                  type="file"
                  onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
                  className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
                  accept="image/*"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              {editingItem && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingItem(null);
                    setFormData({
                      name: '',
                      description: '',
                      price: '',
                      category: '',
                      image: null,
                    });
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 text-sm"
                >
                  Cancelar
                </button>
              )}
              <button
                type="submit"
                className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 text-sm"
              >
                {editingItem ? 'Atualizar' : 'Adicionar'} Item
              </button>
            </div>
          </form>
        </div>

        {/* Tabela */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">Itens do Menu</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nome
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Preço
                  </th>
                  <th className="hidden sm:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Categoria
                  </th>
                  <th className="hidden sm:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Imagem
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {items.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{item.name}</div>
                      <div className="text-sm text-gray-500">{item.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{item.price.toFixed(2)} MT</div>
                    </td>
                    <td className="hidden sm:table-cell px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{item.category}</div>
                    </td>
                    <td className="hidden sm:table-cell px-6 py-4 whitespace-nowrap">
                      {item.image && (
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="h-12 w-12 object-cover rounded-md"
                        />
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-3">
                        <button
                          onClick={() => handleEdit(item)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          <Edit className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuManager;