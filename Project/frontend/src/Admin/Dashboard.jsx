
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Dashboard = () => {
    const [studentTotal , setStudentTotal] = useState(0)
    const [categoryTotal , setCategoryTotal] = useState(0)
    const [adminTotal , setAdminTotal] = useState(0)
    const [admins , setAdmins] = useState([])

  useEffect(()=>{
     studentCount();adminCount();categoryCount();AdminRecords();
  },[])

  const AdminRecords = () =>{
    // Get Admin Data from the Database
    axios.get('http://localhost:3001/admin_records')
    .then(result =>{
      if(result.data.Status){setAdmins(result.data.Result);}
      else{alert(result.data.Error);}
      }).catch(err=>console.log(err))
  }

  //Functions to Count total students , admins and categories
  const studentCount = () => {
    //Get Student Count
   axios.get('http://localhost:3001/student_count')
   .then(result => {
    if(result.data.Status){ setStudentTotal(result.data.Result[0].student)}})
  }
  const adminCount = () => {
    //Get Admin Count
   axios.get('http://localhost:3001/admin_count')
   .then(result => {
    if(result.data.Status){setAdminTotal(result.data.Result[0].admin)}})
  }
  const categoryCount = () =>{
    //Get Category Count
    axios.get('http://localhost:3001/category_count')
   .then(result => {
    if(result.data.Status){setCategoryTotal(result.data.Result[0].category)} })
  }

  return (
    <div>
      <div className='p-3 d-flex justify-content-around mt-3'>

       <div className='px-3 pt-2 pb-3 border shadow-sm w-25' style={{ backgroundColor: '#718355', color: '#fff' }}>
        <div className='text-center pb-1'>
          <h4><i className="bi bi-balloon-heart"></i> Admin</h4>
        </div> <hr />
        <div className='d-flex justify-content-between'>
          <h5>Total: </h5> <h5>{adminTotal}</h5>
        </div> </div>

       <div className='px-3 pt-2 pb-3 border shadow-sm w-25' style={{ backgroundColor: '#718355', color: '#fff' }}>
        <div className='text-center pb-1'>
         <h4><i className="bi bi-balloon-heart"></i> Category </h4>
        </div> <hr />
        <div className='d-flex justify-content-between'>
          <h5>Total: </h5><h5>{categoryTotal}</h5>
        </div> </div>

       <div className='px-3 pt-2 pb-3 border shadow-sm w-25' style={{ backgroundColor: '#718355', color: '#fff' }}>
        <div className='text-center pb-1'>
         <h4><i className="bi bi-balloon-heart"></i> Students</h4>
        </div> <hr />
        <div className='d-flex justify-content-between'>
          <h5>Total: </h5> <h5>{studentTotal}</h5>
        </div> </div>
          </div>

          {/* Displaying Admins Details */}
       <div className='mt-4 px-5 pt-3'>
        <h3 style={{color:'white'}}>List of Admins</h3>
        <table className='table table-custom' style={{ backgroundColor: '#F5EBE0' }} >
          <thead> <tr>   <th>Name</th>   <th>Email</th>
           </tr>
          </thead>
        <tbody>
        {admins.map(c => (
         <tr key={c.admin_id}>
            <td>{c.admin_name}</td>
            <td>{c.admin_email}</td>
          </tr>  ))}
        </tbody>
        </table>
       </div> </div>)
}

export default Dashboard