import React, { useEffect, useState } from 'react';
import './EnqPage.scss';
import axios from 'axios';

const EnqPage = () => {
  const [enquiries, setEnquiries] = useState([]);
  const token = localStorage.getItem('token');

  const fetchEnquiries = async () => {
    try {
      const res = await axios.get('http://localhost:3002/api/enquiries', {
        headers: { Authorization: `Bearer ${token}` },
      });
      // console.log(res);
      
      setEnquiries(res.data);
      
    } catch (error) {
      console.error("Error fetching enquiries:", error);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  return (
    <div className="enquiries-page">
      <h1>Enquiries</h1>
      <table className="enquiries-table">
        <thead>
          <tr>
            <th>Buyer</th>
            <th>Product</th>
            <th>Negotiation Price</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {enquiries.map((enquiry, index) => (
            <tr key={index}>
              <td>{enquiry.buyer}</td> 
              <td>{enquiry.product}</td>  
              <td>${enquiry.negprice}</td>
              <td>{enquiry.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EnqPage;