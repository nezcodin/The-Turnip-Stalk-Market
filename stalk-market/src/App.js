import './App.css';
import { Routes, Route } from 'react-router-dom'
import { Auth } from './components/Auth';
import { Login } from './components/Login';
import { Logout } from './components/Logout'
import { Home } from './components/Home'
import { Register } from './components/Register';

function App() {
  return (
    <div>
      <Auth />
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/logout' element={<Logout />} />
      </Routes>
    </div>
  );
}

export default App;
