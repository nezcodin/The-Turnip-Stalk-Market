import axios from "axios";
import { useEffect, useState } from "react";

export const Profile = () => {

  const [user, setUser] = useState()

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/user/', {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        });

        setUser(response.data)
        console.log(user)
      } catch (error) {
        console.error(error);
      }
    }
    getUser();
  }, []);

  return (
    <div>
      <p>{user}</p>
    </div>
  )
}