"use client";  
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth'; 
import { auth, db } from './firebaseConfig';
import { doc, getDoc } from 'firebase/firestore'; 

import { useRouter } from 'next/navigation'; 
const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();


  if (loading) {
    return <div>Loading...</div>; 
  }

  return null;
};

export default HomePage;
