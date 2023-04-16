import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
    <div className="flex items-center justify-center text-sienna text-4xl p-60 flex-col">
      <p>This page is coming soon!</p>
      <Link to='/'>
        <button className="m-6 bg-vividorange text-white p-3 rounded-lg text-xl w-40 hover:bg-orangehover">Return Home</button>
      </Link>
    </div>
  )
}