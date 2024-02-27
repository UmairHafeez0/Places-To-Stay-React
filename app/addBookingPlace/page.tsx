"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { setDoc, doc } from "firebase/firestore";
import { db } from '../firebaseConfig';

const availableDates = ['1 August 2024', '2 August 2024', '3 August 2024'] as const;

type AvailableRooms = {
  [key in typeof availableDates[number]]: string;
};

const AddBookingPlace = () => {

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Add Booking Place</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="type" className="form-label">Accommodation Type</label>
          <select
            className="form-select"
            id="type"
            name="type"
            value={bookingPlace.type}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Type</option>
            <option value="Hotel">Hotel</option>
            <option value="Hostel">Hostel</option>
            <option value="Apartment">Apartment</option>
            <option value="Guest House">Guest House</option>
          </select>
        </div>
        
        <div className="mb-3">
          <label htmlFor="location" className="form-label">Location</label>
          <select
            className="form-select"
            id="location"
            name="location"
            value={bookingPlace.location}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Location</option>
            <option value="New York">New York</option>
            <option value="Los Angeles">Los Angeles</option>
            <option value="Chicago">Chicago</option>
            <option value="Miami">Miami</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Available Rooms</label>
          <ul className="list-group">
            {availableDates.map((date) => (
              <li className="list-group-item" key={date}>
                <div className="d-flex justify-content-between">
                  <span>{date}</span>
                  <input
                    type="number"
                    className="form-control w-50"
                    name={`rooms_${date}`}
                    value={bookingPlace.availableRooms[date] || ''}
                    onChange={handleInputChange}
                    placeholder="Number of rooms"
                    required
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            rows={3}
            value={bookingPlace.description}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>
        
        <div className="mb-3">
          <label htmlFor="pricePerRoom" className="form-label">Price for Single Room</label>
          <input
            type="number"
            className="form-control"
            id="pricePerRoom"
            name="pricePerRoom"
            value={bookingPlace.pricePerRoom}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <button type="submit" className="btn btn-primary">Add Booking Place</button>
      </form>
    </div>
  );
};

export default AddBookingPlace;
