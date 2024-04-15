import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [student,setStudent] = useState({student_email:'',student_password:'',})

  const handleSubmit = (e) => {
    e.preventDefault();
    //Checking Student details in the databse
    axios.post("http://localhost:3001/student_login", student)
      .then(result => {  
        if (result.data.Status) { const student_id = result.data.Result;
          setStudent({ ...student, student_id });
          // if student is present redirect to the student dashboard
         alert("Student logged in successfully!"); navigate(`/student/home/${student_id}`);
        } else {  alert(result.data.Error);  } })
      .catch(err => console.log(err));
  }
      
  return (
    <div className='d-flex justify-content-center align-items-center vh-100'
    style={{ backgroundImage:`url("https://wallpaperaccess.com/full/1492615.jpg")`,
      backgroundSize: 'cover', }} >
        <div className='p-3 rounded w-25'style={{backgroundColor:'#3D405B',color:'#F4F1DE'}}>
        <h2><i className='fs-1 bi-person  d-flex justify-content-center align-item-center'></i></h2>
                <h3 className='d-flex justify-content-center align-item-center'>Student Log In</h3>
            <form action='' onSubmit={handleSubmit}>
            <div className='mb-3'>
                        <label htmlFor='email'><strong>Email</strong></label>
                        <input type='email' placeholder='Enter Email' required
                         onChange={(e) =>   setStudent ({ ...student, student_email: e.target.value })   } 
                         name='student_email'    className='form-control rounded-0'/>
                    </div>

                    <div className='mb-3'>
                        <label htmlFor='password'><strong>Password</strong></label>
                        <input type='password' placeholder='Enter Password' required
                           onChange={(e) =>    setStudent({ ...student, student_password: e.target.value })   } 
                           name='student_password'  className='form-control rounded-0'/>
                    </div>
                   
                    <button type="submit" className='btn btn-success w-100 rounded-0'><strong>Log in</strong></button> <br/>
                    <p> <br/> You are agree to our terms and policies</p>
                    <Link to="/signup" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Create Account</Link>  <hr/>
                  <p><i class="bi bi-file-person"></i> Go to the Admin login ... <Link to="/">Here</Link> </p> 
            </form>
        </div>  </div> )
}

export default Login