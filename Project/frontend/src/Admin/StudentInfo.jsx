import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const StudentInfo = () => {
  const [student,setStudent] = useState([])

  useEffect(()=>{
    //Get All Student details from the database
    axios.get('http://localhost:3001/get_student')
    .then(result =>{
    if(result.data.Status)
    { setStudent(result.data.Result); }
    else{ alert(result.data.Error);}
    }).catch(err=>console.log(err))
   },[])

   const handleDelete = (id) =>{
    // Delete Particular student based on the id
    axios.delete('http://localhost:3001/delete_student/'+id)
    .then(result=>{
     if(result.data.Status){  alert("Registered Student Deleted!")
      window.location.reload()}
     else{ alert(result.data.Error) }
    })
     .catch(err=>console.log(err)); }

  return (
    <div className='px-5 mt-5'>
      <div className='d-flex justify-content-center '>
        <h3 style={{color:'white'}}>All Registered Students List</h3>
      </div>

      <div className='mt-3'>
        <table className='table table-custom'>
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Student Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {
            student.map(c=>(
              <tr>
                <td>{c.student_name}</td>
                <td>{c.student_email}</td>
                {/* Delete Student Button */}
         <td><Link className='btn btn-danger btn-sm' onClick={()=>handleDelete(c.student_id)}>Delete</Link></td>
              </tr>
            ))
          }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default StudentInfo