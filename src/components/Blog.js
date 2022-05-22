import React, { useState, useEffect } from "react";
import { Link /*useNavigate*/ } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../services/api";

const Blog = () => {
  // let navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    toast.promise(fetchPosts(), {
      loading: "Loading posts...",
      success: "Got the data",
      error: "Error when fetching",
    });
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await api.get("/blog");
      setPosts(response.data);
      // setIsLoading(false);
      console.log(response.data);
    } catch (err) {
      if (err.response) {
        console.log(err.response.status);
        console.log(err.response.headers);
      } else {
        console.log(`Error: ${err.message}`);
      }
    }
  };

  const removePost = async (e, id) => {
    e.stopPropagation();
    try {
      if (window.confirm("Jesi li siguran?")) {
        const response = await api.delete(`/blog/${id}`);
        if (response.status === 200) {
          const newPosts = posts.filter((post) => post.id !== id);
          setPosts(newPosts);
          toast.success("Post deleted successful!");
        }
      }
    } catch (e) {
      console.log(e);
      toast.error("Error!");
    }
  };

  // if (isLoading === true) toast.loading("Loading...");

  return (
    <div>
      <div className="container">
        <h1 className="my-4">Blog</h1>
        <Link
          to="/blog"
          className="waves-effect waves-light btn green darken-4"
        >
          <i className="material-icons">Refresh list</i>
        </Link>
        <Link
          to="/blog/create"
          className="waves-effect waves-light btn yellow darken-4"
        >
          <i className="material-icons">Create post</i>
        </Link>
        <div className="row">
          {posts.map((post) => (
            <div key={post.id} className="col s12 m6 l3">
              <div className="card card-reveal">
                <div className="card-image waves-effect waves-block waves-light">
                  <img className="activator" src={post.url} />
                </div>
                <div className="card-content">
                  <span
                    className="activator grey-text text-darken-4"
                    style={{ fontWeight: "700" }}
                  >
                    <Link to={`/blog/${post.id}`}>{post.title}</Link>
                  </span>
                  <p>
                    <span className="black-text text-darken-4">Author:</span>{" "}
                    <span className="black">
                      <b>{post.author}</b>
                    </span>
                  </p>
                  <br />
                  <div>
                    <Link className="btn" to={`/blog/${post.id}`}>
                      Read
                    </Link>{" "}
                    |{" "}
                    <button
                      className="btn red"
                      onClick={(e) => removePost(e, post.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <div className="card-reveal">
                  <span className="card-title grey-text text-darken-4">
                    {post.title}
                    <i className="material-icons right">close</i>
                  </span>
                  <p>{post.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
