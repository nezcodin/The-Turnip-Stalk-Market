import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const IndivPost = (props) => {
  const [post, setPost] = useState(null);
  const [commentsData, setCommentsData] = useState([]);
  const { id } = useParams(); //this is grabbing the post id from the url

  const navigate = useNavigate()

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
      const response = await axios.get(`http://localhost:8000/api/posts/${id}/comments`);
      const formattedComments = response.data.map((comment) => {
        const date = new Date(comment.date);
        const formattedTime = new Date(`1970-01-01T${comment.time}Z`).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
        return {
          ...comment,
          date,
          time: formattedTime,
        };
      });
      setCommentsData(formattedComments);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditPost = () => {
    navigate(`/postings/${id}/edit`)
  };

  const handleDeletePost = async () => {
    try {
      const response = await axios.delete(`http://localhost:8000/api/posts/${id}/`)
      console.log('Successfully deleted!')
      navigate('/postings')
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    viewPost();
    viewComments();
  }, []);


  return (
    <div className="font-motivasansmedium">
      {post && (
        <div>
          <div className="bg-skyblue m-24 mx-40 py-4 px-10 rounded-lg flex flex-col text-white text-xl">
            <img src={post.post_picture} alt="post" className="rounded-2xl my-10" />
            <div className="flex justify-between py-4">
              <p className="font-motivasansbold text-2xl">{post.title}</p>
              <p>{post.date.toLocaleDateString()} | {post.time}</p>
            </div>
            <p className="py-4">{post.user.username} | {post.user.island_name}</p>
            <p className="py-4">{post.description}</p>
            <div className="flex justify-between my-6">
              <button className="bg-vividorange text-white p-3 rounded-lg font-finkheavy text-lg hover:bg-orangehover">Join Wait Queue</button>
              <p className="font-motivasansbold">Turnip Price: {post.turnip_price}</p>
            </div>
            {post.user.id === props.user_id && (
              <div className="flex justify-between mt-6">
                <button className="bg-vividorange text-white p-3 rounded-lg font-finkheavy text-lg hover:bg-orangehover" onClick={handleEditPost}>Edit</button>
                <button className="bg-red-600 text-white p-3 rounded-lg font-finkheavy text-lg hover:bg-red-700" onClick={handleDeletePost}>Delete</button>
              </div>
            )}
          </div>
          <div className="bg-skyblue mx-40 -my-10 p-6 rounded-lg flex justify-between mb-10">
            <input placeholder="Join the conversation..." className="rounded-lg pl-3 w-full" />
            <button className="bg-vividorange text-white p-3 rounded-lg font-finkheavy text-lg hover:bg-orangehover w-16 ml-6">Post</button>
          </div>
          {commentsData.length !== 0 ? (
            <div className="bg-skyblue mt-5 m-24 mx-40 py-4 px-10 rounded-lg flex flex-col text-white text-xl">
              {commentsData
                .filter((comment) => comment.post_id === parseInt(id))
                .map((comment, index) => (
                  <div key={index} className={`m-4 ${comment.parent_comment ? 'ml-24 nested-comment' : ''}`}>
                    <div className="flex justify-between my-2">
                      <p>{comment.user.username}</p>
                      <p>{new Date(comment.date).toLocaleDateString()} | {comment.time}</p>
                    </div>
                    <p>{comment.text_body}</p>
                    <div className="flex justify-end">
                      <button className="bg-vividorange text-white p-2 rounded-lg font-finkheavy text-lg hover:bg-orangehover my-4">Reply</button>
                    </div>
                    <hr className="border-2 border-white" />
                  </div>
                ))}
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};
