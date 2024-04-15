import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const Profile = () => {
  const {id} = useParams();
  const [student,setStudent] = useState(
    {student_name:"",student_email:"" } );

  useEffect(()=>{
    //Getting student details of the particular id
    axios.get(`http://localhost:3001/student_detail/${id}`)
    .then(result =>{if(result.data.Status){setStudent(result.data.Result[0]); }
    else{alert(result.data.Error); }
    }).catch(err=>console.log(err))
   },[id])

  return (
    <div className='d-flex justify-content-center align-items-center h-75'>
    <div className='p-3 rounded w-25 border' style={{backgroundColor:'#48416c'}}>
      <h2><i className='fs-1 bi bi-person-lines-fill  d-flex justify-content-center align-item-center'></i></h2>
       <h2 className='d-flex justify-content-center align-itmes-center' style={{color:'white'}}>Your Profile</h2> <hr /> <hr style={{color:'white'}}/>
       <div className='d-flex justify-content-between'>
          <h5 style={{color:'white'}}>Name :  </h5> <p style={{color:'white'}}>{student.student_name}</p>
        </div>
        <hr style={{color:'white'}} />
       <div className='d-flex justify-content-between'>
          <h5 style={{color:'white'}}>Email :  </h5> <p style={{color:'white'}}>{student.student_email}</p>
        </div>
        <hr style={{color:'white'}}/><hr />
        <div>
          {/* Button to Edit Profile */}
        <Link to={`/student/home/`+id+`/edit_profile`} className='btn me-2 d-flex justify-content-center' style={{backgroundColor:'#9ac1ed'}}>Edit</Link> </div>
    </div>
</div> )}
export default Profile