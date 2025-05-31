import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Volume2, Check, X, Award } from 'lucide-react';

const LessonPage = () => {
  const { id } = useParams<{ id: string }>();
  const lessonId = parseInt(id || '1', 10);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  
  // This is placeholder lesson data - in a real app, this would come from an API call
  const lesson = {
    id: lessonId,
    title: 'Basic Greetings',
    unitId: 1,
    unitTitle: 'Basics',
    steps: [
      {
        type: 'introduction',
        title: 'Welcome to Basic Greetings!',
        content: 'In this lesson, you will learn common Tagalog greetings used in everyday conversations.'
      },
      {
        type: 'vocabulary',
        title: 'Greetings Based on Time',
        words: [
          { tagalog: 'Magandang umaga', english: 'Good morning', audio: '' },
          { tagalog: 'Magandang hapon', english: 'Good afternoon', audio: '' },
          { tagalog: 'Magandang gabi', english: 'Good evening', audio: '' }
        ]
      },
      {
        type: 'vocabulary',
        title: 'Common Phrases',
        words: [
          { tagalog: 'Kamusta?', english: 'How are you?', audio: '' },
          { tagalog: 'Mabuti naman', english: 'I\'m fine', audio: '' },
          { tagalog: 'Salamat', english: 'Thank you', audio: '' }
        ]
      },
      {
        type: 'quiz',
        question: 'What is the Tagalog greeting for "Good morning"?',
        options: [
          'Magandang gabi',
          'Magandang umaga',
          'Magandang hapon',
          'Kamusta'
        ],
        correctIndex: 1
      },
      {
        type: 'quiz',
        question: 'How do you say "Thank you" in Tagalog?',
        options: [
          'Kamusta',
          'Mabuti naman',
          'Salamat',
          'Magandang araw'
        ],
        correctIndex: 2
      },
      {
        type: 'completion',
        title: 'Lesson Complete!',
        message: 'Great job completing the Basic Greetings lesson! You\'ve learned some essential Tagalog phrases to start conversations.'
      }
    ]
  };
  
  const currentStepData = lesson.steps[currentStep];
  
  const handleNext = () => {
    if (currentStep < lesson.steps.length - 1) {
      setCurrentStep(currentStep + 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
    } else if (currentStep === lesson.steps.length - 1) {
      setShowCelebration(true);
      // In a real app, you would call an API to mark the lesson as completed
    }
  };
  
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
    }
  };
  
  const handleAnswerSelect = (index: number) => {
    if (isCorrect !== null) return; // Prevent changing answer after submission
    
    setSelectedAnswer(index);
  };
  
  const checkAnswer = () => {
    if (selectedAnswer === null || isCorrect !== null) return;
    
    const quizStep = currentStepData as { type: string, correctIndex: number };
    setIsCorrect(selectedAnswer === quizStep.correctIndex);
  };

  const renderStepContent = () => {
    switch (currentStepData.type) {
      case 'introduction':
        return (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center max-w-lg mx-auto"
          >
            <h2 className="text-2xl font-bold mb-4">{currentStepData.title}</h2>
            <p className="text-gray-600 mb-8">{currentStepData.content}</p>
            <img 
              src="https://images.pexels.com/photos/3760813/pexels-photo-3760813.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
              alt="People greeting each other" 
              className="rounded-lg shadow-md mx-auto mb-8 max-w-full h-auto"
            />
          </motion.div>
        );
        
      case 'vocabulary':
        return (
          <motion.div
            key="vocabulary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-2xl font-bold mb-6 text-center">{currentStepData.title}</h2>
            <div className="space-y-4">
              {currentStepData.words.map((word, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.2 }}
                  className="bg-white rounded-lg shadow-sm p-5 flex items-center justify-between"
                >
                  <div>
                    <h3 className="text-xl font-semibold text-primary-600">{word.tagalog}</h3>
                    <p className="text-gray-600">{word.english}</p>
                  </div>
                  <button className="p-2 rounded-full bg-primary-50 text-primary-600 hover:bg-primary-100 transition">
                    <Volume2 size={20} />
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );
        
      case 'quiz':
        return (
          <motion.div
            key="quiz"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-2xl font-bold mb-6 text-center">Quiz Time!</h2>
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <p className="text-xl mb-6">{currentStepData.question}</p>
              <div className="space-y-3">
                {currentStepData.options.map((option, idx) => (
                  <button
                    key={idx}
                    className={`w-full p-4 rounded-lg border text-left transition ${
                      selectedAnswer === idx 
                        ? isCorrect === null
                          ? 'border-primary-500 bg-primary-50'
                          : isCorrect
                            ? idx === currentStepData.correctIndex
                              ? 'border-success-500 bg-success-50'
                              : 'border-error-500 bg-error-50'
                            : idx === currentStepData.correctIndex
                              ? 'border-success-500 bg-success-50'
                              : 'border-error-500 bg-error-50'
                        : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50'
                    }`}
                    onClick={() => handleAnswerSelect(idx)}
                    disabled={isCorrect !== null}
                  >
                    <div className="flex items-center justify-between">
                      <span>{option}</span>
                      {isCorrect !== null && idx === currentStepData.correctIndex && (
                        <Check className="text-success-500" />
                      )}
                      {isCorrect !== null && idx !== currentStepData.correctIndex && selectedAnswer === idx && (
                        <X className="text-error-500" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
            
            {isCorrect === null && selectedAnswer !== null && (
              <button 
                onClick={checkAnswer}
                className="btn-primary w-full"
              >
                Check Answer
              </button>
            )}
            
            {isCorrect !== null && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-lg ${isCorrect ? 'bg-success-50 text-success-700' : 'bg-error-50 text-error-700'} mb-6`}
              >
                {isCorrect 
                  ? 'Correct! Great job!' 
                  : `Incorrect. The correct answer is "${currentStepData.options[currentStepData.correctIndex]}".`
                }
              </motion.div>
            )}
          </motion.div>
        );
        
      case 'completion':
        return (
          <motion.div
            key="completion"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center max-w-lg mx-auto"
          >
            <div className="mb-8 flex justify-center">
              <div className="relative">
                <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center">
                  <Award size={48} className="text-primary-600" />
                </div>
                <div className="absolute -top-3 -right-3 bg-accent-peach text-gray-800 rounded-full w-10 h-10 flex items-center justify-center font-bold">
                  +25
                </div>
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-4">{currentStepData.title}</h2>
            <p className="text-gray-600 mb-8">{currentStepData.message}</p>
            <div className="p-4 bg-accent-blue-light rounded-lg text-gray-700 mb-8">
              <p className="font-medium">Remember:</p>
              <p>Practice makes perfect! Try using these greetings in your daily conversations.</p>
            </div>
          </motion.div>
        );
        
      default:
        return null;
    }
  };

  if (showCelebration) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center min-h-[60vh]"
      >
        <div className="text-center max-w-md">
          <motion.div 
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: 'spring' }}
            className="w-32 h-32 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-8"
          >
            <Award size={64} className="text-primary-600" />
          </motion.div>
          
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-bold mb-4"
          >
            Congratulations!
          </motion.h1>
          
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-gray-600 mb-8"
          >
            You've completed the {lesson.title} lesson and earned 25 XP! Keep up the great work.
          </motion.p>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to={`/unit/${lesson.unitId}`} className="btn-secondary">
              Back to Unit
            </Link>
            <Link to="/dashboard" className="btn-primary">
              Dashboard
            </Link>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="min-h-[80vh] flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm py-4 px-6 mb-8">
        <div className="flex items-center justify-between">
          <Link to={`/unit/${lesson.unitId}`} className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
            <ChevronLeft size={20} />
            <span>Back to Unit {lesson.unitId}: {lesson.unitTitle}</span>
          </Link>
          
          <div className="text-sm text-gray-500">
            Step {currentStep + 1} of {lesson.steps.length}
          </div>
        </div>
        
        <div className="mt-4 w-full bg-gray-200 rounded-full h-1.5">
          <div 
            className="bg-primary-500 h-1.5 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / lesson.steps.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 mb-8">
          {renderStepContent()}
        </div>
        
        {/* Navigation Buttons */}
        <div className="mt-auto flex justify-between">
          <button 
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className={`flex items-center gap-1 px-4 py-2 rounded ${
              currentStep === 0 
                ? 'text-gray-400 cursor-not-allowed' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <ChevronLeft size={16} /> Previous
          </button>
          
          <button 
            onClick={handleNext}
            disabled={currentStepData.type === 'quiz' && isCorrect === null}
            className={`flex items-center gap-1 px-4 py-2 rounded ${
              currentStepData.type === 'quiz' && isCorrect === null && selectedAnswer !== null
                ? 'bg-primary-500 text-white hover:bg-primary-600'
                : currentStepData.type === 'quiz' && isCorrect === null
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-primary-500 text-white hover:bg-primary-600'
            }`}
          >
            {currentStep === lesson.steps.length - 1 ? 'Complete' : 'Next'} <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LessonPage;