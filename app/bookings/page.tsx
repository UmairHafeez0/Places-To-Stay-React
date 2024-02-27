"use client"; 

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth, db } from '../firebaseConfig';
import { collection, doc, getDocs, deleteDoc, updateDoc, getDoc } from 'firebase/firestore';


const BookingsPage: React.FC = () => {
  const [userEmail, setUserEmail] = useState<string>('');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUserEmail(user.email || '');
        const bookingsSnapshot = await getDocs(collection(db, 'bookings'));
        const userBookings = bookingsSnapshot.docs
          .map(doc => ({ id: doc.id, ...doc.data() }) as Booking)
          .filter(booking => booking.email === user.email);
        setBookings(userBookings);
      } else {
        router.push('/login');
      }
    });
    return () => unsubscribe();
  }, [router]);


  return (
    <div className="container">
      <h1>Your Bookings</h1>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Place</th>
              <th>Starting Date</th>
              <th>Nights</th>
              <th>Number of Rooms</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.id}</td>
                <td>{booking.place}</td>
                <td>{booking.startingDate}</td>
                <td>{booking.nights}</td>
                <td>{booking.numberOfRooms}</td>
                <td>
                  <button onClick={() => handleEdit(booking.id)} className="btn btn-warning">Edit</button>
                  <button onClick={() => handleDelete(booking.id, booking.bookingPlaceId, booking.nights, booking.bookingDates)} className="btn btn-danger">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BookingsPage;
