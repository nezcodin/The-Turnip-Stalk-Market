import { useEffect, useState } from "react"
import axios from "axios"
import { Icon } from '@iconify/react';
import { Link } from "react-router-dom";

export const Postings = () => {

  const [postings, setPostings] = useState([])

  const viewPostings = async (e) => {

    try {
      const response = await axios.get('http://localhost:8000/api/posts/');
      // this will let me get the user and picture since it is returned as a link
      const posts = await Promise.all(response.data.map(async post => {
        const userResponse = await axios.get(post.user)
        const pictureResponse = await axios.get(post.post_picture)
        return { ...post, user: userResponse.data, picture: pictureResponse.data }
      }))
      console.log(response.data);
      setPostings(posts)
    } catch (error) {
      console.log(error);
      console.log(error.response)
    }
  }

  useEffect(() => {
    viewPostings()
  }, [])

  const [showFilters, setShowFilters] = useState(false)

  const handleFilterClick = () => {
    setShowFilters(!showFilters)
  }

  const renderFilters = () => {
    return (
      <div className='text-base bg-sienna p-2 m-2 rounded-lg cursor-pointer'>
        <p className="p-1 hover:bg-siennahover rounded-lg">Price: Highest to Lowest</p>
        <p className="p-1 hover:bg-siennahover rounded-lg">Price: Lowest to Highest</p>
        <p className="p-1 hover:bg-siennahover rounded-lg">Date: Newest to Oldest</p>
        <p className="p-1 hover:bg-siennahover rounded-lg">Date: Oldest to Newest</p>
      </div>
    )
  }

  return (
    <div className='font-motivasansmedium text-white'>
      <Link to='create'>
        <div className="p-6">
          <Icon icon="el:plus-sign" className="text-vividorange text-4xl"></Icon>
        </div>
      </Link>
      <div className="flex flex-row text-lg px-6 justify-between">
        <p className="font-motivasansextrabold text-3xl text-sienna">All Postings</p>
        <div>
          <p className="text-sienna">Filter by:</p>
          <div>
            <p
              onClick={handleFilterClick}
              className="bg-vividorange h-10 flex items-center p-2 rounded-lg justify-between cursor-pointer hover:bg-orangehover"
            >
              Select...<Icon icon='material-symbols:arrow-drop-down-rounded' className="text-4xl"></Icon>
            </p>
            {showFilters && renderFilters()}
          </div>
        </div>
      </div>
      {postings.map(post => (
        <div
          key={post.id}
          className="bg-skyblue p-10 m-6 rounded-3xl cursor-pointer"
        >
          <p>{post.date}</p>
          <p>{post.user.username}</p>
          <p>{post.island_name}</p>
          <p>{post.turnip_picture}</p>
          <img
            src={post.post_picture}
            alt="user post"
            className="flex rounded-xl h-24 w-24"
          />
        </div>
      ))}
    </div>
  )
}