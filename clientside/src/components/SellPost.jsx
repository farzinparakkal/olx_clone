import React, { useState } from "react"
import './SellPost.css'
import { useNavigate } from "react-router-dom"
import axios from "axios";

const SellPost = () => {
    const navigate=useNavigate()
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    images: [],
    description: "",
    price: "",
  })

  const [imagePreviews, setImagePreviews] = useState([])
  const token = localStorage.getItem("token")


  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
    })
  }

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    const base64Images = await Promise.all(files.map((file) => convertBase64(file)))
    setFormData((prev) => ({ ...prev, images: base64Images }))
    setImagePreviews(base64Images)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
        const res= await axios.post("http://localhost:3002/api/addPost", formData, {
            headers: { Authorization: `Bearer ${token}` },
          });

      if (res.status==201) {
        alert("Product added successfully!")
        navigate('/profile')
      } else {
        alert("Failed to add product!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <div>
        <label>Title:</label>
        <input type="text" name="title" value={formData.title} onChange={handleChange} required />
      </div>
      <div>
        <label>Category:</label>
        <select name="category" value={formData.category} onChange={handleChange} required>
          <option value="" disabled>
            Select Category
          </option>
          <option value="bike">Bike</option>
          <option value="car">Car</option>
          <option value="pet">Pet</option>
          <option value="phone">Phone</option>
          <option value="electronics">Electronics</option>
          <option value="home appliance">Home Appliance</option>
        </select>
      </div>
      <div>
        <label>Images:</label>
        <input type="file" accept="image/*" multiple onChange={handleImageChange} required />
        <div className="image-previews">
          {imagePreviews.map((src, index) => (
            <img key={index} src={src} alt={`Preview ${index}`} width="100" />
          ))}
        </div>
      </div>
      <div>
        <label>Description:</label>
        <textarea name="description" value={formData.description} onChange={handleChange} required />
      </div>
      <div>
        <label>Price:</label>
        <input type="text" name="price" value={formData.price} onChange={handleChange} required />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default SellPost
