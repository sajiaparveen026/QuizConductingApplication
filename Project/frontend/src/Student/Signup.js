import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Validation from './SignupValidation'
import axios from 'axios';

const Signup = () => {
    const [student, setStudent] = useState({
        student_email:'', student_password:'',  student_name:'' })

    const navigate = useNavigate();
    const [errors,setErrors] = useState({})
    //Function to handle submit
    const handleSubmit = (event) =>
    {
        event.preventDefault();
        setErrors(Validation(student));
        const err = (Validation(student));
        setErrors(err);
        //Checking validations
        if(err.name==="" && err.email==="" && err.password==="")
        {
            //Storing students information to the database
            axios.post('http://localhost:3001/signup',student)
            .then(result=>{if(result.data.Status){ alert("Student Signed up successfully!"); navigate('/student')    }
                         else{  alert(result.data.Error) }
             })
            .catch(err=>console.log(err));
        }

    }
  return (
    <div className='d-flex justify-content-center align-items-center vh-100'
    style={{backgroundImage:`url("https://wallpaperaccess.com/full/1492615.jpg")`,
        backgroundSize: 'cover' }}>
            
    <div className='p-3 rounded w-25' style={{backgroundColor:'#3D405B',color:'#F4F1DE'}}>
    <h2><i className='fs-1 bi-person  d-flex justify-content-center align-item-center'></i></h2>
                <h3 className='d-flex justify-content-center align-item-center'>Student Sign Up</h3>
        <form action='' onSubmit={handleSubmit}>
            <div className='mb-3'>
                <label htmlFor='name'><strong>Name</strong></label>
                <input type='name' placeholder='Enter Name'   name='student_name' required
               onChange={(e) =>    setStudent({ ...student, student_name: e.target.value })   } 
                className='form-control rounded-0'/>
                {errors.name && <span className='text-danger'>{errors.name}</span> }
            </div>
            <div className='mb-3'>
                <label htmlFor='email'><strong>Email</strong></label>
                <input type='email' placeholder='Enter Email'  name='student_email' required
                 onChange={(e) =>    setStudent({ ...student, student_email: e.target.value })   } 
                className='form-control rounded-0'
                />
                {errors.email && <span className='text-danger'>{errors.email}</span> }
            </div>
            <div className='mb-3'>
                <label htmlFor='password'><strong>Password</strong></label>
                <input type='password' placeholder='Enter Password' name='student_password' required
               onChange={(e) =>    setStudent({ ...student, student_password: e.target.value })   } 
                className='form-control rounded-0'/>
                {errors.password && <span className='text-danger'>{errors.password}</span> }
            </div>

         <button type="submit" className='btn btn-success w-100 rounded-0'><strong>Sign up</strong></button> 
                <p> <br/> You are agree to our terms and policies</p>
                <Link to="/student" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Log In </Link>
        </form>
    </div></div>  )
}

export default Signup