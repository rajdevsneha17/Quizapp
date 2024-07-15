import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Navbar from '../Components/Navbar';
const AssessmentPage = () => {
  const questions = [
    {
        question: 'Question 1: What is your favorite color?',
        options: [
          { option: 'Red', score: 2 },
          { option: 'Blue', score: 3 },
          { option: 'Green', score: 1 },
          { option: 'Yellow', score: 4 }
        ]
      },
      {
        question: 'Question 2: How do you spend your free time?',
        options: [
          { option: 'Reading', score: 3 },
          { option: 'Watching movies', score: 2 },
          { option: 'Exercising', score: 4 },
          { option: 'Gaming', score: 1 }
        ]
      },
      {
        question: 'Question 3: What is your favorite food?',
        options: [
          { option: 'Pizza', score: 4 },
          { option: 'Burger', score: 3 },
          { option: 'Salad', score: 2 },
          { option: 'Pasta', score: 1 }
        ]
      },
      {
        question: 'Question 4: Which season do you prefer?',
        options: [
          { option: 'Spring', score: 3 },
          { option: 'Summer', score: 4 },
          { option: 'Autumn', score: 2 },
          { option: 'Winter', score: 1 }
        ]
      },
      {
        question: 'Question 5: What kind of movies do you like?',
        options: [
          { option: 'Action', score: 3 },
          { option: 'Comedy', score: 2 },
          { option: 'Drama', score: 4 },
          { option: 'Horror', score: 1 }
        ]
      },
  ];
const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [error, setError] = useState('');

  const handleOptionSelect = (optionIndex) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = questions[currentQuestionIndex].options[optionIndex].score;
    setAnswers(newAnswers);
    setError('');
  };

  const handleNextQuestion = () => {
    if (answers[currentQuestionIndex] === null) {
      setError('Please select an answer.');
      return;
    }
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };
  const handleFinishAssessment = () => {
    if (answers[currentQuestionIndex] === null) {
      setError('Please select an answer before proceeding.');
    } else {
      const totalScore = answers.reduce((total, score) => total + (score || 0), 0);
      localStorage.setItem('totalScore', totalScore);
      localStorage.setItem('maxScore', questions.length * 4);

      const userLoginData = localStorage.getItem('userLoginData');
      const userSignupData = localStorage.getItem('userSignupData');
      
      if (!userLoginData && !userSignupData) {
        localStorage.setItem('intendedDestination', 'score');
        toast.error("You must have an accout")
        navigate('/signup'); // or navigate('/login')
      } else {
        navigate('/score', { state: { totalScore, maxScore: questions.length * 4 } });
      }
    }
  };
  return (
    <div>
        <div><Navbar></Navbar></div>
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-center">Assessment Questions</h2>
        {currentQuestionIndex < questions.length && questions[currentQuestionIndex]?.options ? (
          <div>
            <h3 className="text-lg font-bold">{questions[currentQuestionIndex].question}</h3>
            {questions[currentQuestionIndex].options.map((option, optionIndex) => (
              <div key={optionIndex} className="mb-2">
                <input
                  type="radio"
                  id={`option_${currentQuestionIndex}_${optionIndex}`}
                  name={`question_${currentQuestionIndex}`}
                  checked={answers[currentQuestionIndex] === option.score}
                  onChange={() => handleOptionSelect(optionIndex)}
                  className="mr-2"
                />
                <label htmlFor={`option_${currentQuestionIndex}_${optionIndex}`}>{option.option}</label>
              </div>
            ))}
            {error && <p className="text-red-500">{error}</p>}
            <div className="mt-4">
              {currentQuestionIndex < questions.length - 1 ? (
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                  onClick={handleNextQuestion}
                >
                  Next
                </button>
              ) : (
                <button
                  className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700"
                  onClick={handleFinishAssessment}
                >
                  Finish Assessment
                </button>
              )}
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
    </div>
  );
};

export default AssessmentPage;


