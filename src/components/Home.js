import { auth } from '../firebase';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import React, {useEffect, useState} from 'react';
import { db } from '../firebase'
import {collection, query, where, getDocs, setDoc, doc} from 'firebase/firestore'

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [users, setUsers] = useState([]);
  const [uid, setUid] = useState([]);
  useEffect(() => {
    if(user){
      console.log("aaaaaaa")
      const usersRef = collection(db, "users");
      getDocs(query(usersRef, where("email", "==", user.email))).then(snapshot => {
        snapshot.forEach(doc => {
          console.log(doc.data());
          setUsers(doc.data().name)
          setUid(doc.id)
        })
      })
    } 
  })
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const {from, favorite_food} = event.target.elements;
    console.log(`from = ${from.value}  favorite_food = ${favorite_food.value}`)
    const cityRef = doc(collection(db, 'users'),uid);
    await setDoc(cityRef, { from: from.value, favorite_food:favorite_food.value },{merge:true});
    navigate('/')
  }
   
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
       
      
        <div>
          <h1>ログイン</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label>出身地</label>
              <input name="from" type="from" placeholder="東京" />
            </div>
            <div>
              <label>好きな食べ物</label>
              <input name="favorite_food" type="favorite_food" placeholder="ラーメン" />
            </div>
            <div>
              <button>保存</button>
            </div>
          </form>
        </div>

        <button onClick={handleLogout}>ログアウト</button>
      </div>
    );
  }
};

export default Home;