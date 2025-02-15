import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookings } from "../redux/actions/bookingActions"; // استيراد الأكشن

const BookingsList = () => {
  const dispatch = useDispatch();
  const { bookings, loading, error } = useSelector((state) => state.bookings);

  useEffect(() => {
    dispatch(fetchBookings());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Bookings</h2>
      <ul>
        {bookings &&
          Object.keys(bookings).map((key) => (
            <li key={key}>
              <h3>{bookings[key].name}</h3>
              <p>Email: {bookings[key].email}</p>
              <p>Contact: {bookings[key].contactNumber}</p>
              <p>End Date: {bookings[key].endDate}</p>
              <p>Gender: {bookings[key].gender}</p>
              <p>Document: {bookings[key].clearanceDocument}</p>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default BookingsList;
