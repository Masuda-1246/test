import { auth } from '../firebase';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import React, {useEffect, useState} from 'react';
import { db } from '../firebase'
import {collection, query, where, getDocs} from 'firebase/firestore'
import ButtonComponents from '../components/ButtonComponents'

const lists = [
  {title:"同志社人同志社国際生としての力",name:"go",link:"SelfAsDoshishaStudent"},
  {title:"自己理解・自己管理能力",name:"go",link:"SelfManagement"},
  {title:"課題対応能力",name:"go",link:"Responsiveness"},
  {title:"キャリアプランニング能力",name:"go",link:"Plannning"},
  {title:"人間関係形成・社会形成能力",name:"go",link:"Communication"},
]

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [userData, setUserData] = useState('a');
  useEffect(() => {
    if(user){
      const usersRef = collection(db, "users");
      getDocs(query(usersRef, where("email", "==", user.email))).then(snapshot => {
        snapshot.forEach(doc => {
          setUserData(doc.data());
        })
      })
      
    } 
  },[])

  const handleSubmit = async (event) => {
    console.log(userData)
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
        

       

        <h2>ようこそ {userData.name} さん</h2>
          <div>
            {
              lists.map((list)=>
                <ButtonComponents title={list.title} name={list.name} link={list.link} key={list.link} value={userData}/>
              )
            }
          </div>
        <button onClick={handleSubmit}>show user</button>
        <button onClick={handleLogout}>ログアウト</button>
      </div>
    );
  }
};

export default Home;