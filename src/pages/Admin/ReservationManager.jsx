import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { format } from 'date-fns';
import { reservationsApi } from '../../lib/mockApi';

function ReservationManager() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReservations();
  }, []);

  async function fetchReservations() {
    try {
      const data = await reservationsApi.getAll();
      setReservations(data);
    } catch (error) {
      toast.error('Erro ao carregar reservas');
    } finally {
      setLoading(false);
    }
  }

  async function updateReservationStatus(id, status) {
    try {
      await reservationsApi.update(id, status);
      toast.success('Status da reserva atualizado');
      fetchReservations();
    } catch (error) {
      toast.error('Erro ao atualizar status da reserva');
    }
  }

  if (loading) {
    return <div className="text-center py-8">Carregando...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
      <h2 className="text-xl font-bold mb-4">Gerenciar Reservas</h2>
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden border border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cliente
                  </th>
                  <th className="hidden sm:table-cell px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data
                  </th>
                  <th className="hidden sm:table-cell px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hora
                  </th>
                  <th className="hidden sm:table-cell px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Pessoas
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {reservations.map((reservation) => (
                  <tr key={reservation.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {reservation.customer_name}
                      </div>
                      <div className="text-sm text-gray-500">{reservation.customer_email}</div>
                      <div className="sm:hidden text-sm text-gray-500">
                        {format(new Date(reservation.date), 'dd/MM/yyyy')} - {reservation.time}
                      </div>
                      <div className="sm:hidden text-sm text-gray-500">
                        {reservation.guests} pessoas
                      </div>
                    </td>
                    <td className="hidden sm:table-cell px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {format(new Date(reservation.date), 'dd/MM/yyyy')}
                      </div>
                    </td>
                    <td className="hidden sm:table-cell px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{reservation.time}</div>
                    </td>
                    <td className="hidden sm:table-cell px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{reservation.guests}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <select
                        value={reservation.status}
                        onChange={(e) => updateReservationStatus(reservation.id, e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 text-sm"
                      >
                        <option value="pending">Pendente</option>
                        <option value="confirmed">Confirmada</option>
                        <option value="cancelled">Cancelada</option>
                      </select>
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

export default ReservationManager;