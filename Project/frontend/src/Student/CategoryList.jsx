import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const CategoryList = () => {
    const {id} = useParams()
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchQuestionCount = async (categoryId) => {
      try {
        // Get All Questions of the particular Category Id
        const result = await axios.get(`http://localhost:3001/question_count/${categoryId}`);
        return result.data.Status ? result.data.Result : 0;
      } catch (error) {console.log(error);
        return 0; }
    };

    const fetchData = async () => {
      try {
        // Getting all Ctaegories from the database
        const result = await axios.get('http://localhost:3001/category');
        if (result.data.Status) {
          const categoriesData = result.data.Result;
          const categoriesWithCounts = await Promise.all(
            categoriesData.map(async (category) => {
              const questionCount = await fetchQuestionCount(category.category_id);
              return { ...category, questionCount };  }) );
          setCategories(categoriesWithCounts);} 
        else { alert(result.data.Error);  } }
       catch (error) { console.log(error);}
    };

    fetchData();
  }, []);

  return (
    <div className='px-5 mt-4'>
      <div className='d-flex justify-content-center '>
        <h3 style={{fontStyle:'italic'}}>All Available Quizzes</h3>
      </div>

      <div className='mt-3'>
  <table className='table table-custom'>
    <thead>
      <tr>
        <th>Category Name</th>
        <th>Total Questions</th>
        <th>Play Quiz</th>
      </tr>
    </thead>
    <tbody>
      {categories.map(category => (
        <tr key={category.category_id}>
          <td className='font-italic'>{category.category_name}</td>
          <td>{category.questionCount[0].question_count}</td>
          <td>
            {/* Button to play the quiz which will redirect to quiz section */}
            <Link to={`/student/home/${id}/play_quiz/${category.category_id}`}>
              <button className='btn btn-success rounded-circle'><i className="bi bi-play fs-5"></i></button>
            </Link>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
    </div> );
};

export default CategoryList;
