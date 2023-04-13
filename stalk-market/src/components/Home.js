import React from 'react';

export const Home = (props) => {
  const portraits = require.context("../assets/portraits", false);
  const portraitKeys = portraits.keys();
  const randomIndex = Math.floor(Math.random() * portraitKeys.length);
  const selectedPortrait = portraits(portraitKeys[randomIndex]);

  return (
    <div>
      {props.username ? (
        <div>
          <p>Hi, {props.username}!</p>
          <img src={selectedPortrait} alt='Random portrait' className='h-62 w-52 m-4' />
        </div>
      ) : (
        <div className='p-10'>
          <div className='bg-sienna text-white rounded-xl w-auto p-4 flex-wrap max-w-screen-md'>
            <div>
              <h2 className='text-4xl'>Welcome to The Turnip Stalk Market!</h2>
              <p className='font-motivasanslight italic'>Click on the buttons to learn more about the site!</p>
              <img src={selectedPortrait} alt='Random portrait' className='h-62 w-52 m-4' />
            </div>
            <div className='flex flex-col items-center'>
              <button className='m-6 bg-vividorange text-white p-3 rounded-lg font-finkheavy text-xl w-40 hover:bg-orangehover'>About the Site</button>
              <button className='m-6 bg-vividorange text-white p-3 rounded-lg font-finkheavy text-xl w-56 hover:bg-orangehover'>What can I do here?</button>
            </div>
          </div>
          <div>

          </div>
        </div>
      )}
    </div>
  );
};
