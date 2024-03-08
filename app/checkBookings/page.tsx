"use client"; 

import { useEffect, useState } from 'react';
import { db } from '../firebaseConfig'; 
import { collection, getDocs, getDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

const CheckBookings = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchBookings = async () => {
      const snapshot = await getDocs(collection(db, 'bookings'));
      const bookingsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBookings(bookingsData);
    };

    fetchBookings();
  }, []);


  
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">All Bookings</h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Booking ID</th>
            <th scope="col">User Email</th>
            <th scope="col">Place</th>
            <th scope="col">Start Date</th>
            <th scope="col">Nights</th>
            <th scope="col">Rooms</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.length > 0 ? (
            bookings.map(booking => (
              <tr key={booking.id}>
                <td>{booking.id}</td>
                <td>{booking.email}</td>
                <td>{booking.place}</td>
                <td>{booking.date}</td>
                <td>{booking.nights}</td>
                <td>{booking.numberOfRooms}</td>
                <td>
                  <button 
                    className="btn btn-danger me-2"
                    onClick={() => handleDelete(booking.id, booking.bookingPlaceId, booking.nights, booking.bookingDates)}
                  >
                    Delete
                  </button>
                  <button 
                    className="btn btn-warning"
                    onClick={() => router.push(`/editBooking/${booking.id}`)}
                  >
                    Edit Booking
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="text-center">No bookings found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CheckBookings;
