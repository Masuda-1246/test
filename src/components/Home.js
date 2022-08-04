import { auth } from '../firebase';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import React, {useEffect, useState} from 'react';
import { db } from '../firebase'
import {collection, query, where, getDocs} from 'firebase/firestore'

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const usersRef = collection(db, "users");
    getDocs(query(usersRef, where("email", "==", user.email))).then(snapshot => {
      snapshot.forEach(doc => {
        console.log(doc.id);
        console.log(doc.data().name);
        setUsers(doc.data().name)
      })
    })
  })
  
  const handleLogout = () => {
    auth.signOut();
    navigate('/login');
  };

  if (!user) {
    return <Navigate to="/login" />;
  } else {
    return (
      <div>
        <h1>ホームページ</h1>
        <h2>ようこそ {users} さん</h2>
        <button onClick={handleLogout}>ログアウト</button>
      </div>
    );
  }
};

export default Home;