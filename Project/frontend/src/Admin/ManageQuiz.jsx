import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link} from 'react-router-dom'
<link rel="stylesheet" href="style.css" />


const ManageQuiz = () => {
  const [quiz,setQuiz] = useState([]);
  useEffect(()=>{
    // Get quiz details from the database
  axios.get('http://localhost:3001/getquiz')
  .then(result =>{
    if(result.data.Status){ setQuiz(result.data.Result);}
    else{alert(result.data.Error);}
    }).catch(err=>console.log(err))
  },[])

  const [category,setCategory] = useState([])
  useEffect(()=>{
    //Get Category details from the database
   axios.get('http://localhost:3001/category')
   .then(result =>{
   if(result.data.Status)
   {  setCategory(result.data.Result); }
   else{ alert(result.data.Error);}
   }).catch(err=>console.log(err))
  },[])

  const handleDelete = (id) =>{
    //Delete Particular quiz based on the Id in the Database      
 axios.delete('http://localhost:3001/delete_quiz/'+id)
 .then(result=>{
  if(result.data.Status){ 
    window.location.reload()
  alert("Question Deleted!")
  }
  else{ alert(result.data.Error)}})
 .catch(err=>console.log(err));
  }

  return (
    <div className='px-5 mt-5'>
    <div className='d-flex justify-content-center '>
      <h3 style={{color:'white'}}>All Questions List</h3>
    </div>
    <Link to='/home/create_quiz' className='btn btn-success'>+ Create Question</Link>

    <div className='mt-3'>
        <table className='table table-custom'>
          <thead>
            <tr>
              <th>Question</th> <th>Option 1</th>
              <th>Option 2</th> <th>Option 3</th>
              <th>Option 4</th> <th>Correct </th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
          {
            quiz.map(q=>(
              <tr>
                <td>{q.question_name}</td>
                <td>{q.option1}</td>
                <td>{q.option2}</td>
                <td>{q.option3}</td>
                <td>{q.option4}</td>
                <td>{q.correct}</td>
                <td>{category.find(c=>c.category_id === q.category_id)?.category_name}</td>
                <td>
                  {/* Button to Edit the Quiz */}
                  <Link to={`/home/edit_quiz/`+q.question_id} className='btn btn-info btn-sm me-2 mb-2 px-3'>Edit</Link> 
                  {/* Button to Delete the Quiz */}
                 <Link className='btn btn-danger btn-sm' onClick={()=>handleDelete(q.question_id)}>Delete</Link>
                </td>
              </tr> ))   }
          </tbody>
        </table>
      </div>  </div> )}
export default ManageQuiz