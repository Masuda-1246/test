import { useEffect } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, sendEmailVerification} from 'firebase/auth'
import { Link, useNavigate} from 'react-router-dom'
import { db } from '../firebase'
import {collection, getDocs, setDoc, doc, deleteDoc} from 'firebase/firestore'
import React from 'react';

const SignUp = () => {
  useEffect(() => {
    const usersCollectionRef = collection(db, 'users');
    getDocs(usersCollectionRef).then((querySnapshot) => {
      querySnapshot.docs.forEach((doc) => {
        console.log(doc.data())
      });
    })
  }, []);
  const navigate = useNavigate();
  const userDocumentRef = doc(collection(db, 'users'));
  const handleDelete = async () => {
    await deleteDoc(userDocumentRef)
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { name, email, password } = event.target.elements;
    const userData = {
      uid:userDocumentRef.id,
      name:name.value,
      email:email.value, 
      first_grader:{
        self_as_doshishaStudent_startingYear:{
          goal_of_ability_of_self_as_doshishaStudent_startingYear:"",
          evaluation_of_ability_of_self_as_doshishaStudent_endYear:"",
          ability_of_self_as_doshishaStudent_startingYear:"",
        },
        self_management_endYear:{
          goal_of_ability_of_self_management_endYear:"",
          evaluation_of_ability_of_self_management_endYear:"",
          ability_of_self_management_startingYear:"",
        },
        responsiveness_startingYear:{
          goal_of_ability_of_responsiveness_startingYear:"",
          evaluation_of_ability_of_responsiveness_endYear:"",
          ability_of_responsiveness_startingYear:"",
        },
        planning_startingYear:{
          goal_of_ability_of_planning_startingYear:"",
          evaluation_of_ability_of_planning_endYear:"",
          ability_of_planning_startingYear:"",
        },
        communication_startingYear:{
          goal_of_ability_of_communication_startingYear:"",
          evaluation_of_ability_of_communication_endYear:"",
          ability_of_communication_startingYear:"",
        }
      }
  }
    try {
      await createUserWithEmailAndPassword(auth ,email.value, password.value);
      await sendEmailVerification(auth.currentUser)
      await setDoc(userDocumentRef,userData).then((event)=>{
        console.log(event)
      }).catch((error) => {
        console.log(error)
      });
      navigate('/')
    } catch (error) {
      console.log(error.message)
    }
  };
  return (
    <div>
      <h1>ユーザ登録</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>ユーザー名</label>
          <input
            name="name"
            type="name"
            placeholder="name"
          />
        </div>
        <div>
          <label>メールアドレス</label>
          <input
            name="email"
            type="email"
            placeholder="email"
          />
        </div>
        <div>
          <label>パスワード</label>
          <input
            name="password"
            type="password"
            placeholder="password"
          />
        </div>
        <div>
          <button>登録</button>
        </div>
        <div>
          ユーザ登録済の場合は<Link to={'/login'}>こちら</Link>から
        </div>
      </form>
      <button onClick={handleDelete}>delete</button>
    </div>
  );
};

export default SignUp;