import './App.css';
import './index.css'
import { Routes, Route } from 'react-router-dom'
import { Auth } from './components/Auth';
import { Login } from './components/Login';
import { Logout } from './components/Logout'
import { Home } from './components/Home'
import { Register } from './components/Register';
import { NavBar } from './components/NavBar';
import { Footer } from './components/Footer';

function App() {
  return (
    <div class='bg-beige h-screen w-screen font-finkheavy'>
      <NavBar />
      {/* <Auth /> */}
      <Routes>
        <Route path='/home' element={<Home />} />
        {/* <Route path='/register' element={<Register />} /> */}
        {/* <Route path='/login' element={<Login />} />
        <Route path='/logout' element={<Logout />} /> */}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
