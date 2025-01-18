export function getToken() {
    return localStorage.getItem('token');
  }
  
  export function setToken(token) {
    localStorage.setItem('token', token);
    localStorage.setItem('isAuthenticated', 'true');
  }
  
  export function removeToken() {
    localStorage.removeItem('token');
    localStorage.removeItem('isAuthenticated');
  }
  
  export function isAuthenticated() {
    return localStorage.getItem('isAuthenticated') === 'true';
  }
  
  export async function login(username, password) {
    // Criando FormData conforme esperado pela API
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
  
    try {
      const response = await fetch('https://apireserva.up.railway.app/api/login', {
        method: 'POST',
        body: formData // Enviando como FormData em vez de JSON
      });
  
      if (!response.ok) {
        if (response.status === 422) {
          throw new Error('Credenciais inválidas');
        }
        throw new Error('Erro ao fazer login');
      }
  
      const data = await response.json();
      
      if (data.access_token) {
        setToken(data.access_token); // Usando access_token em vez de token
      } else if (data.token) {
        setToken(data.token);
      } else {
        throw new Error('Token não encontrado na resposta');
      }
  
      return data;
    } catch (error) {
      removeToken();
      throw error;
    }
  }
  
  export async function logout() {
    removeToken();
  }
  
  export async function authFetch(url, options = {}) {
    const token = getToken();
    
    const defaultOptions = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        ...options.headers,
      },
    };
  
    const response = await fetch(url, { ...options, ...defaultOptions });
    
    if (!response.ok) {
      if (response.status === 401) {
        removeToken();
        throw new Error('Sessão expirada');
      }
      throw new Error('Erro na requisição');
    }
  
    return response.json();
  }