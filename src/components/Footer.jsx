import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">Vuchada</h3>
            <p className="text-sm">
              Experiência gastronômica única com sabores tradicionais e inovação culinária.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/menu" className="text-sm hover:text-orange-500 transition-colors">
                  Menu
                </Link>
              </li>
              <li>
                <Link to="/orders" className="text-sm hover:text-orange-500 transition-colors">
                  Pedidos
                </Link>
              </li>
              <li>
                <Link to="/reservations" className="text-sm hover:text-orange-500 transition-colors">
                  Reservas
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Horário</h4>
            <ul className="space-y-2 text-sm">
              <li>Segunda - Sexta: 07h às 21h</li>
              <li>Sábado: 07h às 20h</li>
              <li>Domingo: 07h às 20h</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Contato</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <span className="mr-2">📞</span>
                (+258) 866036384
              </li>
              <li className="flex items-center">
                <span className="mr-2">✉️</span>
                saidemarrapaz@gmail.com
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} Vuchada. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;