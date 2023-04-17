// this will have the option to update and delete a post (if user id == user id of post)
import axios from "axios"
import { useState } from "react"

const viewPost = () => {
  try {
    const response = axios.get('http://localhost:8000/api/posts/')

    // console.log(response.data)

  } catch (error) {
    console.log(error)
  }
}


export const IndivPost = () => {
  return (
    <div>

    </div>
  )
}