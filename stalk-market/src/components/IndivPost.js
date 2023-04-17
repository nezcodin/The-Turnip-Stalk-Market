import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const IndivPost = () => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentsUser, setCommentsUser] = useState([])
  const { id } = useParams(); //this is grabbing the post id from the url

  const viewPost = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/posts/${id}`);
      const post = response.data;
      const date = new Date(post.date);
      const formattedTime = new Date(`1970-01-01T${post.time}Z`).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
      setPost({ ...post, date, time: formattedTime });
    } catch (error) {
      console.log(error);
    }
  };

  const viewComments = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/comments/', {
        params: {
          post: id
        }
      });
      const comments = response.data.map(comment => comment.text_body)
      const commentsUser = response.data.map(comment => comment.user.username)
      setComments(response.data)
      setCommentsUser(commentsUser)
      console.log(comments)
      console.log(commentsUser)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    viewPost();
    viewComments();
  }, []);

  return (
    <div className="font-motivasansmedium">
      {post && (
        <div>
          <img src={post.post_picture} alt="post" />
          <p>{post.title}</p>
          <p>{post.date.toLocaleDateString()} | {post.time}</p>
          <p>{post.user.username} | {post.user.island_name}</p>
          <p>{post.description}</p>
          <p>Turnip Price: {post.turnip_price}</p>
          <p>Comments:</p>
          {comments.map((comment, index) => (
            <div key={index}>
              <p>{commentsUser[index]}</p>
              <p>{comment.text_body}</p>
            </div>
          ))}

        </div>
      )}
    </div>
  );
};
