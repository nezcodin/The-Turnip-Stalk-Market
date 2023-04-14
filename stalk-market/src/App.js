import './App.css';
import './index.css'
import { Routes, Route } from 'react-router-dom'
import { Login } from './components/Login';
import { Home } from './components/Home'
import { Register } from './components/Register';
import { NavBar } from './components/NavBar';
import { Footer } from './components/Footer';
import { Postings } from './components/Postings';
import { CreatePosting } from './components/CreatePosting';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {

  const [username, setUsername] = useState('')

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/user/', {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        });

        setUsername(response.data.username)
      } catch (error) {
        console.error(error);
      }
    }
    getUser();
  }, []);

  return (
    <div className="bg-beige font-finkheavy">
      <NavBar
        username={username}
        setUsername={setUsername}
      />
      <Routes>
        <Route path='/' element={<Home username={username} />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login setUsername={setUsername} />} />
        <Route path='/postings' element={<Postings />} />
        <Route path='/postings/create' element={<CreatePosting />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
