import { useEffect } from "react";
import axios from "axios";

export const Logout = () => {

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.post(
          'http://localhost:8000/logout/',
          { refresh_token: localStorage.getItem('refresh_token') },
          { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
        );
        localStorage.clear();
        axios.defaults.headers.common['Authorization'] = null;
        window.location.href = '/'
      } catch (e) {
        console.log('There was an error that occured when logging out.', e)
      }
    })();
  }, []);

  return (
    <div>
      <h3>Logout</h3>
    </div>
  )
}
