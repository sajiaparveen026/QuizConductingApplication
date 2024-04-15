import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const CreateQuiz = () => {
  const navigate = useNavigate();
    const[quiz,setQuiz] = useState({
        question_name:'',option1:'',option2:'', option3:'',
        option4:'',  correct:'',  category_id:'' })
    const [category,setCategory] = useState([])
  useEffect(()=>{
    //Get Category information from the Database
   axios.get('http://localhost:3001/category')
   .then(result =>{
   if(result.data.Status){ setCategory(result.data.Result);}
   else{alert(result.data.Error);}
   }).catch(err=>console.log(err))
  },[])

  const handleSubmit = (e) =>
  {
    e.preventDefault();
    // Storing Quiz data to the database
    axios.post("http://localhost:3001/create_quiz",quiz)
    .then(result=>{
       if(result.data.Status){alert("Question Created Successfully!");navigate('/home/manageQuiz')}
      else{alert(result.data.Error)}
    })
    .catch(err=>console.log(err))
  }

  return (
    <div className='d-flex justify-content-center align-items-center mt-3'>
    <div className='p-3 rounded w-50 border'>
       <h2 className='text-center'style={{color:'white'}}>Create Quiz</h2>
       {/* Create Quiz Form */}
        <form className='row g-1' onSubmit={handleSubmit}>
            <div className='col-12'>
                <label htmlFor='question' className='form-label'><strong style={{color:'white'}}>Question: </strong></label>
                <input type='text' placeholder='Enter Question' 
                onChange={(e) =>    setQuiz({ ...quiz, question_name: e.target.value })   } 
                name='question' className='form-control rounded-0'/></div>
            <div className='col-12'>
                <label htmlFor='option1' className='form-label'><strong style={{color:'white'}}>Option 1: </strong></label>
                <input type='text' placeholder='Enter option 1'
                onChange={(e) =>    setQuiz({ ...quiz, option1: e.target.value })   } 
                name='option1' className='form-control rounded-0'/></div>
            <div className='col-12'>
                <label htmlFor='option2' className='form-label'><strong style={{color:'white'}}>Option 2: </strong></label>
                <input type='text' placeholder='Enter option 2' 
                onChange={(e) =>    setQuiz({ ...quiz, option2: e.target.value })   } 
                name='option2' className='form-control rounded-0'/> </div>
            <div className='col-12'>
                <label htmlFor='option3' className='form-label'><strong style={{color:'white'}}>Option 3: </strong></label>
                <input type='text' placeholder='Enter option 3' 
                onChange={(e) =>    setQuiz({ ...quiz, option3: e.target.value })   } 
                name='option3' className='form-control rounded-0'/></div>
            <div className='mb-3'>
                <label htmlFor='option4' className='form-label'><strong style={{color:'white'}}>Option 4: </strong></label>
                <input type='text' placeholder='Enter option 4'
                onChange={(e) =>    setQuiz({ ...quiz, option4: e.target.value })   } 
                name='option4' className='form-control rounded-0'/></div>
            <div className='col-12'>
                <label htmlFor="category" className='form-label'>
                   <strong style={{color:'white'}}> Category</strong>
                </label>
                <select name="category" id="category" className='form-select'
                onChange={(e) => setQuiz({ ...quiz, category_id: e.target.value })   } >
                  <option>--SELECT--</option>
                    {category.map(c=>{return <option value={c.category_id} >{c.category_name}</option>
                    })}
                </select> </div>
            <div className='col-12'>
                <label htmlFor="correct" className='form-label'>
                   <strong style={{color:'white'}}> Correct</strong>
                </label>
                <select name="correct" id="correct" className='form-select'
                onChange={(e) =>    setQuiz({ ...quiz, correct: e.target.value })   } 
                >
                  <option>--SELECT--</option>
                   <option value="1">A</option>
                   <option value="2">B</option>
                   <option value="3">C</option>
                   <option value="4">D</option>
                </select>
            </div>
            <div className="col-12">
            <button type="submit" className="btn btn-primary w-100"> Create Now</button>
          </div>
        </form>
    </div></div> )
}

export default CreateQuiz