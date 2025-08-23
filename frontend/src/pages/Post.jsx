import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Post.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import EmojiLoader from "./DotsLoader";

export default function Post() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [isAuthor, setIsAuthor] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  // ✅ Base URL variable
  const BASE_URL = "http://localhost:5000";

  useEffect(() => {
    const fetchPost = async () => {
      try {
        // Fetch post details
        const res = await axios.get(`${BASE_URL}/fetch/read/${id}`);
        setPost(res.data);

        // Check if the current logged-in user is the author
        if (token) {
          const authorCheck = await axios.get(
            `${BASE_URL}/post/check-author/${id}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          setIsAuthor(authorCheck.data.isAuthor);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchPost();
  }, [id, token]);

  if (!post) return <EmojiLoader />;

  const handleEdit = () => {
    navigate("/write", { state: { post } });
  };

  const handleDelete = async () => {
    if (!token) return alert("You must be logged in to delete a post");

    try {
      await axios.delete(`${BASE_URL}/post/check-author/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Post deleted successfully!");
      navigate("/");
    } catch (err) {
      console.error("Delete failed:", err);
      alert("You can only delete your own post.");
    }
  };

  return (
    <div className="bg-gray-100 w-full p-10 md:p-20 md:px-35 lg:px-60 flex-col items-center justify-center">
      <h1 className="post-heading mt-3 text-center text-[rgb(40,39,39)]">{post.title}</h1>
      <h2 className="text-center font-bold text-2xl">{post.username}</h2>
      <p className="text-center mb-2">{new Date(post.created_at).toLocaleDateString()}</p>

      {/* Show buttons only if the logged-in user is the author */}
      {isAuthor && (
        <div className="flex gap-2 mt-3">
          <button
            onClick={handleEdit}
            className="w-28 flex gap-2 justify-center items-center px-4 py-2 rounded-3xl bg-green-400 text-white"
          >
            Edit <FaEdit />
          </button>
          <button
            onClick={handleDelete}
            className="w-28 flex gap-2 justify-center items-center px-4 py-2 rounded-3xl bg-red-400 text-white"
          >
            Delete <FaTrash />
          </button>
        </div>
      )}

      {post.photo_url && (
        <img
          src={`${BASE_URL}/uploads/${post.photo_url}`}  // ✅ using BASE_URL here
          className="object-cover w-full h-70 mt-2 mb-10"
          alt={post.title}
        />
      )}

      <p className="text-justify para">{post.content}</p>
    </div>
  );
}