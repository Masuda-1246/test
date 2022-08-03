import { auth } from '../firebase';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import React from 'react';
const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
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
        <h2>ようこそ {user.email} さん</h2>
        <button onClick={handleLogout}>ログアウト</button>
      </div>
    );
  }
};

export default Home;