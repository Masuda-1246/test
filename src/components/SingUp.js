import { useState, useEffect } from 'react';
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
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const userDocumentRef = doc(collection(db, 'users'));
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { name, email, password } = event.target.elements;
    try {
      await createUserWithEmailAndPassword(auth ,email.value, password.value);
      await sendEmailVerification(auth.currentUser)
      await setDoc(userDocumentRef, {
        id:userDocumentRef.id,
        name: name.value,
        email: email.value,
        from: "",
        favorite_food:""
      });

      navigate('/')
    } catch (error) {
      setError(error.message)
    }
  };
  const handleChangeName = (event) => {
    setName(event.currentTarget.value);
  };
  const handleChangeEmail = (event) => {
    setEmail(event.currentTarget.value);
  };
  const handleChangePassword = (event) => {
    setPassword(event.currentTarget.value);
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
            onChange={(event) => handleChangeName(event)}
          />
        </div>
        <div>
          <label>メールアドレス</label>
          <input
            name="email"
            type="email"
            placeholder="email"
            onChange={(event) => handleChangeEmail(event)}
          />
        </div>
        <div>
          <label>パスワード</label>
          <input
            name="password"
            type="password"
            placeholder="password"
            onChange={(event) => handleChangePassword(event)}
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