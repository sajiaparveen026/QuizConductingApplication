import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


const Categories = () => {
  const [category,setCategory] = useState([])
  useEffect(()=>{
    //Get Category information from the database
   axios.get('http://localhost:3001/category')
   .then(result =>{
   if(result.data.Status)
   { setCategory(result.data.Result);}
   else{ alert(result.data.Error); }
   })
   .catch(err=>console.log(err))
  },[])
  return (
    <div className='px-5 mt-5'>
      <div className='d-flex justify-content-center '>
       <h3 style={{color:'white'}}>Category List</h3>
      </div>
      <Link to='/home/add_category' className='btn btn-success'>+ Add Category</Link>

      <div className='mt-3'>
        <table className='table table-custom'>
          <thead>
            <tr> <th> Category Name</th></tr>
          </thead>
          <tbody>
          {
            category.map(c=>(
              <tr> <td>{c.category_name}</td> </tr> ))
          }
          </tbody>
        </table>
      </div> </div> )
}
export default Categories