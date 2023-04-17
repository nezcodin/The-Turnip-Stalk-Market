import axios from "axios"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useParams } from 'react-router-dom';


export const EditPost = () => {

  const [user, setUser] = useState({})

  const [title, setTitle] = useState('')
  const [turnip_price, setTurnipPrice] = useState(0)
  const [post_picture, setPostPicture] = useState('')
  const [description, setDescription] = useState('')

  const [fileName, setFileName] = useState("");

  const handlePostPictureChange = (e) => {
    const file = e.target.files[0];
    setPostPicture(file);
    setFileName(file.name);
  };

  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/posts/${id}`, {
          withCredentials: true
        })
        setUser(response.data.user)
        setTitle(response.data.title)
        setTurnipPrice(response.data.turnip_price)
        setDescription(response.data.description)
        setPostPicture(response.data.post_picture)
        console.log(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchPost()
  }, [id])

  const submit = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('title', title)
    formData.append('turnip_price', turnip_price)
    formData.append('description', description)
    formData.append('post_picture', post_picture)

    const requestBody = {
      ...formData,
      user: user
    }

    try {
      const response = await axios.put(`http://localhost:8000/api/posts/${id}/`, requestBody, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true
      })

      console.log(response)
      navigate('/postings')
    } catch (error) {
      console.log(error)
      console.log(error.request)
      console.log(error.response.data)
      console.log(error.response.status)
    }
  }

  return (
    <div className="flex justify-center items-center py-10">
      <div className="p-6 text-lg font-motivasansmedium flex flex-col justify-center items-center bg-skyblue rounded-xl w-fit px-24">
        <div className="flex flex-col items-center p-6">
          <p className="text-4xl font-finkheavy p-4 text-white">Edit Posting</p>
        </div>
        <form
          onSubmit={submit}
          className="flex flex-col items-left"
        >
          <input placeholder="Title" required
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="text-left m-4 rounded-lg p-1 pl-5"
          />

          <input placeholder="Turnip Price" required type="number" min='0'
            value={turnip_price}
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
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="text-left m-4 rounded-lg p-1 pl-5 w-96 h-36"
          />

          <div className="flex items-center justify-center">
            <button type='submit' className="m-6 bg-vividorange text-white p-3 rounded-lg text-xl w-40 hover:bg-orangehover font-finkheavy">Finish Editing</button>
          </div>

        </form>
      </div>
    </div>
  )
}
