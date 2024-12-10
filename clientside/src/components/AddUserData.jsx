import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import './AddUserData.css'

const AddUserData = () => {
    const navigate=useNavigate()
  const [formData, setFormData] = useState({
    district: "",
    place: "",
    pin: "",
    pic: "",
  });

  const [imagePreview, setImagePreview] = useState("");
  const token=localStorage.getItem('token')

  // Function to convert image to Base64
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  // Handle input changes
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handle image upload
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const base64 = await convertBase64(file);
      setFormData((prev) => ({ ...prev, pic: base64 }));
      setImagePreview(base64);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post(`http://localhost:3002/api/adduserData`, formData, {
            headers: { Authorization: `Bearer ${token}` },
        });

      if (response.status==200) {
        alert(response.data.msg)
        navigate('/profile')
      } else {
        alert("Failed to add location!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="location-form">
      <div>
        <label>District:</label>
        <input
          type="text"
          name="district"
          value={formData.district}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Place:</label>
        <input
          type="text"
          name="place"
          value={formData.place}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>PIN:</label>
        <input
          type="text"
          name="pin"
          value={formData.pin}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Picture:</label>
        <input type="file" accept="image/*" onChange={handleImageChange} required />
        {imagePreview && (
          <div className="image-preview">
            <img src={imagePreview} alt="Preview" width="150" />
          </div>
        )}
      </div>
      <button type="submit">Add data</button>
    </form>
  );
};

export default AddUserData
