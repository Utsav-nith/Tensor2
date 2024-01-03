import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import "./add.css";
import toast from 'react-hot-toast';

const Add = () => {

  const users = {
    ownerEmail:"",
    recipientEmail:"",
    amount:"",
    status:"",
    dueDate:""
  }

  const [user, setUser] = useState(users);
  const navigate = useNavigate();

  const inputHandler = (e) =>{
      const {name, value} = e.target;
      setUser({...user, [name]:value});
  }

  const submitForm = async(e) =>{
    e.preventDefault();
    await axios.post("http://localhost:8080/api/create", user)
    .then((response)=>{
       toast.success(response.data.msg, {position:"top-right"})
       navigate("/")
    })
    .catch(error => console.log(error))
  }


  return (
    <div className='addUser'>
        <Link to={"/"}>Back</Link>
        <h3>Create Invoice</h3>
        <form className='addUserForm' onSubmit={submitForm}>
            <div className="inputGroup">
                <label htmlFor="ownerEmail">Owner Email</label>
                <input type="email" onChange={inputHandler} id="ownerEmail" name="ownerEmail" autoComplete='off' placeholder='abc@gmail.com' />
            </div>
            <div className="inputGroup">
                <label htmlFor="recipientEmail">Recipient Email</label>
                <input type="email" onChange={inputHandler} id="recipientEmail" name="recipientEmail" autoComplete='off' placeholder='def@gmail.com' />
            </div>
            <div className="inputGroup">
                <label htmlFor="amount">Amount</label>
                <input type="number" onChange={inputHandler} id="amount" name="amount" autoComplete='off' placeholder='Amount' />
            </div>
            <div className="inputGroup">
                <label htmlFor="status">Status</label>
                <input type="status" onChange={inputHandler} id="status" name="status" autoComplete='off' placeholder='status' />
            </div>
            <div className="inputGroup">
                <label htmlFor="dueDate">dueDate</label>
                <input type="date" value={user.dueDate} onChange={inputHandler} id="dueDate" name="dueDate" autoComplete='off' placeholder='DD/MM/YYYY' />
            </div>
            <div className="inputGroup">
                <button type="submit">Submit Invoice</button>
            </div>
        </form>
    </div>
  )
}

export default Add