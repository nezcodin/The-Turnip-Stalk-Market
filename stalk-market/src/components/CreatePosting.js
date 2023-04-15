// import axios from "axios"
// import { useState } from "react"
// import { useNavigate } from "react-router-dom"

// export const CreatePosting = (props) => {

//   console.log(props.user_id)

//   const [title, setTitle] = useState('')
//   const [turnip_price, setTurnipPrice] = useState(0)
//   const [post_picture, setPostPicture] = useState('')
//   const [description, setDescription] = useState('')

//   const handlePostPictureChange = (e) => {
//     const file = e.target.files[0];
//     setPostPicture(file);
//   };

//   const navigate = useNavigate()

//   const submit = async (e) => {
//     e.preventDefault()

//     const formData = new FormData()
//     formData.append('user', Number(props.user_id))
//     formData.append('island_name', props.island_name)
//     formData.append('title', title)
//     formData.append('turnip_price', turnip_price)
//     formData.append('description', description)
//     formData.append('post_picture', post_picture)

//     try {
//       const response = await axios.post('http://localhost:8000/api/posts/', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' }
//       })

//       console.log(response)
//       navigate('/postings')
//     } catch (error) {
//       throw error
//     }
//   }

//   return (
//     <div>
//       <div>
//         <form
//           onSubmit={submit}
//           className="flex flex-col p-6"
//         >
//           <p>Create a Posting</p>

//           <p>Author: {props.username}</p>
//           <p>Island Name: {props.island_name}</p>

//           <input placeholder="Title" required
//             onChange={e => setTitle(e.target.value)}
//           />

//           <input placeholder="Turnip Price" required type="number" min='0'
//             onChange={e => setTurnipPrice(e.target.value)}
//           />

//           <p>Please provide a picture to confirm the price.</p>
//           <input type="file" required accept="image/*"
//             onChange={handlePostPictureChange}
//           />

//           <input placeholder="Description" required
//             onChange={e => setDescription(e.target.value)}
//           />

//           <button type='submit'>Create Posting</button>
//         </form>
//       </div>
//     </div>
//   )
// }

import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const CreatePosting = (props) => {

  const [title, setTitle] = useState('')
  const [turnip_price, setTurnipPrice] = useState('')
  const [post_picture, setPostPicture] = useState(null) // initialize to null
  const [description, setDescription] = useState('')

  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()

    try {
      const formData = new FormData()
      formData.append('island_name', props.island_name)
      formData.append('title', title)
      formData.append('turnip_price', turnip_price)
      formData.append('post_picture', post_picture)
      formData.append('description', description)

      console.log(...formData);

      const response = await axios.post('http://localhost:8000/api/posts/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })

      console.log(response.data)

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

          <input placeholder="Turnip Price" required
            onChange={e => setTurnipPrice(e.target.value)}
          />

          <p>Please provide a picture to confirm the price.</p>
          <input type="file" required accept="image/*"
            onChange={e => setPostPicture(e.target.files[0])} // pass the first file object in the file list
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
