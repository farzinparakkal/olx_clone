import React, { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"

const EditPost = () => {
  const { id } = useParams();
  
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    images: [],
    description: "",
    price: "",
  });

  const [imagePreviews, setImagePreviews] = useState([]);
  const token=localStorage.getItem('token')

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:3002/api/getPost/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          
          if(res.status==200){
            const product=res.data.post
            setFormData({
          title: product.title,
          category: product.category,
          images: product.images,
          description: product.description,
          price: product.price,
        });
        setImagePreviews(product.images);
          }
          
      } catch (error) {
        console.error("Error fetching product:", error);
        alert("Failed to load product data.");
      }
    };

    fetchProduct();
  }, [id]);

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  
  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    const base64Images = await Promise.all(files.map((file) => convertBase64(file)));
    setFormData((prev) => ({ ...prev, images: base64Images }));
    setImagePreviews(base64Images);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.put(`http://localhost:3002/api/updatePost/${id}`, formData, {
            headers: { Authorization: `Bearer ${token}` },
        });
      
        if (response.status === 201) {
          alert("Product updated successfully!");
          navigate(`/viewUserPost/${id}`);
        } else {
          alert("Failed to update product!");
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
        <input type="file" accept="image/*" multiple onChange={handleImageChange} />
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
      <button type="submit">Update</button>
    </form>
  );
};

export default EditPost
