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
    <div class="flex justify-center items-center p-10">
      <div class="flex bg-skyblue w-96 rounded-xl text-xl justify-center items-center">
        <form onSubmit={submit} class='flex flex-col justify-center items-center font-motivasansregular'>
          <h1 class='m-6 text-white font-finkheavy text-4xl'>Create an Account</h1>

          <input placeholder="Username" required
            onChange={e => setUsername(e.target.value)}
            class='m-4 w-60 rounded pl-3'
          />

          <input type="email" placeholder="Email" required
            onChange={e => setEmail(e.target.value)}
            class='m-4 w-60 rounded pl-3'
          />

          <input type="password" placeholder="Password" required
            onChange={e => setPassword(e.target.value)}
            class='m-4 w-60 rounded pl-3'
          />

          <input placeholder="Island Name" required
            onChange={e => setIslandName(e.target.value)}
            class='m-4 w-60 rounded pl-3'
          />

          <button type="submit" class='m-6 bg-vividorange text-white p-3 rounded-lg font-finkheavy text-2xl hover:bg-orangehover'>Submit</button>
        </form>
      </div>
    </div>
    // <div className="h-96 bg-vividorange w-48 p-10">
    //   <div className="bg-lightyellow h-96 w-96 m-10">

    //   </div>
    // </div>
  )
}
