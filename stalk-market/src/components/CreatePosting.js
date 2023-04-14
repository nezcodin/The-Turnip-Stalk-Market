import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const CreatePosting = (props) => {

  const [title, setTitle] = useState('')
  const [turnip_price, setTurnipPrice] = useState(0)
  const [post_picture, setPostPicture] = useState('')
  const [description, setDescription] = useState('')

  const handlePostPictureChange = (e) => {
    const file = e.target.files[0];
    setPostPicture(file);
  };

  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post('http://localhost:8000/api/posts/', {
        user: props.username,
        island_name: props.island_name,
        title,
        turnip_price,
        post_picture,
        description
      }, {
        headers: { 'Content-Type': 'application/json' }
      })

      navigate('/postings')
    } catch (error) {
      throw error
    }
  }

  return (
    <div>
      <div>
        <form
          onSubmit={submit}
          className="flex flex-col p-6"
        >
          <p>Create a Posting</p>

          <p>Author: {props.username}</p>
          <p>Island Name: {props.island_name}</p>

          <input placeholder="Title" required
            onChange={e => setTitle(e.target.value)}
          />

          <input placeholder="Turnip Price" required type="number" min='0'
            onChange={e => setTurnipPrice(e.target.value)}
          />

          <p>Please provide a picture to confirm the price.</p>
          <input type="file" required accept="image/*"
            onChange={handlePostPictureChange}
          />

          <input placeholder="Description" required
            onChange={e => setDescription(e.target.value)}
          />

          <button type='submit'>Create Posting</button>
        </form>
      </div>
    </div>
  )
}