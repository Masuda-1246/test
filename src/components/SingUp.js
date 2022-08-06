import { useEffect } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, sendEmailVerification} from 'firebase/auth'
import { Link, useNavigate} from 'react-router-dom'
import { db } from '../firebase'
import {collection, getDocs, setDoc, doc} from 'firebase/firestore'
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
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { name, email, password } = event.target.elements;
    try {
      await createUserWithEmailAndPassword(auth ,email.value, password.value);
      await sendEmailVerification(auth.currentUser)
      await setDoc(userDocumentRef, {
        name: name.value,
        email: email.value
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
    </div>
  );
};

export default SignUp;