"use client";  
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; 
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth, db } from '../firebaseConfig';
import { doc, getDoc } from "firebase/firestore";

export default function LoginPage() {


  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="text-center mb-4">Login</h3>
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input 
                    type="email" 
                    className="form-control" 
                    id="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required
                  />
  
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
