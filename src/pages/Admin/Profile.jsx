import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { User, Mail, Lock, Hash } from 'lucide-react';
import { authFetch } from '../../services/auth';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  // Função para buscar dados do admin
  useEffect(() => {
    async function fetchAdminData() {
      try {
        const response = await authFetch('https://apireserva.up.railway.app/api/admin/dados');
        console.log('Dados do admin:', response); // Para debug
        setFormData({
          id: response.id || '',
          username: response.username || '',
          email: response.email || '',
          password: '',
          confirmPassword: ''
        });
      } catch (error) {
        toast.error('Erro ao carregar dados do administrador');
        if (error.message === 'Sessão expirada') {
          navigate('/vuchada/login');
        }
      } finally {
        setLoadingData(false);
      }
    }

    fetchAdminData();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validação de senha
    if (isEditing && formData.password) {
      if (formData.password !== formData.confirmPassword) {
        toast.error('As senhas não coincidem');
        return;
      }
      if (formData.password.length < 6) {
        toast.error('A senha deve ter pelo menos 6 caracteres');
        return;
      }
    }

    if (!formData.id) {
      toast.error('ID do administrador não encontrado');
      return;
    }

    setLoading(true);
    
    try {
      const dataToSend = {
        username: formData.username,
        email: formData.email
      };

      // Só inclui a senha se ela foi preenchida
      if (formData.password && formData.password.length >= 6) {
        dataToSend.password = formData.password;
      }

      // console.log('Dados sendo enviados:', dataToSend); // Para debug

      const response = await authFetch(`https://apireserva.up.railway.app/api/admin-atualizar/${formData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend)
      });

      if (!response.ok) {
        throw new Error('Erro ao atualizar perfil');
      }

      toast.success('Perfil atualizado com sucesso!');
      setIsEditing(false);
      
      // Limpa as senhas após atualização
      setFormData(prev => ({
        ...prev,
        password: '',
        confirmPassword: ''
      }));

      // Recarrega os dados do admin
      const updatedData = await authFetch('https://apireserva.up.railway.app/api/admin/dados');
      setFormData(prev => ({
        ...prev,
        username: updatedData.username || '',
        email: updatedData.email || ''
      }));

    } catch (error) {
      console.error('Erro detalhado:', error);
      toast.error('Erro ao atualizar perfil');
      if (error.message === 'Sessão expirada') {
        navigate('/vuchada/login');
      }
    } finally {
      setLoading(false);
    }
  };

  if (loadingData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Perfil do Administrador</h2>
            <button
              onClick={() => {
                setIsEditing(!isEditing);
                // Limpa as senhas ao cancelar edição
                if (isEditing) {
                  setFormData(prev => ({
                    ...prev,
                    password: '',
                    confirmPassword: ''
                  }));
                }
              }}
              className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                isEditing
                  ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  : 'bg-orange-600 text-white hover:bg-orange-700'
              }`}
            >
              {isEditing ? 'Cancelar' : 'Editar Perfil'}
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <Hash className="h-6 w-6 text-gray-400" />
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">ID</label>
                  <p className="mt-1 text-gray-900">{formData.id}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <User className="h-6 w-6 text-gray-400" />
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">Nome de Usuário</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.username}
                      onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                      required
                    />
                  ) : (
                    <p className="mt-1 text-gray-900">{formData.username}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <Mail className="h-6 w-6 text-gray-400" />
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                      required
                    />
                  ) : (
                    <p className="mt-1 text-gray-900">{formData.email}</p>
                  )}
                </div>
              </div>

              {isEditing && (
                <>
                  <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <Lock className="h-6 w-6 text-gray-400" />
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700">Nova Senha</label>
                      <input
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                        placeholder="Deixe em branco para manter a senha atual"
                        minLength={6}
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <Lock className="h-6 w-6 text-gray-400" />
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700">Confirmar Nova Senha</label>
                      <input
                        type="password"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                        placeholder="Confirme a nova senha"
                        minLength={6}
                      />
                    </div>
                  </div>
                </>
              )}
            </div>

            {isEditing && (
              <div className="mt-8">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition-colors duration-200 font-medium disabled:bg-orange-300"
                >
                  {loading ? 'Salvando...' : 'Salvar Alterações'}
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;