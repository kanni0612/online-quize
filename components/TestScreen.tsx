import React, { useState } from 'react';
import { Question } from '../types';
import Button from './Button';
import { ChevronRight, ChevronLeft, CheckCircle2 } from 'lucide-react';

interface TestScreenProps {
  questions: Question[];
  onSubmit: (answers: Record<string, number>) => void;
}

const TestScreen: React.FC<TestScreenProps> = ({ questions, onSubmit }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;
  const isAnswered = answers[currentQuestion.id] !== undefined;

  const handleOptionSelect = (optionIndex: number) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: optionIndex
    }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    onSubmit(answers);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 h-screen flex flex-col">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm font-medium text-slate-500 mb-2">
          <span>Question {currentIndex + 1} of {questions.length}</span>
          <span>{Math.round(progress)}% Completed</span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2.5">
          <div 
            className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300 ease-out" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Question Card */}
      <div className="flex-grow flex flex-col justify-center">
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
          <div className="p-6 md:p-8 bg-slate-50 border-b border-slate-100">
            <span className="inline-block px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold tracking-wide uppercase mb-4">
              {currentQuestion.topic}
            </span>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 leading-relaxed">
              {currentQuestion.questionText}
            </h2>
          </div>
          
          <div className="p-6 md:p-8 space-y-4">
            {currentQuestion.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleOptionSelect(idx)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center group ${
                  answers[currentQuestion.id] === idx
                    ? 'border-indigo-600 bg-indigo-50/50 shadow-sm'
                    : 'border-slate-100 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center flex-shrink-0 transition-colors ${
                   answers[currentQuestion.id] === idx ? 'border-indigo-600 bg-indigo-600' : 'border-slate-300 group-hover:border-slate-400'
                }`}>
                  {answers[currentQuestion.id] === idx && (
                    <div className="w-2.5 h-2.5 bg-white rounded-full" />
                  )}
                </div>
                <span className={`text-lg ${answers[currentQuestion.id] === idx ? 'font-medium text-indigo-900' : 'text-slate-700'}`}>
                  {option}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="mt-8 flex justify-between items-center py-6 bg-slate-50/90 backdrop-blur sticky bottom-0 border-t border-slate-200">
        <Button 
          variant="outline" 
          onClick={handlePrev} 
          disabled={currentIndex === 0}
          className="w-32"
        >
          <div className="flex items-center justify-center gap-1">
            <ChevronLeft size={20} /> Previous
          </div>
        </Button>

        {currentIndex === questions.length - 1 ? (
          <Button 
            onClick={handleSubmit}
            className="w-40 bg-green-600 hover:bg-green-700 focus:ring-green-500"
            disabled={Object.keys(answers).length < questions.length} // Optional: Require all answers?
          >
             <div className="flex items-center justify-center gap-2">
              Submit <CheckCircle2 size={20} />
            </div>
          </Button>
        ) : (
          <Button 
            onClick={handleNext} 
            className="w-32"
          >
            <div className="flex items-center justify-center gap-1">
              Next <ChevronRight size={20} />
            </div>
          </Button>
        )}
      </div>
    </div>
  );
};

export default TestScreen;