import './App.css';
import { Routes, Route } from 'react-router-dom'
import { Auth } from './components/Auth';
import { Login } from './components/Login';
import { Logout } from './components/Logout'
import { Home } from './components/Home'

function App() {
  return (
    <div>
      <Auth />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/logout' element={<Logout />} />
      </Routes>
    </div>
  );
}

export default App;
