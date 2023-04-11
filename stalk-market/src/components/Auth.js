import { useState, useEffect } from "react";

export const Auth = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('access_token') !== null) {
      setIsAuthenticated(true)
    }
  }, [isAuthenticated])

  return (
    <div>
      <h3>The Stalk Market</h3>
      <div>
        {isAuthenticated ? <a href='/home'>Home</a> : null}
      </div>
      <div>
        {isAuthenticated ? <a href='/logout'>Logout</a> : <a href='/login'>Login</a>}
      </div>
    </div>
  )
}