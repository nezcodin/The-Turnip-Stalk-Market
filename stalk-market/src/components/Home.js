import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export const Home = (props) => {
  const portraits = require.context("../assets/portraits", false);
  const portraitKeys = portraits.keys();
  const randomIndex = Math.floor(Math.random() * portraitKeys.length);
  const selectedPortrait = portraits(portraitKeys[randomIndex]);

  const [showAbout, setShowAbout] = useState(false)
  const [showWhat, setShowWhat] = useState(false)

  const handleAboutClick = () => {
    // the user can click the button over and over and the span will appear and disappear 
    setShowAbout(!showAbout);
  }

  const handleWhatClick = () => {
    setShowWhat(!showWhat)
  }

  return (
    <div>
      {props.username ? (
        <div>
          <p>Hi, {props.username}!</p>
          <img src={selectedPortrait} alt='Random portrait' className='h-62 w-52 m-4' />
        </div>
      ) : (
        <div className='p-10 flex flex-row justify-evenly'>
          <div className='bg-skyblue text-white rounded-xl w-auto p-10 flex-wrap max-w-screen-md h-92'>
            <div className='flex flex-col'>
              <h2 className='text-4xl py-2'>Welcome to The Turnip Stalk Market!</h2>
              <p className='font-motivasanslight italic py-2'>Click on the buttons to learn more about the site!</p>
            </div>
            <div className='flex justify-between'>
              <div>
                <img src={selectedPortrait} alt='Random Animal Crossing Character Portrait' className='h-62 w-52 m-8' />
              </div>
              <div className='flex flex-col items-center justify-center'>
                <button
                  onClick={handleAboutClick}
                  className='m-6 bg-vividorange text-white p-3 rounded-lg font-finkheavy text-xl w-40 hover:bg-orangehover'>
                  About the Site
                </button>
                {showAbout &&
                  <span className='bg-sienna font-motivasansmedium rounded w-72 p-6'>
                    This site is dedicated to a feature in Animal Crossing: New Horizons where players can sell turnips. This site hosts user made postings advertising turnip prices on their island that are allowing visitors to sell on their island. The purpose of this site is to make it easier to make the most profit possible on your turnips (your stalks)!
                  </span>}
                <button
                  onClick={handleWhatClick}
                  className='m-6 bg-vividorange text-white p-3 rounded-lg font-finkheavy text-xl w-56 hover:bg-orangehover'>
                  What can I do here?
                </button>
                {showWhat &&
                  <span className='bg-sienna font-motivasansmedium rounded w-72 p-6'>
                    Not sure what this site offers? Here is some of what is possible here:
                    <ul>
                      <li> 1. Browse posts made by other users advertising their island's turnip price.</li>
                      <li> 2. Have a great turnip price today? Are you wanting to open up your island to other users and share the luck? Create a post of your own advertising your island's turnip price!</li>
                      <li> 3. Calculate potential profits and minimum sell prices needed to produce profits.</li>
                    </ul>
                  </span>}
              </div>
            </div>
          </div>
          <div className='items-center flex p-10 px-48'>
            <div className='p-4 flex flex-col justify-center items-center'>
              <h2 className='text-sienna text-5xl p-8'>Get Started</h2>
              <Link to='/login'><button className='m-6 bg-vividorange text-white p-3 rounded-lg font-finkheavy text-xl w-40 hover:bg-orangehover'>Sign In</button></Link>
              <Link to='/register'><button className='m-6 bg-vividorange text-white p-3 rounded-lg font-finkheavy text-xl w-56 hover:bg-orangehover'>Create an Account</button></Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
