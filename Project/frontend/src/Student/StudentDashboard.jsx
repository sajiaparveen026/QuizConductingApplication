import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'


const StudentDashboard = () => {
  const {id} = useParams();
  const [categoryTotal , setCategoryTotal] = useState(0)
  const [questionTotal , setQuestionTotal] = useState(0)
  const [attemptTotal , setAttemptTotal] = useState(0)

  useEffect(()=>{
   categoryCount(); questionCount(); attemptCount();
  },[])

  const categoryCount = () =>{
    //Getting total category count from the database
    axios.get('http://localhost:3001/category_count')
   .then(result => {if(result.data.Status){ setCategoryTotal(result.data.Result[0].category)}
   })
  }

  const questionCount = () =>{
    //Getting total questions count from the database
    axios.get('http://localhost:3001/question_count')
    .then(result => {if(result.data.Status){setQuestionTotal(result.data.Result[0].quiz) }
    })
  }

  const attemptCount = () =>{
    //Getting total attempts count from the database of the particular student_id
    axios.get('http://localhost:3001/attempt_count/'+id)
    .then(result => { if(result.data.Status) { setAttemptTotal(result.data.Result);  }
    })
  }
  return (
    <div>
      <div className='p-3 d-flex justify-content-around mt-3'>
      <div className='px-3 pt-2 pb-3 border shadow-sm w-25' style={{ backgroundColor: '#287271', color: '#fff' }}>
      <div className='text-center pb-1'><h4><i className="bi bi-balloon-heart"></i> Categories</h4> </div>
        <hr />
        <div className='d-flex justify-content-between'>
          <h5>Total: </h5><h5>{categoryTotal}</h5>
        </div>
       </div>

      <div className='px-3 pt-2 pb-3 border shadow-sm w-25' style={{ backgroundColor: '#287271', color: '#fff' }}>
     <div className='text-center pb-1'><h4><i className="bi bi-balloon-heart"></i> Questions</h4></div>
        <hr />
        <div className='d-flex justify-content-between'>
          <h5>Total: </h5><h5>{questionTotal}</h5>
        </div>
       </div>
      <div className='px-3 pt-2 pb-3 border shadow-sm w-25' style={{ backgroundColor: '#287271', color: '#fff' }}>
      <div className='text-center pb-1'><h4><i className="bi bi-balloon-heart"></i> Attempts</h4></div>
        <hr />
        <div className='d-flex justify-content-between'>
          <h5>Total: </h5><h5>{attemptTotal}</h5>
        </div>
       </div>
      </div>
     

     {/* Rules and Introduction Section */}
      <div className='mt-2 px-5 pt-3'>
        <h4 style={{ fontStyle: 'italic'}}>Here are the Rules and the Instructions of the quiz ... </h4>
        <p className='rule'><i class="bi bi-pencil-fill"></i>  There are various categories containing Quiz questions.</p>
        <p className='rule'><i class="bi bi-pencil-fill"></i>  You can select 'Category' in which you want to play quiz.</p>
        <p className='rule'><i class="bi bi-pencil-fill"></i>  You will have '10 seconds' to Answer each question.</p>
        <p className='rule'><i class="bi bi-pencil-fill"></i>  Click on 'Next' button to move forward to the next question.</p>
        <p className='rule'><i class="bi bi-pencil-fill"></i>  You can not go back to the previous question.</p>
        <p className='rule'><i class="bi bi-pencil-fill"></i>  You can view all your results in the 'Test Report' section.</p>
        <p className='happy-quizzing'><i class="bi bi-emoji-smile"></i>  Happy Quizzing !</p>
       </div> </div>)}

export default StudentDashboard