import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

export const Login = () => {
  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');

  // const submit = async e => {
  //   e.preventDefault();
  //   const user = {
  //     username: username,
  //     password: password
  //   };

  //   const { data } = await axios.post('http://localhost:8000/token/', user, {
  //     username: username,
  //     password: password
  //   }, {
  //     withCredentials: true
  //   });

  //   // Initialize the access & refresh token in localstorage.
  //   localStorage.clear();
  //   localStorage.setItem('access_token', data.access);
  //   localStorage.setItem('refresh_token', data.refresh);
  //   axios.defaults.headers.common['Authorization'] = `Bearer ${data['access']}`;
  //   window.location.href = '/home'
  // };

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })

  const { username, password } = formData

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit = e => {
    e.preventDefault()

    //login(email, password)
  }

  // is the user authenticated?
  //if so, redirect to the home page

  return (
    <div className="auth-form-container">
      <h1>Sign In</h1>
      <form onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input
            type='username'
            placeholder='Username'
            name='username'
            value={username}
            onChange={e => onChange(e)}
            required
          />
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={e => onChange(e)}
            minLength='6'
            required
          />
        </div>
        <button type='submit'>Log In</button>
      </form>
      <p>Don't have an account? <Link to='/register'>Create an Account</Link></p>

      {/* <form className="auth-form" onSubmit={submit}>

        <h3>Sign In</h3>

        <div>
          <label>Username</label>
          <input
            placeholder="Enter username"
            name='username'
            type='text'
            value={username}
            required
            onChange={e => setUsername(e.target.value)}
          />
        </div>

        <div>
          <label>Password</label>
          <input
            name='password'
            type='password'
            placeholder="Enter password"
            value={password}
            required
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <div>
          <button type='submit'>Submit</button>
        </div>

      </form> */}
    </div>
  );
};
