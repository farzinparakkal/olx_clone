import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./EnqPost.scss"
import axios from "axios"

const EnqPage = () => {
    const navigate = useNavigate()

  const [description, setDescription] = useState("")
  const [negprice, setNegotiationPrice] = useState("")
  const [sellerNote, setSellerNote] = useState("");
  const price = parseFloat(localStorage.getItem("price")) || 0;

  const productId = localStorage.getItem("productId")
  const token = localStorage.getItem("token")
  const sellerId=localStorage.getItem('sellerId')
  

  const handleNegotiationPriceChange = (e) => {
    const enteredPrice = parseFloat(e.target.value);
    setNegotiationPrice(enteredPrice);

    if (enteredPrice < 0.9 * price) {
      setSellerNote("Seller doesn't agree with this rate");
    } else {
      setSellerNote("Seller does agree with this rate");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {sellerId, description, productId, negprice };

    try {
      if (!token) {
        // throw new Error("Token not found");
        // navigate('/login')
        console.log("token not found");
        
      }

      const response = await axios.post("http://localhost:3002/api/enqPost",data,{
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status==201) {
        alert(response.data.msg)
        localStorage.removeItem('price')
        localStorage.removeItem('sellerId')
        localStorage.removeItem('productId')
        navigate('/')
      } else {
        alert("Failed to submit enquiry. Please try again.")
      }
    } catch (error) {
      console.error(error)
      navigate('/login')

      // Handle missing token
    //   if (error.message === "Token not found") {
    //     alert("Session expired. Please log in again.")
    //     navigate("/login")
    //   } else {
    //     alert("An error occurred. Please try again.")
    //   }
    }
  }

  return (
    <div className="enquiry-container">
      <form className="enquiry-form" onSubmit={handleSubmit}>
        <h2>Submit an Enquiry</h2>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter your description here..."
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="negotiationPrice">Negotiation Price:</label>
          <input
            type="number"
            id="negotiationPrice"
            value={negprice}
            onChange={handleNegotiationPriceChange}
            placeholder="Enter your price..."
            required
          />
        </div>
        {sellerNote && <p className="seller-note">{sellerNote}</p>}
        <button type="submit">Submit Enquiry</button>
      </form>
    </div>
  );
};

export default EnqPage;
