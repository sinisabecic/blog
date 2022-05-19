import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import api from "../services/api";

const CreatePost = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  // const [posts, setPosts] = useState([]);
  const [url, setUrl] = useState([]);

  const handleChange = (e) => {
    let value = e.target.value;

    switch (e.target.name) {
      case "title":
        setTitle(value);
        break;
      case "description":
        setDescription(value);
        break;
      case "author":
        setAuthor(value);
        break;
      case "content":
        setContent(value);
        break;
      case "url":
        setUrl(value);
        break;
    }
  };

  const clearForm = () => {
    setTitle("");
    setDescription("");
    setAuthor("");
    setContent("");
    setUrl("");
  };

  const addPost = async (post) => {
    // let newPost = { ...post, done: true };
    // post.done = true;
    try {
      const response = await api.post("/blog", post);
      if (response.status === 201) {
        console.log("Created: " + response.status);
        toast.success("Post created successful!");
        clearForm();
        // navigate("/blog");
      }
    } catch (e) {
      console.log(e);
      toast.error("This is an error!");
    }
  };

  const handleSumbit = (e) => {
    e.preventDefault();
    addPost({ title, description, author, content, url });
  };

  return (
    <div className="container">
      <h1>Create post</h1>
      <form className="ui form" onSubmit={handleSumbit}>
        <div className="field">
          <input
            type="text"
            name="title"
            value={title}
            placeholder="Title"
            onChange={handleChange}
          />
        </div>
        <div className="field">
          <input
            type="text"
            name="description"
            value={description}
            placeholder="Short description"
            onChange={handleChange}
          />
        </div>
        <div className="field">
          <input
            type="text"
            name="author"
            value={author}
            placeholder="Author"
            onChange={handleChange}
          />
        </div>
        <div className="field">
          <input
            type="text"
            name="content"
            value={content}
            placeholder="Content"
            onChange={handleChange}
          />
        </div>
        <div className="field">
          <input
            type="text"
            name="url"
            value={url}
            placeholder="Img url..."
            onChange={handleChange}
          />
        </div>
        <input
          className="waves-effect waves-light btn orange darken-4"
          type="submit"
          value="Create"
        />
        <input
          className="waves-effect waves-light btn black"
          type="button"
          value="Cancel"
          onClick={() => navigate("/blog")}
        />
      </form>
    </div>
  );
};

export default CreatePost;
