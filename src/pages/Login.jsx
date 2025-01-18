import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Loader2 } from 'lucide-react';
import { login } from '../services/auth';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    return () => {
      setIsLoading(false);
      setIsProcessing(false);
    };
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsProcessing(true);
    
    try {
      await login(formData.username, formData.password);
      
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 700));
      
      toast.success('Login realizado com sucesso!');
      navigate('/admin');
    } catch (error) {
      toast.error(error.message || 'Erro ao fazer login');
    } finally {
      setIsProcessing(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-orange-100 px-4 py-8 sm:px-6 lg:px-8">
      <div className="w-full max-w-[420px]">
        {/* Logo e Título */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-orange-600 rounded-2xl flex items-center justify-center shadow-lg transform transition-all duration-300 hover:scale-110 hover:rotate-3">
              <span className="text-3xl sm:text-4xl font-bold text-white">V</span>
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-orange-600 mb-3">
            Vuchada
          </h1>
          <h2 className="text-xl sm:text-2xl font-medium text-gray-900">
            Área Administrativa
          </h2>
        </div>

        {/* Formulário */}
        <div className="bg-white/80 backdrop-blur-sm p-6 sm:p-8 md:p-10 rounded-2xl shadow-xl">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Usuário
              </label>
              <div className="relative">
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className={`block w-full px-4 py-3.5 rounded-xl text-base border ${
                    isProcessing ? 'bg-gray-50' : 'bg-white'
                  } border-gray-300 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200`}
                  placeholder="Digite seu usuário"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  disabled={isLoading || isProcessing}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Senha
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className={`block w-full px-4 py-3.5 rounded-xl text-base border ${
                    isProcessing ? 'bg-gray-50' : 'bg-white'
                  } border-gray-300 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200`}
                  placeholder="Digite sua senha"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  disabled={isLoading || isProcessing}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || isProcessing}
              className={`relative w-full flex justify-center items-center py-3.5 px-4 border border-transparent rounded-xl text-base font-medium text-white ${
                isLoading || isProcessing
                  ? 'bg-orange-400 cursor-not-allowed'
                  : 'bg-orange-600 hover:bg-orange-700 active:bg-orange-800 transform hover:scale-[1.02] active:scale-[0.98]'
              } transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500`}
            >
              <span className="flex items-center">
                {(isLoading || isProcessing) && 
                  <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                }
                <span>
                  {isLoading ? 'Entrando...' : isProcessing ? 'Verificando...' : 'Entrar'}
                </span>
              </span>
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-gray-600">
          Área restrita apenas para administradores autorizados
        </p>
      </div>
    </div>
  );
}

export default Login;