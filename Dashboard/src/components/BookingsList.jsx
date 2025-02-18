import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookings } from "../redux/actions/bookingActions"; // استيراد الأكشن

const BookingsList = () => {
  const dispatch = useDispatch();
  const { bookings, loading, error } = useSelector((state) => state.bookings);

  useEffect(() => {
    dispatch(fetchBookings());
  }, [dispatch]);

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-600">Error: {error}</p>;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Bookings</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                End Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Gender
              </th>
             
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {bookings &&
              Object.keys(bookings).map((key) => (
                <tr key={key} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {bookings[key].name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {bookings[key].email}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {bookings[key].contactNumber}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {bookings[key].endDate}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {bookings[key].gender}
                  </td>
                
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingsList;
