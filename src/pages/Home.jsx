import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

function Home() {
  const [specialDishes, setSpecialDishes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSpecialDishes();
  }, []);

  async function fetchSpecialDishes() {
    try {
      const response = await fetch('https://apireserva.up.railway.app/api/menu-items/');
      if (!response.ok) {
        throw new Error('Erro ao carregar pratos especiais');
      }
      const data = await response.json();
      
      // Ordenar por ID em ordem decrescente e pegar os 3 primeiros
      const latestThreeDishes = data
        .sort((a, b) => b.id - a.id)
        .slice(0, 3);
      
      setSpecialDishes(latestThreeDishes);
    } catch (error) {
      console.error('Erro:', error);
      toast.error('Erro ao carregar pratos especiais');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="relative h-[80vh]">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80"
            alt="Vuchada Restaurant"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-60" />
        </div>
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-3xl">
              <h1 className="text-6xl font-serif font-bold text-white mb-6">
                Bem-vindo ao Vuchada
              </h1>
              <p className="text-xl text-gray-200 mb-8">
                Uma experiência gastronômica única que combina sabores tradicionais com inovação culinária.
                Descubra o melhor da culinária em um ambiente acolhedor e sofisticado.
              </p>
              <div className="space-x-4">
                <Link
                  to="/menu"
                  className="bg-orange-600 text-white px-8 py-4 rounded-md text-lg font-medium hover:bg-orange-700 transition-colors duration-200 inline-block"
                >
                  Ver Menu
                </Link>
                <Link
                  to="/reservations"
                  className="bg-white text-orange-600 px-8 py-4 rounded-md text-lg font-medium hover:bg-gray-100 transition-colors duration-200 inline-block"
                >
                  Fazer Reserva
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="text-center">
            <div className="bg-orange-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h3 className="text-2xl font-serif font-semibold mb-4">Cardápio Exclusivo</h3>
            <p className="text-gray-600">
              Pratos únicos preparados com ingredientes selecionados e técnicas refinadas.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-orange-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-serif font-semibold mb-4">Reservas Simplificadas</h3>
            <p className="text-gray-600">
              Sistema de reservas online intuitivo para sua comodidade.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-orange-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-serif font-semibold mb-4">Pedidos Online</h3>
            <p className="text-gray-600">
              Faça seu pedido com facilidade e retire no restaurante.
            </p>
          </div>
        </div>
      </section>

      {/* Special Offers */}
      <section className="bg-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-serif font-bold text-center mb-12">Pratos Especiais</h2>
          
          {loading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {specialDishes.map((dish) => (
                <div 
                  key={dish.id} 
                  className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105"
                >
                  <img
                    src={dish.image || 'https://via.placeholder.com/400x300?text=Imagem+não+disponível'}
                    alt={dish.name}
                    className="w-full h-56 object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x300?text=Imagem+não+disponível';
                    }}
                  />
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-serif font-bold">{dish.name}</h3>
                      <span className="text-orange-600 font-semibold">
                        {dish.price.toFixed(2)} MT
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4">
                      {dish.description || 'Descrição não disponível'}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500 capitalize">
                        {dish.category || 'Categoria não especificada'}
                      </span>
                      <Link
                        to="/menu"
                        className="text-orange-600 font-medium hover:text-orange-700 flex items-center gap-1"
                      >
                        Ver mais 
                        <span aria-hidden="true">&rarr;</span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && specialDishes.length === 0 && (
            <div className="text-center text-gray-500">
              Nenhum prato especial disponível no momento.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Home;