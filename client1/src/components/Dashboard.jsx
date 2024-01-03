import React, { useEffect, useState } from 'react'
import axios from "axios";
import toast from "react-hot-toast";
import "./user.css";
import { Link } from 'react-router-dom'
import jsPDF from 'jspdf';

const Dashboard = () => {

  const [users, setUsers] = useState([]);
  // const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(()=>{

    const fetchData = async()=>{
        const response = await axios.get("http://localhost:8080/api/getall");
        setUsers(response.data);
    }

    fetchData();

  },[])

  const deleteUser = async(userId) =>{
      await axios.delete(`http://localhost:8080/api/delete/${userId}`)
      .then((respones)=>{
        setUsers((prevUser)=> prevUser.filter((user)=> user._id !== userId))
        toast.success(respones.data.msg, {position: 'top-right'})
      })
      .catch((error) =>{
        console.log(error);
      })
  }
  
  const generateInvoice = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/getone/${userId}`);
      const user = response.data;
  
      // Create a PDF document using jspdf
      const pdfDoc = new jsPDF();
      pdfDoc.text(`Invoice for ${user.recipientEmail}`, 10, 10);
      pdfDoc.text(`From: ${user.ownerEmail}`, 10, 20);
      pdfDoc.text(`Subject: Reminder for pending Rs.${user.amount} amount if it crosses the ${user.dueDate} then your access will be finished`, 10, 40);
      
      // Add more content as needed...
  
      // Save the PDF as a file
      pdfDoc.save(`invoice.pdf`);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  const handleRemindClick = async (user) => {
    const {recipientEmail}=user;
    try {
      await axios.post("http://localhost:8080/api/send-email", { userEmail: recipientEmail });
      console.log('Reminder sent successfully');
    } catch (error) {
      console.error('Error triggering reminder:', error);
    }
  };
  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };
  return (
    <div className='userTable'>
        <Link to={"/add"} className='addButton'>Add Invoice</Link>
        <table border={1} cellPadding={10} cellSpacing={0}>
            <thead>
                <tr>
                    <th>S.No.</th>
                    <th>Recipient Email</th>
                    <th>Amount(INR)</th>
                    <th>Status</th>
                    <th>DueDate</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    users.map((user, index)=>{
                        return(
                        <tr key={user._id}>
                            <td>{index + 1}</td>
                            <td>{user.recipientEmail}</td>
                            <td>Rs.{user.amount}</td>
                            <td>{user.status}</td>
                            <td>{formatDate(user.dueDate)}</td>
                            <td className='actionButtons'>
                                <button onClick={()=> deleteUser(user._id)}><i className="fa-solid fa-trash"></i></button>
                                <Link to={`/edit/`+user._id}><i className="fa-solid fa-pen-to-square"></i></Link>
                                <button onClick={()=> generateInvoice(user._id)}><i class="fa-solid fa-download"></i></button>
                                <button onClick={()=>handleRemindClick(user)}><i class="fa-solid fa-bell"></i></button>
                            </td>
                        </tr>
                        )
                    })
                }
                
            </tbody>
        </table>
    </div>
  )
}

export default Dashboard;
