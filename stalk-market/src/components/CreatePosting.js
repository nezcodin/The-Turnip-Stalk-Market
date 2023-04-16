import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const CreatePosting = (props) => {

  console.log(props.user_id)

  // console.log(props.email)

  console.log(props.user)

  const [title, setTitle] = useState('')
  const [turnip_price, setTurnipPrice] = useState(0)
  const [post_picture, setPostPicture] = useState('')
  const [description, setDescription] = useState('')

  const [fileName, setFileName] = useState('')

  const handlePostPictureChange = (e) => {
    const file = e.target.files[0]
    setPostPicture(file)
    setFileName(file.name)
  }

  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('user', props.user)
    formData.append('user_id', props.user_id)
    formData.append('island_name', props.island_name)
    formData.append('title', title)
    formData.append('turnip_price', turnip_price)
    formData.append('description', description)
    formData.append('post_picture', post_picture)

    try {
      const response = await axios.post('http://localhost:8000/api/posts/', formData)

      console.log(response)
      navigate('/postings')
    } catch (error) {
      throw error
    }
  }

  return (
    <div className="flex justify-center items-center py-10">
      <div className="p-6 text-lg font-motivasansmedium flex flex-col justify-center items-center bg-skyblue rounded-xl w-fit px-24">
        <div className="flex flex-col items-center p-6">
          <p className="text-4xl font-finkheavy p-4 text-white">Create a Posting</p>
          <p className="p-2 text-white">Author: {props.username}</p>
          <p className="p-2 text-white">Island Name: {props.island_name}</p>
        </div>
        <form
          onSubmit={submit}
          className="flex flex-col items-left"
        >
          <input placeholder="Title" required
            onChange={e => setTitle(e.target.value)}
            className="text-left m-4 rounded-lg p-1 pl-5"
          />

          <input placeholder="Turnip Price" required type="number" min='0'
            onChange={e => setTurnipPrice(e.target.value)}
            className="text-left m-4 rounded-lg p-1 w-36 pl-5"
          />

          <p className="text-center text-white p-1">Please provide a picture to confirm the price.</p>
          {fileName ?
            <p className="text-center text-white">File submitted: {fileName}</p> :
            null
          }
          <div className="flex items-center justify-center">
            <label className="bg-vividorange hover:orangehover text-white font-finkheavy p-2 rounded-lg text-xl m-6 w-40 text-center hover:bg-orangehover cursor-pointer">
              <span>Choose file</span>
              <input type="file" className="hidden" onChange={handlePostPictureChange} />
            </label>
          </div>


          <textarea placeholder="Description" required
            onChange={e => setDescription(e.target.value)}
            className="text-left m-4 rounded-lg p-1 pl-5 w-96 h-36"
          />

          <div className="flex items-center justify-center">
            <button type='submit' className="m-6 bg-vividorange text-white p-3 rounded-lg text-xl w-40 hover:bg-orangehover font-finkheavy">Create Posting</button>
          </div>

        </form>
      </div>
    </div>
  )
}
