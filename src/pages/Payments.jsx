import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Phone, Shield, Clock, HelpCircle, AlertCircle } from 'lucide-react';

function Payments() {
  const [selectedMethod, setSelectedMethod] = useState('');

  const handleMethodClick = (method) => {
    toast.error('Pagamentos temporariamente indisponíveis');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">Métodos de Pagamento</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Escolha seu método de pagamento preferido para uma transação segura e conveniente.
        </p>
      </div>

      {/* Maintenance Notice */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-yellow-400 mr-3" />
            <p className="text-yellow-700">
              <span className="font-medium">Atenção:</span> Os pagamentos online estão temporariamente indisponíveis. Por favor, realize o pagamento diretamente no estabelecimento.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* M-Pesa Section */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden opacity-75">
            <div className="p-6 bg-gradient-to-br from-red-500 to-red-600">
              <h2>M-pesa</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900">Como pagar com M-Pesa:</h3>
                <ol className="space-y-3 text-gray-600">
                  <li className="flex items-start space-x-3">
                    <span className="font-bold text-red-500">1.</span>
                    <span>Marque *150# no seu telefone</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="font-bold text-red-500">2.</span>
                    <span>Selecione a opção "Pagar Bens e Serviços"</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="font-bold text-red-500">3.</span>
                    <span>Digite o número do estabelecimento: <span className="font-mono bg-gray-100 px-2 py-1 rounded">846036384</span></span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="font-bold text-red-500">4.</span>
                    <span>Digite o valor e confirme o pagamento</span>
                  </li>
                </ol>
                <button
                  disabled
                  className="mt-6 w-full bg-gray-400 text-white py-3 rounded-lg cursor-not-allowed font-medium"
                >
                  Temporariamente Indisponível
                </button>
              </div>
            </div>
          </div>

          {/* E-Mola Section */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden opacity-75">
            <div className="p-6 bg-gradient-to-br from-blue-500 to-blue-600">
              <h3>E-mola</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900">Como pagar com E-Mola:</h3>
                <ol className="space-y-3 text-gray-600">
                  <li className="flex items-start space-x-3">
                    <span className="font-bold text-blue-500">1.</span>
                    <span>Marque *898# no seu telefone</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="font-bold text-blue-500">2.</span>
                    <span>Selecione a opção "Pagamentos"</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="font-bold text-blue-500">3.</span>
                    <span>Digite o número do estabelecimento: <span className="font-mono bg-gray-100 px-2 py-1 rounded">866036384</span></span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="font-bold text-blue-500">4.</span>
                    <span>Digite o valor e confirme o pagamento</span>
                  </li>
                </ol>
                <button
                  disabled
                  className="mt-6 w-full bg-gray-400 text-white py-3 rounded-lg cursor-not-allowed font-medium"
                >
                  Temporariamente Indisponível
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full mb-4">
              <Phone className="h-6 w-6 text-orange-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Suporte 24/7</h3>
            <p className="text-gray-600 text-sm">
              Nossa equipe está disponível 24 horas por dia para ajudar com suas transações.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full mb-4">
              <Shield className="h-6 w-6 text-orange-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">100% Seguro</h3>
            <p className="text-gray-600 text-sm">
              Todas as transações são protegidas e criptografadas.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full mb-4">
              <Clock className="h-6 w-6 text-orange-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Instantâneo</h3>
            <p className="text-gray-600 text-sm">
              Pagamentos processados instantaneamente após a confirmação.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full mb-4">
              <HelpCircle className="h-6 w-6 text-orange-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Ajuda</h3>
            <p className="text-gray-600 text-sm">
              Dúvidas? Entre em contato com nosso suporte: <span className="font-medium">84 123 4567</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payments;
