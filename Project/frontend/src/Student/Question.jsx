import React, { useEffect, useRef, useState } from 'react';
import { flushSync } from "react-dom";

const Question = ({ question, totalQuestions, currentQuestion, setAnswer }) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const timer = useRef(null);
    const progressBar = useRef(null);

    function gotoNextQuestion() {
        //if the student will not chose answer before time it will automatically goes to the next
        if (timer.current) {clearTimeout(timer.current);}
        flushSync(() => { setAnswer(selectedOption); });
        setSelectedOption(null); }

    useEffect(() => {
        progressBar.current.classList.remove("active");
        setTimeout(() => { progressBar.current.classList.add("active");
        }, 0);
        timer.current = setTimeout(gotoNextQuestion, 10 * 1000); // 10 seconds
        return () => {  clearTimeout(timer.current); };
    }, [question]);

    return (
       <div className='quiz-container'>
         <div className='question'>
            <div className='progress-bar' ref={progressBar}></div>
            <div className='question-count'>
                <b>{currentQuestion}</b> of <b>{totalQuestions}</b>
            </div>
            <div className='main'>
                <div className='title'>
                    <span >Question: </span>  <p >{question.question_name}</p>
                </div>
                <div className='options'>
                    {Object.keys(question).map((key) => {
                        if (key.startsWith("option")) {
                            const index = parseInt(key.replace("option", ""));
                            return (
                                <div
                                //when student select one option it will change its state
                                    className={index === selectedOption ? "option active" : "option"}
                                    key={index} onClick={() => setSelectedOption(index)}>
                                    {question[key]}
                                </div>
                            );
                        } return null;  })}
                </div>
            </div>

            <div className='control'>
                {/* Button to go to the next quesotion */}
        <button className='next-btn' onClick={gotoNextQuestion}>Next <i class="bi bi-arrow-right"></i></button>
            </div>
        </div> </div> );
};

export default Question;
