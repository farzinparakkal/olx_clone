import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./EditUserData.css";

const EditUserData = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    district: "",
    place: "",
    pin: "",
  })

  const fetchUserData = async () => {
    const token = localStorage.getItem("token")

    if (!token) {
      alert("You are not logged in. Redirecting to login page.")
      navigate("/login")
    }

    try {
      const res = await axios.get("http://localhost:3002/api/getuserData", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 200 && res.data.data) {
        setFormData({
          district: res.data.data.district || "",
          place: res.data.data.place || "",
          pin: res.data.data.pin || "",
        })
        
      } else {
        alert("No data found to edit. Redirecting to profile.");
        navigate("/profile");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to fetch data. Redirecting to profile.");
      navigate("/profile");
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    
    const token = localStorage.getItem("token");

    if (!token) {
      alert("You are not logged in. Redirecting to login page.");
      navigate("/login");
      return;
    }

    try {
      const res = await axios.put(
        "http://localhost:3002/api/edituserData",{ ...formData },
        {headers: { Authorization: `Bearer ${token}` },}
      );

      if (res.status === 200) {
        alert("Data updated successfully!");
        navigate("/profile");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to update data. Please try again.");
    }
  };

  return (
    <div className="edit-data-container">
      <form className="edit-data-form" onSubmit={handleSubmit}>
        <h2>Edit Your Details</h2>
        <div className="form-group">
          <label htmlFor="nickname">District</label>
          <input
            type="text"
            id="district"
            name="district"
            value={formData.district}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="dob">Place</label>
          <input
            type="text"
            id="place"
            name="place"
            value={formData.place}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="note">PIN</label>
          <input
            type="text"
            id="pin"
            name="pin"
            value={formData.pin}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Update Data
        </button>
      </form>
    </div>
  );
};

export default EditUserData;
