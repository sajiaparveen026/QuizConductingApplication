import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'


const EditProfile = () => {
  const navigate = useNavigate();
    const {id} = useParams()
    const[student,setStudent] = useState({
        student_name:'',
        student_email:''
    })
  useEffect(()=>{
    //Getting particular student from the id
   axios.get('http://localhost:3001/getstudent/'+id)
   .then(result =>{
   setStudent(student=>({
    ...student,
    student_name:result.data.Result[0].student_name,
    student_email:result.data.Result[0].student_email
   }))
   }).catch(err=>console.log(err))
  },[])
 
  //Function to handle form submit
 const handleSubmit = (e) =>{
   e.preventDefault();
   //Update Student information of the particular id
   axios.put('http://localhost:3001/edit_profile/'+id,student)
   .then(result=>{
    if(result.data.Status)
    { alert("Profile successfully Edited!");navigate(`/student/home/`+id+`/profile`); }
    else{ alert(result.data.Error)}
   })
   .catch(err => console.log(err))
 }

  return (
    <div className='d-flex justify-content-center align-items-center mt-3'>
    <div className='p-3 rounded w-50 border'>
       <h2 className='text-center'>Edit Profile</h2>
        <form className='row g-1' onSubmit={handleSubmit}>
            <div className='col-12'>
                <label htmlFor='name' className='form-label'><strong>Name: </strong></label>
                <input type='text' placeholder='Enter name' 
                onChange={(e) =>    setStudent({ ...student, student_name: e.target.value })   } 
                name='question' value={student.student_name}  className='form-control rounded-0'/>
            </div>
            <div className='col-12'>
                <label htmlFor='name' className='form-label'><strong>Email: </strong></label>
                <input type='text' placeholder='Enter name' 
                onChange={(e) =>    setStudent({ ...student, student_email: e.target.value })   } 
                name='question' value={student.student_email} className='form-control rounded-0'/>
            </div>
           
            <div className="col-12">
            <button type="submit" className="btn btn-primary w-100"> Edit </button>
          </div>
        </form>
    </div></div>)
}

export default EditProfile