import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Write.css";
import writeBg from "../assets/write-bg.jpeg";
import axios from "axios";

export default function Write() {
  const location = useLocation();
  const navigate = useNavigate();
  const postToEdit = location.state?.post; // if editing, post object is passed
  const inputRef = useRef(null);

  const [title, setTitle] = useState(postToEdit?.title || "");
  const [post, setPost] = useState(postToEdit?.content || "");
  const [file, setFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(postToEdit?.photo_url || null);

  // ✅ Base URL variable
    const BASE_URL = "http://localhost:5000";


  useEffect(() => {
    if (postToEdit?.photo_url) {
      setPreviewImage(postToEdit.photo_url);
    }
  }, [postToEdit]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      setPreviewImage(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("post", post);
    if (file) formData.append("image", file);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("You must be logged in to submit a post");
        return;
      }

      if (postToEdit) {
        // Edit existing post
        await axios.put(
          `${BASE_URL}/post/check-author/${postToEdit.id}`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        alert("Post updated successfully!");
        navigate(`/post/${postToEdit.id}`);
      } else {
        // Create new post
        const res = await axios.post(
          `${BASE_URL}/post/write`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        alert("Post created successfully!");
        navigate(`/post/${res.data.post.id}`);
      }
    } catch (err) {
      console.error("Failed to save post:", err);
      alert("Failed to save post. Please try again.");
    }
  };

  return (
    <div className="w-full h-screen">
      <div
        className="bg-no-repeat bg-top bg-center z-1 bg-contain h-60 w-full"
        style={{ backgroundImage: `url(${writeBg})` }}
      ></div>

      <div className="flex flex-col justify-center items-center mt-5">
        <h1 className="post-heading text-center">
          {postToEdit ? "Edit Post" : "Write a Blog Post"}
        </h1>

        <form
          className="flex w-80 flex-col md:w-200 h-50 gap-6 rounded-2xl bg-white md:flex-row"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col w-80 md:w-170 h-45">
            <input
              className="border border-gray rounded-xl p-2 mb-3"
              type="text"
              required
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              className="w-full h-40 border border-gray rounded-xl p-2"
              required
              placeholder="Write your post..."
              value={post}
              onChange={(e) => setPost(e.target.value)}
            />
          </div>

          <div className="flex md:flex-col gap-3">
            <input
              style={{ display: "none" }}
              type="file"
              id="file"
              accept="image/*"
              onChange={handleFileChange}
              ref={inputRef}
            />
            <button
              type="button"
              className="px-5 py-2 border border-black text-black rounded-2xl"
              onClick={() => inputRef.current.click()}
            >
              Upload
            </button>
            <button
              type="submit"
              className="px-5 py-2 border bg-black text-white rounded-2xl"
            >
              {postToEdit ? "Update" : "Publish"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}