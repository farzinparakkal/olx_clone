import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link,useNavigate } from "react-router-dom"
import './Home.css'

const Home = ({setUser}) => {
  const navigate = useNavigate()
  const [posts, setPosts] = useState([])
  const token = localStorage.getItem("token")

  const getUser = async () => {
    if (!token) {
      navigate("/login")
    } else {
      try {
        const res = await axios.get("http://localhost:3002/api/getuser", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.status === 200) {
          setUser(res.data.name)
          // setPic(res.data.pic)
        } else {
          navigate("/login")
        }
      } catch (error) {
        console.error(error)
        navigate("/login")
      }
    }
  }

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
  }

  useEffect(() => {
    getUser()
    getPosts()
  }, [])


  return (
    <div className="body-home">
    <div className="homepage-container">
      <div className="post-grid">
        {posts.length === 0 ? (
          <div>No posts available</div>
        ) : (
          posts.map((post) => (
            <Link to={`/viewPost/${post._id}`}>
                <div key={post._id} className="post-card">
                    {post.images && post.images.length > 0 && (
              <img
                src={post.images[0]}
                alt={post.caption}
                className="post-image"
              />
            )}
            <div className="post-caption">{post.caption}</div>
          </div>
          </Link>  
          ))
        )}
      </div>
    </div>
    </div>
  )
}

export default Home