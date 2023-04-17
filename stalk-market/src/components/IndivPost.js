import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const IndivPost = () => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentsUser, setCommentsUser] = useState([]);
  const [commentsDate, setCommentsDate] = useState([]);
  const [commentsTime, setCommentsTime] = useState([]);
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
      const formattedComments = response.data.map((comment) => {
        const date = new Date(comment.date);
        const formattedTime = new Date(`1970-01-01T${comment.time}Z`).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
        return {
          ...comment,
          date,
          time: formattedTime,
        };
      });
      const commentsUser = formattedComments.map(comment => comment.user.username);
      const commentsDate = formattedComments.map(comment => comment.date);
      const commentsTime = formattedComments.map(comment => comment.time);
      setComments(formattedComments);
      setCommentsUser(commentsUser);
      setCommentsDate(commentsDate);
      setCommentsTime(commentsTime);
    } catch (error) {
      console.log(error);
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
              <p>Turnip Price: {post.turnip_price}</p>
            </div>
          </div>
          <div className="bg-sienna mx-40 -my-10 p-4 rounded-lg">
            <input placeholder="Join the conversation..." />
            <button className="bg-vividorange text-white p-3 rounded-lg font-finkheavy text-lg hover:bg-orangehover">Post</button>
          </div>
          <div className="bg-skyblue m-24 mx-40 py-4 px-10 rounded-lg flex flex-col text-white text-xl">

            {comments.map((comment, index) => (
              <div key={index} className="m-4">
                <div className="flex justify-between">
                  <p>{commentsUser[index]}</p>
                  <p>{new Date(commentsDate[index]).toLocaleDateString()} | {commentsTime[index]}</p>
                </div>
                <p>{comment.text_body}</p>
                <div className="flex justify-end">
                  <button className="bg-vividorange text-white p-2 rounded-lg font-finkheavy text-lg hover:bg-orangehover my-3">Reply</button>
                </div>
                <hr className="border-2 border-white" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
