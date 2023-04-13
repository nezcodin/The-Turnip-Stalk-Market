import { useEffect, useState } from "react"
import axios from "axios"

export const Postings = () => {

  const [postings, setPostings] = useState([])

  const viewPostings = async (e) => {

    try {
      const response = await axios.get('http://localhost:8000/api/posts/');
      // this will let me get the user since it is returned as a link
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


  return (
    <div>
      {postings.map(post => (
        <div key={post.id}>
          <p>{post.date}</p>
          <p>{post.user.username}</p>
          <p>{post.island_name}</p>
          <p>{post.turnip_picture}</p>
          <img src={post.post_picture} alt="user post" />
        </div>
      ))}
    </div>
  )
}