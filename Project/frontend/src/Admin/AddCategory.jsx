import React, { useState } from 'react'
import {useNavigate } from 'react-router-dom'
import axios from 'axios';

const AddCategory = () => {
    const [category,setCategory] = useState();
    const navigate = useNavigate();
      //Function to handle form submit
    const handleSubmit = (e) =>
    { 
        e.preventDefault();
        axios.post("http://localhost:3001/add_categories",{category})
        .then(result => 
            {
                if(result.data.Status){ 
                    alert("Category Added!")
                    navigate('/home/categories') }
                else{  alert(result.data.Error) }
            })
        .catch(err=>console.log(err))
    }
    return (
        //Form to add the Category
    <div className='d-flex justify-content-center align-items-center h-75'>
     <div className='p-3 rounded w-25 border'>
     <h2 className='d-flex justify-content-center align-itmes-center' style={{color:'white'}}>Add Category</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'><hr />
                    <label htmlFor='category' style={{color:'white',fontSize:'20px'}}><strong>Category: </strong></label><hr />
                    <input type='text' placeholder='Enter Category' name='category'
                     onChange={(e) => setCategory(e.target.value)}   className='form-control rounded-0'/>
                    </div>
                        <button className='btn btn-success w-100 rounded-0 mb-2'>Save</button>
                </form></div></div>
      )
}
export default AddCategory