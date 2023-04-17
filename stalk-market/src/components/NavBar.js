import { Link } from 'react-router-dom';
import axios from 'axios';
import ac_logo from '../assets/ac_logo.png'
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';

export const NavBar = (props) => {

  const navigate = useNavigate()

  const logout = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:8000/api/logout/',
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        },
      );
      props.setUsername('')
      navigate('/')
    } catch (error) {
      console.error(error);
    }
  };

  let menu;

  if (props.username === '') {
    menu = (
      <div className="flex justify-center p-4 md:p-10 mb-16 font-motivasansmedium bg-beige">
        <div className="fixed top-0 w-screen h-12 text-white rounded-2xl p-2 bg-beige">
          <div className="flex flex-row justify-between bg-mintgreen rounded-2xl p-2 md:p-6 items-center">
            <div className='flex justify-start cursor-pointer hover:bg-greenhover hover:rounded-3xl transition-all ease-linear p-1 md:p-4 duration-400 '>
              <Link to='/'><img src={ac_logo} alt="Turnip Logo" className='h-16 w-96 md:h-12 md:w-auto xs:h-8 xs:w-auto xxs:w-auto xxs:h-6' /></Link>
            </div>
            <div className='flex justify-end space-x-4 md:space-x-10 xxs:p-2 text-xl xs:text-xs md:text-xl xxs:text-xs'>
              <div className='cursor-pointer hover:bg-greenhover hover:rounded-3xl transition-all ease-linear p-2 md:p-4 duration-400'>
                <Link to='/login'>Sign In</Link>
              </div>
              <div className='cursor-pointer hover:bg-greenhover hover:rounded-3xl transition-all ease-linear p-2 md:p-4 duration-400'>
                <Link to='/register'>Create an Account</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    menu = (
      <div className="flex justify-center p-4 md:p-10 mb-16 font-motivasansmedium bg-beige">
        <div className="fixed top-0 w-screen h-12 text-white rounded-2xl p-2 bg-beige">
          <div className="flex flex-row justify-between bg-mintgreen rounded-2xl p-2 md:p-6 items-center">
            <div className='flex justify-start cursor-pointer hover:bg-greenhover hover:rounded-3xl transition-all ease-linear p-1 md:p-4 duration-400 '>
              <Link to='/'><img src={ac_logo} alt="Turnip Logo" className='h-16 w-96 md:h-12 md:w-auto xs:h-8 xs:w-auto xxs:w-auto xxs:h-6' /></Link>
            </div>
            <div className='flex justify-end space-x-4 md:space-x-10 text-2xl md:text-4xl xxs:text-sm xxs:p-2'>
              <div className='relative'>
                <div className='cursor-pointer hover:bg-greenhover hover:rounded-3xl transition-all ease-linear p-2 md:p-4 duration-400'>
                  <Link to='/calculator'><Icon icon="solar:calculator-broken" /></Link>
                </div>
                <span className='bg-sienna text-white text-center rounded-xl py-2 px-4 absolute top-full -left-1/2 transform -translate-x-1/2 opacity-0 whitespace-nowrap transition-all duration-200 text-sm md:text-base flex items-center justify-center'>Profit Calculator</span>
              </div>
              <div className='relative'>
                <div className='cursor-pointer hover:bg-greenhover hover:rounded-3xl transition-all ease-linear p-2 md:p-4 duration-400'>
                  <Link to='/profile'><Icon icon="healthicons:ui-user-profile-outline"></Icon></Link>
                </div>
                <span className='bg-sienna text-white text-center rounded-xl py-2 px-4 absolute top-full -left-1/2 transform -translate-x-1/2 opacity-0 whitespace-nowrap transition-all duration-200 text-sm md:text-base flex items-center justify-center'>My Profile</span>
              </div>
              <div className='relative'>
                <div className='cursor-pointer hover:bg-greenhover hover:rounded-3xl transition-all ease-linear p-2 md:p-4 duration-400'>
                  <Link to='/postings'><Icon icon="solar:posts-carousel-vertical-bold-duotone"></Icon></Link>
                </div>
                <span className='bg-sienna text-white text-center rounded-xl py-2 px-4 absolute top-full -left-1/2 transform -translate-x-1/2 opacity-0 whitespace-nowrap transition-all duration-200 text-sm md:text-base flex items-center justify-center'>Postings</span>
              </div>
              <div className='relative'>
                <div className='cursor-pointer hover:bg-greenhover hover:rounded-3xl transition-all ease-linear p-2 md:p-4 duration-400'>
                  <Link to='/'><Icon icon="ic:round-logout" onClick={logout}></Icon></Link>
                </div>
                <span className='bg-sienna text-white text-center rounded-xl py-2 px-4 absolute top-full -left-1/2 transform -translate-x-1/2 opacity-0 whitespace-nowrap transition-all duration-200 text-sm md:text-base flex items-center justify-center'>Logout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return menu;
};