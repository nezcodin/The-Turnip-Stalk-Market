import axios from "axios";
import { useState } from "react";

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const submit = async e => {
    e.preventDefault();
    const user = {
      username: username,
      password: password
    };

    const { data } = await axios.post('http://localhost:8000/token/', user, {
      username: username,
      password: password
    }, {
      withCredentials: true
    });

    // Initialize the access & refresh token in localstorage.
    localStorage.clear();
    localStorage.setItem('access_token', data.access);
    localStorage.setItem('refresh_token', data.refresh);
    axios.defaults.headers.common['Authorization'] = `Bearer ${data['access']}`;
    window.location.href = '/'
  };

  return (
    <div className="auth-form-container">
      <form className="auth-form" onSubmit={submit}>

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

      </form>
    </div>
  );
};
