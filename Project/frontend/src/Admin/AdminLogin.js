import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function AdminLogin() {
    const navigate = useNavigate();
    const [admin,setAdmin] = useState({ admin_email:'', admin_password:''})

//function to handle the form
const handleSubmit = (e) =>{
    e.preventDefault();
    axios.post("http://localhost:3001/admin_login",admin)
    .then(result=>{
        if(result.data.Status){  alert("Successfully Logged In!");  navigate('/home')  }
             else{  alert(result.data.Error) }
     })
    .catch(err=>console.log(err))
}
    return (
        <div className='d-flex justify-content-center align-items-center vh-100'
style={{backgroundImage:`url("https://wallpaperaccess.com/full/1492615.jpg")`,backgroundSize: 'cover',}}>
            <div className='p-3 rounded w-25' style={{backgroundColor:'#3D405B',color:'#F4F1DE'}}>
                <h2><i className='fs-1 bi-person  d-flex justify-content-center align-item-center'></i></h2>
                <h3 className='d-flex justify-content-center align-item-center'>Admin Log In</h3>
                <form action='' onSubmit={handleSubmit} >
                    <div className='mb-3'>
                        <label htmlFor='email'><strong>Email</strong></label>
                        <input type='email' placeholder='Enter Email' required
                         onChange={(e) =>    setAdmin({ ...admin, admin_email: e.target.value })   } 
                         name='admin_email' autoComplete='off'
                        className='form-control rounded-0'/>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='password'><strong>Password</strong></label>
                        <input type='password' placeholder='Enter Password' required
                           onChange={(e) =>    setAdmin({ ...admin, admin_password: e.target.value })   } 
                           name='admin_password' autoComplete='off'
                        className='form-control rounded-0'/>
                    </div>
                        <button type="submit" className='btn btn-success w-100 rounded-0'><strong>Log in</strong></button> 
                        <br/>
                    <p> <br/> You are agree to our terms and policies</p>
                    <Link to="/adminsignup" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Create Account</Link> 
                        <hr/>
                        <p><i class="bi bi-file-person"></i> Go to the User Login ...  <Link to="/student">Here</Link></p>
                </form> </div> </div>)
}

export default AdminLogin