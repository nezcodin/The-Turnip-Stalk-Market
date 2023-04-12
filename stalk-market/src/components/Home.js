export const Home = () => {
  return (
    <div>

    </div>
  )
}



// import { useEffect, useState } from "react";
// import axios from "axios";

// export const Home = () => {

//   const [message, setMessage] = useState('');

//   useEffect(() => {
//     const token = localStorage.getItem('access_token');
//     if (token) {
//       axios.get('http://localhost:8000/home/', {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         }
//       })
//         .then((response) => {
//           setMessage(response.data.message);
//         })
//         .catch((error) => {
//           console.log(error);
//         });
//     } else {
//       window.location.href = '/home';
//     }
//   }, []);

//   return (
//     <div>
//       <h3>Hi! {message}</h3>
//     </div>
//   )
// }