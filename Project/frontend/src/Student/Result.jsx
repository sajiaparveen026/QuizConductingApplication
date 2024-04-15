import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Result = ({result}) => {
    const {id} = useParams();
   const navigate = useNavigate();

   //functions to handle buttons
    const retryHandle = () =>{  navigate(`/student/home/`+id+`/category_list`) }
    const reporthandle = () =>{  navigate(`/student/home/`+id+`/test_report`) }

  return (
   <div className='quiz-container'>
     <div className='result-screen'>
      <h2>Result:{result.percentage}%</h2>
    <p>Selected {result.correct} correct options out of {result.total} questions.</p>
    <button className='quiz-btn' onClick={retryHandle}>Retry</button>
    <button className='quiz-btn2' onClick={reporthandle}>Test Report</button>
    </div>  </div> )
}

export default Result