// Mock data for the restaurant system
export const mockMenuItems = [
  {
    id: '1',
    name: 'Frango Grelhado',
    description: 'Peito de frango grelhado com ervas',
    price: 450,
    category: 'Principais',
    image_url: 'https://source.unsplash.com/800x600/?grilled-chicken',
    is_special: false,
    available: true
  },
  {
    id: '2',
    name: 'Camarão ao Curry',
    description: 'Camarão preparado com curry e leite de coco',
    price: 850,
    category: 'Especiais',
    image_url: 'https://source.unsplash.com/800x600/?curry-shrimp',
    is_special: true,
    available: true
  },
  {
    id: '3',
    name: 'Salada Caesar',
    description: 'Alface romana, croutons, parmesão e molho caesar',
    price: 250,
    category: 'Entradas',
    image_url: 'https://source.unsplash.com/800x600/?caesar-salad',
    is_special: false,
    available: true
  }
];

export const mockReservations = [
  {
    id: '1',
    customer_name: 'João Silva',
    customer_email: 'joao@email.com',
    customer_phone: '84999999999',
    date: '2024-02-20',
    time: '19:00',
    guests: 2,
    status: 'pending'
  }
];

export const mockOrders = [
  {
    id: '1',
    customer_name: 'Maria Santos',
    customer_email: 'maria@email.com',
    customer_phone: '84888888888',
    total: 1300,
    status: 'pending',
    order_items: [
      {
        id: '1',
        menu_items: { name: 'Frango Grelhado' },
        quantity: 2,
        price: 900
      }
    ]
  }
];