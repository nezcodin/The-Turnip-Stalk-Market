// import ac_logo from '../assets/ac_logo.png'
// import { Icon } from '@iconify/react';

// export const NavBar = () => {
//   return (
//     <div className="flex justify-center p-10 mb-12 font-motivasansmedium">
//       <div className="fixed top-0 w-screen h-12 text-white rounded-2xl p-2">
//         <div className="flex flex-row justify-between bg-mintgreen rounded-2xl p-6 items-center">
//           <div className='flex justify-start cursor-pointer hover:bg-greenhover hover:rounded-3xl transition-all ease-linear p-1 duration-400'>
//             <img src={ac_logo} alt="Turnip Logo" className='h-16 w-96' />
//           </div>
//           <div className='flex justify-end space-x-10 text-4xl'>

//             <div className='relative'>
//               <div className='cursor-pointer hover:bg-greenhover hover:rounded-3xl transition-all ease-linear p-4 duration-400'>
//                 <Icon icon="solar:calculator-broken" />
//               </div>
//               <span className='bg-sienna text-white text-center rounded-xl py-2 px-4 absolute bottom-full opacity-0 whitespace-nowrap transition-all duration-200 text-sm flex items-center justify-center'>Profit Calculator</span>
//             </div>
//             <div className='relative'>
//               <div className='cursor-pointer hover:bg-greenhover hover:rounded-3xl transition-all ease-linear p-4 duration-400'>
//                 <Icon icon="healthicons:ui-user-profile-outline"></Icon>
//               </div>
//               <span className='bg-sienna text-white text-center rounded-xl py-2 px-4 absolute bottom-full opacity-0 whitespace-nowrap transition-all duration-200 text-sm flex items-center justify-center'>My Profile</span>
//             </div>
//             <div className='relative'>
//               <div className='cursor-pointer hover:bg-greenhover hover:rounded-3xl transition-all ease-linear p-4 duration-400'>
//                 <Icon icon="solar:posts-carousel-vertical-bold-duotone"></Icon>
//               </div>
//               <span className='bg-sienna text-white text-center rounded-xl py-2 px-4 absolute bottom-full opacity-0 whitespace-nowrap transition-all duration-200 text-sm flex items-center justify-center'>Postings</span>
//             </div>
//             <div className='relative'>
//               <div className='cursor-pointer hover:bg-greenhover hover:rounded-3xl transition-all ease-linear p-4 duration-400'>
//                 <Icon icon="ic:round-logout"></Icon>
//               </div>
//               <span className='bg-sienna text-white text-center rounded-xl py-2 px-4 absolute bottom-full opacity-0 whitespace-nowrap transition-all duration-200 text-sm flex items-center justify-center'>Logout</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

import ac_logo from '../assets/ac_logo.png'
import { Icon } from '@iconify/react';

export const NavBar = () => {
  return (
    <div className="flex justify-center p-4 md:p-10 mb-12 font-motivasansmedium">
      <div className="fixed top-0 w-screen h-12 text-white rounded-2xl p-2">
        <div className="flex flex-row justify-between bg-mintgreen rounded-2xl p-2 md:p-6 items-center">
          <div className='flex justify-start cursor-pointer hover:bg-greenhover hover:rounded-3xl transition-all ease-linear p-1 md:p-4 duration-400 '>
            <img src={ac_logo} alt="Turnip Logo" className='h-16 w-96 md:h-12 md:w-auto xs:h-8 xs:w-auto xxs:w-auto xxs:h-6' />
          </div>
          <div className='flex justify-end space-x-4 md:space-x-10 text-2xl md:text-4xl xxs:text-sm xxs:p-2'>

            <div className='relative'>
              <div className='cursor-pointer hover:bg-greenhover hover:rounded-3xl transition-all ease-linear p-2 md:p-4 duration-400'>
                <Icon icon="solar:calculator-broken" />
              </div>
              <span className='bg-sienna text-white text-center rounded-xl py-2 px-4 absolute top-full -left-1/2 transform -translate-x-1/2 opacity-0 whitespace-nowrap transition-all duration-200 text-sm md:text-base flex items-center justify-center'>Profit Calculator</span>
            </div>
            <div className='relative'>
              <div className='cursor-pointer hover:bg-greenhover hover:rounded-3xl transition-all ease-linear p-2 md:p-4 duration-400'>
                <Icon icon="healthicons:ui-user-profile-outline"></Icon>
              </div>
              <span className='bg-sienna text-white text-center rounded-xl py-2 px-4 absolute top-full -left-1/2 transform -translate-x-1/2 opacity-0 whitespace-nowrap transition-all duration-200 text-sm md:text-base flex items-center justify-center'>My Profile</span>
            </div>
            <div className='relative'>
              <div className='cursor-pointer hover:bg-greenhover hover:rounded-3xl transition-all ease-linear p-2 md:p-4 duration-400'>
                <Icon icon="solar:posts-carousel-vertical-bold-duotone"></Icon>
              </div>
              <span className='bg-sienna text-white text-center rounded-xl py-2 px-4 absolute top-full -left-1/2 transform -translate-x-1/2 opacity-0 whitespace-nowrap transition-all duration-200 text-sm md:text-base flex items-center justify-center'>Postings</span>
            </div>
            <div className='relative'>
              <div className='cursor-pointer hover:bg-greenhover hover:rounded-3xl transition-all ease-linear p-2 md:p-4 duration-400'>
                <Icon icon="ic:round-logout"></Icon>
              </div>
              <span className='bg-sienna text-white text-center rounded-xl py-2 px-4 absolute top-full -left-1/2 transform -translate-x-1/2 opacity-0 whitespace-nowrap transition-all duration-200 text-sm md:text-base flex items-center justify-center'>Logout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
