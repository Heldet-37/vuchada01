import { useEffect, useState } from 'react';

function LoadingScreen({ pageTitle }) {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const duration = 4000; // 4 segundos
    const interval = 20; // Atualiza a cada 20ms para animação mais suave
    const steps = duration / interval;
    const increment = 100 / steps;
    
    let currentProgress = 0;
    const timer = setInterval(() => {
      currentProgress += increment;
      if (currentProgress >= 100) {
        clearInterval(timer);
        currentProgress = 100;
        setTimeout(() => setFadeOut(true), 200);
      }
      setProgress(currentProgress);
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={`fixed inset-0 bg-white z-50 flex flex-col items-center justify-center transition-opacity duration-500 ${
      fadeOut ? 'opacity-0' : 'opacity-100'
    }`}>
      {/* Logo animado */}
      <div className="relative mb-8">
        <div className="w-24 h-24 bg-orange-600 rounded-2xl flex items-center justify-center transform transition-all duration-300 animate-bounce">
          <span className="text-4xl font-bold text-white">V</span>
        </div>
        {/* Efeito de pulso */}
        <div className="absolute inset-0 bg-orange-600 rounded-2xl animate-ping opacity-20"></div>
      </div>
      
      {/* Barra de progresso */}
      <div className="w-64 sm:w-80 bg-gray-100 rounded-full h-1.5 mb-4 overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-orange-500 to-orange-600 transition-all duration-300 ease-out"
          style={{ 
            width: `${progress}%`,
            boxShadow: '0 0 10px rgba(234, 88, 12, 0.5)'
          }}
        />
      </div>
      
      {/* Texto */}
      <div className="text-center">
        <h1 className="text-3xl font-serif font-bold text-orange-600 mb-2 animate-pulse">
          {pageTitle}
        </h1>
        <p className="text-gray-600">
          {progress < 100 ? 'Carregando...' : 'Bem-vindo!'}
        </p>
      </div>
    </div>
  );
}

export default LoadingScreen;