import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import "./add.css";
import toast from 'react-hot-toast';

const Edit = () => {

    const users = {
        ownerEmail:"",
        recipientEmail:"",
        amount:"",
        status:"",
        dueDate:""
      }

 const {id} = useParams();
 const navigate = useNavigate();
 const [user, setUser] = useState(users);

 const inputChangeHandler = (e) =>{
    const {name, value} = e.target;
    setUser({...user, [name]:value});
    console.log(user);
 }

 useEffect(()=>{
    axios.get(`http://localhost:8080/api/getone/${id}`)
    .then((response)=>{
        setUser(response.data)
    })
    .catch((error)=>{
        console.log(error);
    })
 },[id])


 const submitForm = async(e)=>{
    e.preventDefault();
    await axios.put(`http://localhost:8080/api/update/${id}`, user)
    .then((response)=>{
       toast.success(response.data.msg, {position:"top-right"})
       navigate("/")
    })
    .catch(error => console.log(error))
 }

  return (
    <div className='addUser'>
        <Link to={"/"}>Back</Link>
        <h3>Update Invoice</h3>
        <form className='addUserForm' onSubmit={submitForm}>
            <div className="inputGroup">
                <label htmlFor="ownerEmail">Owner Email</label>
                <input type="email" value={user.ownerEmail} onChange={inputChangeHandler} id="ownerEmail" name="ownerEmail" autoComplete='off' placeholder='Owner Email' />
            </div>
            <div className="inputGroup">
                <label htmlFor="lname">Recipient Email</label>
                <input type="email" value={user.recipientEmail} onChange={inputChangeHandler} id="recipientEmail" name="recipientEmail" autoComplete='off' placeholder='Recipient Email' />
            </div>
            <div className="inputGroup">
                <label htmlFor="amount">Amount(INR)</label>
                <input type="number" value={user.amount} onChange={inputChangeHandler} id="amount" name="amount" autoComplete='off' placeholder='Amount' />
            </div>
            <div className="inputGroup">
                <label htmlFor="status">Status</label>
                <input type="text" value={user.status} onChange={inputChangeHandler} id="status" name="status" autoComplete='off' placeholder='Status' />
            </div>
            <div className="inputGroup">
                <label htmlFor="dueDate">dueDate</label>
                <input type="date" value={user.dueDate} onChange={inputChangeHandler} id="dueDate" name="dueDate" autoComplete='off' placeholder='DD/MM/YYYY' />
            </div>
            <div className="inputGroup">
                <button type="submit">Update Invoice</button>
            </div>
        </form>
    </div>
  )
}

export default Edit