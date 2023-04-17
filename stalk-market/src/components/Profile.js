import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const Profile = (props) => {

  const navigate = useNavigate()

  const [user, setUser] = useState({});

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/users/${props.user_id}`, {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        });

        setUser(response.data)
        console.log(response.data)
      } catch (error) {
        console.error(error);
      }
    }
    getUser();
  }, [props.user_id]);

  const handleEdit = () => {
    navigate('/profile/edit')
  }

  return (
    <div className="flex items-center justify-center text-sienna text-4xl p-60 flex-col">
      {user && <p>{user.username}</p>}
      <button onClick={handleEdit}>Edit</button>
    </div>
  )
}
