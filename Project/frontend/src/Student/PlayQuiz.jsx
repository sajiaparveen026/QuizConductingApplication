import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Result from './Result';
import Question from './Question'; 

const PlayQuiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [markedAnswers, setMarkedAnswers] = useState([]);
  const [studentId, setStudentId] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [quizResultSaved, setQuizResultSaved] = useState(false);

  useEffect(() => {
    // Extract student_id and category_id from the URL
    const pathname = window.location.pathname;
    const pathParts = pathname.split('/');
    const studentId = pathParts[3];
    const categoryId = pathParts[5];

    // Set student_id and category_id in state
    setStudentId(studentId);
    setCategoryId(categoryId);
    const fetchQuestions = async () => {
      const categoryId = window.location.pathname.split('/').pop();
      try {
        //Getting Questions from the particular category_id
        const response = await axios.get(`http://localhost:3001/get_question/${categoryId}`); 
        setQuestions(response.data.Result); // Assuming the response data is an array of questions
        setMarkedAnswers(new Array(response.data.length).fill(-1));
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, []);

  // Function to handle Answer when student choose one option
  const handleSetAnswer = (question, index) => {
    setMarkedAnswers((prevAnswers) => {
      const newArr = [...prevAnswers];
      newArr[questions.indexOf(question)] = index;
      return newArr;
    });
    // increasing question index to move to the next question
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };
  
  // Checking if quesiton is over
  const isQuestionEnd = currentQuestionIndex === questions.length;

  //Calculating result of the student
  const calculateResult = () =>{
    let correct = 0;
    questions.forEach((question,index)=>{
      // checking the answer is correct or not
     if(question.correct == markedAnswers[index]){
      correct++;
     }
    })
    return {
      total:questions.length,
      correct:correct,
      percentage:Math.trunc((correct/questions.length)*100)
    }
  }

  useEffect(() => {
    if (isQuestionEnd) {
      const saveQuizResult = async () => {
        try {
          // Storing Result to the database
          const response = await axios.post('http://localhost:3001/save_result', {
            student_id: studentId,
            category_id: categoryId,
            total_questions: questions.length,
            total_correct: calculateResult().correct,
            percentage: calculateResult().percentage  });
          console.log('Quiz result saved:', response.data);
          setQuizResultSaved(true); }
         catch (error) {console.error('Error saving quiz result:', error); }
      };
      saveQuizResult(); }
  }, [isQuestionEnd, studentId, categoryId, questions]);

  return (
    //Handle Quiz Question if questions are over redirect to the result section , if not the go to next question
    <div className='quiz-screen'>
      {isQuestionEnd ? (
        <Result  result={calculateResult()} />
      ) : (
        <Question
  question={questions[currentQuestionIndex]}
  totalQuestions={questions.length}
  currentQuestion={currentQuestionIndex + 1}
  setAnswer={(index) => handleSetAnswer(questions[currentQuestionIndex], index)}/>
      )}
    </div>);};

export default PlayQuiz;

