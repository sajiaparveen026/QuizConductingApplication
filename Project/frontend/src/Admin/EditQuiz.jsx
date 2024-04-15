import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'


const EditQuiz = () => {
  const navigate = useNavigate();
    const {id} = useParams()
    const[quiz,setQuiz] = useState({
        question_name:'',option1:'',option2:'',
        option3:'',option4:'',correct:'',})
  useEffect(()=>{
    //Get Particular Quiz based on the Id
   axios.get('http://localhost:3001/getquiz/'+id)
   .then(result =>{
   setQuiz(quiz=>({
    ...quiz,
    question_name:result.data.Result[0].question_name,
    option1:result.data.Result[0].option1,
    option2:result.data.Result[0].option2,
    option3:result.data.Result[0].option3,
    option4:result.data.Result[0].option4,
    correct:result.data.Result[0].correct
   }))
   }).catch(err=>console.log(err))
  },[])
 
 const handleSubmit = (e) =>{
   e.preventDefault();
  //  Update Particular Quiz into the database
   axios.put('http://localhost:3001/edit_quiz/'+id,quiz)
   .then(result=>{
    if(result.data.Status)
    { alert("Question Edited!");navigate('/home/manageQuiz');}
    else{ alert(result.data.Error)}
   }).catch(err => console.log(err))
 }
  return (
    <div className='d-flex justify-content-center align-items-center mt-3'>
    <div className='p-3 rounded w-50 border'>
       <h2 className='text-center' style={{color:'white'}}>Edit Quiz</h2>
        <form className='row g-1' onSubmit={handleSubmit}>
            <div className='col-12'>
                <label htmlFor='question' className='form-label'><strong style={{color:'white'}}>Question: </strong></label>
                <input type='text' placeholder='Enter Question' 
                onChange={(e) =>    setQuiz({ ...quiz, question_name: e.target.value })   } 
                name='question' value={quiz.question_name} className='form-control rounded-0'/> 
              </div>

            <div className='col-12'>
                <label htmlFor='option1' className='form-label'><strong style={{color:'white'}}>Option 1: </strong></label>
                <input type='text' placeholder='Enter option 1'
                onChange={(e) =>    setQuiz({ ...quiz, option1: e.target.value })   } 
                name='option1' value={quiz.option1}  className='form-control rounded-0'/>
            </div>

            <div className='col-12'>
                <label htmlFor='option2' className='form-label'><strong style={{color:'white'}}>Option 2: </strong></label>
                <input type='text' placeholder='Enter option 2' 
                onChange={(e) =>    setQuiz({ ...quiz, option2: e.target.value })   } 
                name='option2' value={quiz.option2} className='form-control rounded-0'/>
            </div>

            <div className='col-12'>
                <label htmlFor='option3' className='form-label'><strong style={{color:'white'}}>Option 3: </strong></label>
                <input type='text' placeholder='Enter option 3' 
                onChange={(e) =>    setQuiz({ ...quiz, option3: e.target.value })   } 
                name='option3' value={quiz.option3} className='form-control rounded-0'/>
            </div>

            <div className='mb-3'>
                <label htmlFor='option4' className='form-label'><strong style={{color:'white'}}>Option 4: </strong></label>
                <input type='text' placeholder='Enter option 4' autoComplete='off'
                onChange={(e) =>    setQuiz({ ...quiz, option4: e.target.value })   } 
                name='option4' value={quiz.option4} className='form-control rounded-0'/>
            </div>

            <div className='col-12'>
                <label htmlFor='option1' className='form-label'><strong style={{color:'white'}}>Correct Answer: </strong></label>
                <input type='text' placeholder='Enter Correct Answer'
                onChange={(e) =>    setQuiz({ ...quiz, correct: e.target.value })   } 
                name='correct' value={quiz.correct}className='form-control rounded-0'/>
            </div>
           
            <div className="col-12">
            <button type="submit" className="btn btn-primary w-100"> Edit </button>
          </div>
        </form>
    </div></div> )
}

export default EditQuiz