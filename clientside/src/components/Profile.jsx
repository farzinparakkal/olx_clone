import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [posts, setPosts] = useState([]);
  const token = localStorage.getItem("token");
  

  const getUser = async () => {
    if (!token) {
      navigate("/login")
    } else {
      try {
        const res = await axios.get("http://localhost:3002/api/getuserData", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.status === 200) {
          setUserDetails(res.data.usr);
          setUserData(res.data.data || null);
        } else {
          navigate("/login")
        }
      } catch (error) {
        console.error(error);
        location.reload();
        navigate("/login")
      }
    }
  };

  const getPosts = async () => {
    try {
      const res = await axios.get("http://localhost:3002/api/getPosts", {
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
    getPosts()
  }, []);

  const handleClick = async (e) => {
    e.preventDefault();
    if (!token) {
      navigate("/login");
    } else {
      try {
        const res = await axios.delete("http://localhost:3002/api/deleteData", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.status === 200) {
          alert(res.data.msg);
          localStorage.removeItem("token");
          navigate("/login");
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error(error);
        location.reload();
        navigate("/login");
      }
    }
  };

  return (
    <div className="body-profile">
    <div className="container">
      <div className="left-side">
        <form>
          <div className="form-group">
            <div className="image">
              <img src={userData?.pic||""} alt="" />
            </div>
            <div>Username: {userDetails?.username}</div>
            <div>Email: {userDetails?.email}</div>
            <div>Phone: {userDetails?.phone}</div>
          </div>
        </form>
        {userData ? (
          <>
            <div>
              <div>District: {userData.district}</div>
              <div>Place: {userData.place}</div>
              <div>Pin: {userData.pin}</div>
            </div>
            <Link to={"/editUserData"}>
              <button className="edit-btn">Edit</button>
            </Link>
          </>
        ) : (
          <>
            <div>Note: Not added, need to create !</div>
            <Link to={"/addUserData"}>
              <button className="create-btn">Add more</button>
            </Link>
          </>
        )}
        <button onClick={handleClick} className="delete-btn">Delete</button>
      </div>
      <div className="right-side">
        <Link to={"/sellPost"} className="sell-btn">
          <button>Sell</button>
        </Link>
        {posts.length === 0 ? (
          <div>No post added</div>
        ) : (
          <div className="right-post-card">
          {posts.map((post, index) => (
            <div key={index} className="show-post-card">
              <Link to={`/viewUserPost/${post._id}`} >
              <img
                src={post.images[0]}
                alt="First Post"
                className="post-image"
              />
              </Link>
              </div>
              ))}
              </div>
              )}
      </div>
    </div>
    </div>
  );
};

export default Profile;
