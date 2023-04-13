import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import jwt_decode from 'jwt-decode';


export const Login = (props) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()




  const submit = async (e) => {
    e.preventDefault()

    axios.defaults.xsrfHeaderName = "X-CSRFToken";
    axios.defaults.xsrfCookieName = "csrftoken";

    try {
      const response = await axios.post('http://localhost:8000/api/login/', {
        email,
        password
      }, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      }
      );

      const token = response.data.jwt
      console.log(token)
      const decodedToken = jwt_decode(token)
      console.log(decodedToken)
      const username = decodedToken.username
      console.log(username)

      props.setUsername(username)

      navigate('/')

      console.log(response.data)
      return response.data;
    } catch (error) {
      console.error(error);
      console.log(error.response.data)
    }

  }

  return (
    <div class="flex justify-center items-center p-10">
      <div class="flex bg-skyblue w-96 rounded-xl text-xl justify-center items-center">
        <form onSubmit={submit} class='flex flex-col justify-center items-center font-motivasansregular'>
          <h1 class='m-6 text-white font-finkheavy text-4xl'>Sign In</h1>

          <input type="email" placeholder="Email" required
            onChange={e => setEmail(e.target.value)}
            class='m-4 w-60 rounded pl-3'
          />

          <input type="password" placeholder="Password" required
            onChange={e => setPassword(e.target.value)}
            class='m-4 w-60 rounded pl-3'
          />

          <button type="submit" class='m-6 bg-vividorange text-white p-3 rounded-lg font-finkheavy text-2xl hover:bg-orangehover'>Submit</button>
        </form>
      </div>
    </div>
  )
}