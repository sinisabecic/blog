import React, { useState, useEffect } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import api from "../services/api";

const Post = () => {
  let { id } = useParams(); // cita vrijednost od :id
  useEffect(() => {
    fetchItem();
    console.clear();
    console.log("Post id: " + id);
  }, []);

  const [item, setItem] = useState({});

  const fetchItem = async () => {
    const response = await api.get(`blog/${id}`);
    setItem(response.data);
  };

  return (
    <div className="container">
      <div className="row">
        <h1>{item.title}</h1>
        <h4>{item.author}</h4>
        <b>{item.description}</b>
        <p>{item.content}</p>
        <img
          src={item.url}
          alt=""
          onLoad={() => console.log("Img: " + item.url)}
        />
      </div>
    </div>
  );
};

export default Post;
