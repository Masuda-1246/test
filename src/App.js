import React from 'react';
import Home from './pages/Home';
import SignUp from './pages/SingUp';
import Login from './pages/Login';
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SelfAsDoshishaStudent from './pages/SelfAsDoshishaStudent'
import SelfManagement from './pages/SelfManagement'

function App() {
  return (
    <AuthProvider>
      <div style={{ margin: '2em' }}>
        <BrowserRouter >
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/SelfAsDoshishaStudent" element={<SelfAsDoshishaStudent />} />
            <Route path="/SelfManagement" element={<SelfManagement />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

export default App;