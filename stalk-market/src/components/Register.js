import { useState } from "react"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const Register = () => {

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [island_name, setIslandName] = useState('')

  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post('http://localhost:8000/api/register/', {
        username,
        email,
        password,
        island_name
      }, {
        headers: { 'Content-Type': 'application/json' }
      });
      navigate('/login')
      return response.data;
    } catch (error) {
      console.error(error.response.data);
    }
  }

  return (
    <div>
      <form onSubmit={submit}>
        <h1>Create an Account</h1>

        <input placeholder="Username" required
          onChange={e => setUsername(e.target.value)}
        />

        <input type="email" placeholder="Email" required
          onChange={e => setEmail(e.target.value)}
        />

        <input type="password" placeholder="Password" required
          onChange={e => setPassword(e.target.value)}
        />

        <input placeholder="Island Name" required onChange={e => setIslandName(e.target.value)} />

        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

// import axios from 'axios';
// import { useState } from 'react';

// export const Register = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [email, setEmail] = useState('');
//   const [friendCode, setFriendCode] = useState('');
//   const [islandName, setIslandName] = useState('');

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       const response = await axios.post('localhost:8000/register/', {
//         username,
//         password,
//         email,
//         friend_code: friendCode,
//         island_name: islandName,
//       });
//       console.log(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         Username:
//         <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
//       </label>
//       <br />
//       <label>
//         Password:
//         <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
//       </label>
//       <br />
//       <label>
//         Email:
//         <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
//       </label>
//       <br />
//       <label>
//         Friend Code:
//         <input type="text" value={friendCode} onChange={(event) => setFriendCode(event.target.value)} />
//       </label>
//       <br />
//       <label>
//         Island Name:
//         <input type="text" value={islandName} onChange={(event) => setIslandName(event.target.value)} />
//       </label>
//       <br />
//       <button type="submit">Register</button>
//     </form>
//   );
// }; 
