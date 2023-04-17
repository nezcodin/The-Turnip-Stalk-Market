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
import { Profile } from './components/Profile';
import { ProfitCalculator } from './components/ProfitCalculator'
import { IndivPost } from './components/IndivPost';
import { MinimumProfit } from './components/MinimumProfit';
import { DesiredProfit } from './components/DesiredProfit';
import axios from 'axios';
import { useState, useEffect } from 'react';

function App() {

  const [username, setUsername] = useState('')
  const [island_name, setIslandName] = useState('')
  const [user_id, setUserId] = useState()
  const [user, setUser] = useState({})
  const [userEmail, setUserEmail] = useState()

  useEffect(() => {

    const getUser = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/users/${user_id}`, {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        });

        setUsername(response.data.username)
        setIslandName(response.data.island_name)
        setUserId(response.data.id)

        setUserEmail(response.data.email)

        console.log(`User ID: ${user_id}`)

        setUser(response.data)

        // console.log(user)

        // console.log(response.data)
        // console.log(`Email: ${userEmail}`)
      } catch (error) {
        console.error(error);
      }
    }
    getUser();
  }, [user_id]);

  return (
    <div className="bg-beige font-finkheavy">
      <NavBar
        username={username}
        setUsername={setUsername}
      />
      <Routes>
        <Route path='/' element={<Home username={username} />} />

        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login setUsername={setUsername} setUserId={setUserId} />} />

        <Route path='/postings' element={<Postings />} />
        <Route path='/postings/create' element={<CreatePosting username={username} island_name={island_name} user_id={user_id} email={userEmail} user={user} />} />
        <Route path='/postings/:id' element={<IndivPost />} />

        <Route path='/profile' element={<Profile user_id={user_id} />} />

        <Route path='/calculator' element={<ProfitCalculator />} />
        <Route path='/calculator/desired-profit' element={<DesiredProfit />} />
        <Route path='/calculator/minimum-profit' element={<MinimumProfit />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
