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
      const decodedToken = jwt_decode(token)
      const username = decodedToken.username

      props.setUsername(username)

      navigate('/')

      return response.data;
    } catch (error) {
      console.error(error);
    }

  }

  return (
    <div>
      <form onSubmit={submit}>
        <h1>Sign In</h1>

        <input type="email" placeholder="Email" required
          onChange={e => setEmail(e.target.value)}
        />

        <input type="password" placeholder="Password" required
          onChange={e => setPassword(e.target.value)}
        />

        <button type="submit">Sign In</button>
      </form>
    </div>
  )
}