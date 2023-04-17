import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const EditProfile = (props) => {
  const [profileData, setProfileData] = useState({
    username: props.user.username,
    email: props.user.email,
    island_name: props.user.island_name,
    bio: props.user.bio,
    password: ''
  });

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();

    // create a new object with all the profile data except for the password
    const { password, ...data } = profileData;

    // set a placeholder value for the password field
    const requestData = { ...data, password: '********' };

    axios.put(`http://localhost:8000/api/users/${props.user_id}/`, requestData)
      .then(response => {
        console.log(response.data);
        navigate('/profile/');
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDeleteUser = async () => {
    try {
      const response = await axios.delete(`http://localhost:8000/api/users/${props.user.id}/`)
      console.log('Successfully deleted!')
      props.setUsername('')
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className='flex items-center justify-center pt-10 pb-5 text-xl font-motivasansmedium'>
      <form onSubmit={handleSubmit} className='flex flex-col p-10 justify-center items-center bg-skyblue rounded-lg w-fit'>
        <label className='text-white m-2'>
          Username:
          <input
            type="text"
            name="username"
            value={profileData.username}
            onChange={handleChange}
            className='m-2 rounded-lg pl-3 text-black'
          />
        </label>
        <label className='text-white m-2'>
          Email:
          <input
            type="email"
            name="email"
            value={profileData.email}
            onChange={handleChange}
            className='m-2 rounded-lg pl-3 text-black'
          />
        </label>
        <label className='text-white m-2'>
          Island Name:
          <input
            type="text"
            name="island_name"
            value={profileData.island_name}
            onChange={handleChange}
            className='m-2 rounded-lg pl-3 text-black'
          />
        </label>
        <label className='text-white m-2'>
          Bio:
          <textarea
            name="bio"
            value={profileData.bio}
            onChange={handleChange}
            className='m-2 rounded-lg pl-3 pt-1 text-black h-24 mb-0'
          />
        </label>
        <div className='flex justify-between'>
          <button type="submit" className='m-6 bg-vividorange text-white p-3 rounded-lg font-finkheavy text-2xl hover:bg-orangehover'>Save Changes</button>
          <button className="m-6 bg-red-500 text-white p-3 rounded-lg font-finkheavy text-2xl hover:bg-red-600" onClick={handleDeleteUser}>Delete Account</button>
        </div>
      </form>
    </div>
  );
};
