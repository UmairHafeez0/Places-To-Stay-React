"use client";
import { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import Link from 'next/link';

interface AvailableRooms {
  [date: string]: number;
}

interface BookingPlace {
  id: string;
  type: string;
  location: string;
  description: string;
  pricePerRoom: number;
  availableRooms: AvailableRooms;
}

const EditBookingPlace = () => {


  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Edit Booking Places</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <table className="table">
        <thead>
          <tr>
            <th>Accommodation Type</th>
            <th>Location</th>
            <th>Description</th>
            <th>Price</th>
            <th>Available Rooms</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookingPlaces.map((place) => (
            <tr key={place.id}>
              <td>{place.type}</td>
              <td>{place.location}</td>
              <td>{place.description}</td>
              <td>
                ${typeof place.pricePerRoom === 'number' ? place.pricePerRoom.toFixed(2) : place.pricePerRoom}
              </td>
              <td>
                {place.availableRooms ? Object.entries(place.availableRooms).map(([date, rooms]) => (
                  <div key={date}>{date}: {rooms} rooms</div>
                )) : 'N/A'}
              </td>
              <td>
                <Link href={`/editPlace/${place.id}`} className="btn btn-warning btn-sm">Edit</Link>
                <button className="btn btn-danger btn-sm ms-2" onClick={() => handleDelete(place.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EditBookingPlace;
