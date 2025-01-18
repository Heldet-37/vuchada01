import { mockMenuItems, mockReservations, mockOrders } from './mockData';

// Menu Items API
export const menuApi = {
  getAll: () => Promise.resolve(mockMenuItems),
  getSpecials: () => Promise.resolve(mockMenuItems.filter(item => item.is_special)),
  getRegular: () => Promise.resolve(mockMenuItems.filter(item => !item.is_special)),
  create: (item) => Promise.resolve({ ...item, id: Date.now().toString() }),
  update: (id, item) => Promise.resolve({ ...item, id }),
  delete: (id) => Promise.resolve({ success: true })
};

// Reservations API
export const reservationsApi = {
  getAll: () => Promise.resolve(mockReservations),
  create: (reservation) => Promise.resolve({ ...reservation, id: Date.now().toString() }),
  update: (id, status) => Promise.resolve({ id, status })
};

// Orders API
export const ordersApi = {
  getAll: () => Promise.resolve(mockOrders),
  create: (order) => Promise.resolve({ ...order, id: Date.now().toString() }),
  update: (id, status) => Promise.resolve({ id, status })
};