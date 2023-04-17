import axios from "axios";
import { useEffect, useState } from "react";
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
    <div className="flex items-center text-sienna text-2xl p-24 flex-col font-motivasansmedium justify-between">
      {user &&
        <div className="flex p-10 w-full justify-center">
          <div className="m-4 flex flex-col">
            <img src={user.profile_picture} alt="profile" className="rounded-full" />
            <button className='m-6 bg-vividorange text-white p-3 rounded-lg font-finkheavy text-2xl hover:bg-orangehover'>Change</button>
          </div>
          <div>
            <div className="flex m-4">
              <p className="mr-24">{user.username}</p>
              <p className="flex ml-96">Island Name: {user.island_name}</p>
            </div>
            <p className="flex flex-row m-4">Friend Code: {user.friend_code !== null ? <p>{user.friend_code}</p> : <p>Unavailable</p>}</p>
            <p className="m-4">Bio: {user.bio}</p>
          </div>
        </div>
      }
      <button onClick={handleEdit} className='m-6 bg-vividorange text-white p-3 rounded-lg font-finkheavy text-2xl hover:bg-orangehover'>Edit</button>
    </div>
  )
}
