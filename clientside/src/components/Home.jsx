import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Home.scss";

const Home = ({ setUser, filter,name }) => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const token = localStorage.getItem("token");

  const getUser = async () => {
    if (!token) {
      navigate("/login");
    } else {
      try {
        const res = await axios.get("http://localhost:3002/api/getuser", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.status === 200) {
          setUser(res.data.name);
          // setPic(res.data.pic)
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error(error);
        navigate("/login");
      }
    }
  };

  const getPosts = async () => {
    try {
      const res = await axios.get("http://localhost:3002/api/getAllPosts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 200) {
        setPosts(res.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUser();
    getPosts();
  }, []);

  return (
    <div className="body-home">
      <div className="homepage-container">
        <div className="post-grid">
          {posts.length === 0 ? (
            <div>No posts available</div>
          ) : (
            posts
              .filter((i) =>
                i.category?.toLowerCase().includes(filter?.toLowerCase() || ""))
              .filter((i)=>i.title?.toLowerCase().includes(name?.toLowerCase() || ""))
              .map((post,i) => (
                <Link key={i} to={`/viewPost/${post._id}`}>
                  <div  className="post-card">
                    {post.images && post.images.length > 0 && (
                      <img
                        src={post.images[0]}
                        alt={post.caption}
                        className="post-image"
                      />
                    )}
                    <div className="text-card">
                      <div className="post-price"> <b>₹ {post.price}</b></div>
                      <div className="post-title">{post.title}</div>
                    </div>
                  </div>
                </Link>
              ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
