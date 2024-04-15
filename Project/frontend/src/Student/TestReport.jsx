import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import { useParams } from 'react-router-dom';

const TestReport = () => {
  const {id} = useParams();
  const [reportData, setReportData] = useState([]);
  useEffect(()=>{
    // Getting particular student test report from the database
    axios.get('http://localhost:3001/get_report/'+id)
    .then(result =>{if(result.data.Status){ setReportData(result.data.Result);}
    else{alert(result.data.Error); }
    }).catch(err=>console.log(err))
   },[id])

  return (
    <div className='px-5 mt-5'>
    <div className='d-flex justify-content-center '>
      {/* Display Student Test Report */}
      <h3 style={{fontStyle:'italic'}}>All Test Records</h3>
    </div>

    <div className='mt-3'>
      <table className='table table-custom'>
        <thead>
          <tr>
            <th>Category Name</th>
            <th>Correct Answers</th>
            <th>Total Questions</th>
            <th>Percentage</th>
          </tr>
        </thead>
        <tbody>
        {
          reportData.map(c=>(
            <tr>
              <td>{c.category_name}</td>
              <td>{c.total_correct}</td>
              <td>{c.total_questions}</td>
              <td>{c.percentage}%</td>
            </tr>
          ))
        }
        </tbody>
      </table>
    </div> </div> );
};

export default TestReport;
