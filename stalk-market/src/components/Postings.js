import { useEffect, useState } from "react"
import axios from "axios"

export const Postings = () => {

  const [postings, setPostings] = useState([])

  const viewPostings = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get('http://localhost:8000/api/posts/');
      console.log(response);
      setPostings(response)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    viewPostings()
  }, [])


  return (
    <div>
      {postings.map(post => (
        <div key={post.id}>
          <p>{post.user}</p>
        </div>
      ))}
    </div>
  )
}