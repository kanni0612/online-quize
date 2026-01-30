import React, { useState } from 'react';
import StartScreen from './components/StartScreen';
import TestScreen from './components/TestScreen';
import ResultScreen from './components/ResultScreen';
import { Difficulty, Question, TestStatus } from './types';
import { generateTestQuestions } from './services/geminiService';
import { MonitorPlay } from 'lucide-react';

const App: React.FC = () => {
  const [status, setStatus] = useState<TestStatus>(TestStatus.IDLE);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});

  const handleStartTest = async (difficulty: Difficulty) => {
    setStatus(TestStatus.LOADING);
    const generatedQuestions = await generateTestQuestions(difficulty);
    setQuestions(generatedQuestions);
    setUserAnswers({});
    setStatus(TestStatus.IN_PROGRESS);
  };

  const handleSubmitTest = (answers: Record<string, number>) => {
    setUserAnswers(answers);
    setStatus(TestStatus.COMPLETED);
    window.scrollTo(0, 0);
  };

  const handleRetry = () => {
    setStatus(TestStatus.IDLE);
    setQuestions([]);
    setUserAnswers({});
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* Navbar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => status !== TestStatus.IN_PROGRESS && handleRetry()}>
            <div className="bg-indigo-600 p-1.5 rounded-lg">
               <MonitorPlay className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900">TechPrep</span>
          </div>
          <div className="text-sm font-medium text-slate-500">
             {status === TestStatus.IN_PROGRESS ? "Simulation Active" : "v1.0.0"}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {status === TestStatus.IDLE && (
          <StartScreen 
            onStart={handleStartTest} 
            isGenerating={false} 
          />
        )}

        {status === TestStatus.LOADING && (
          <StartScreen 
            onStart={() => {}} 
            isGenerating={true} 
          />
        )}

        {status === TestStatus.IN_PROGRESS && (
          <TestScreen 
            questions={questions} 
            onSubmit={handleSubmitTest} 
          />
        )}

        {status === TestStatus.COMPLETED && (
          <ResultScreen 
            questions={questions} 
            userAnswers={userAnswers} 
            onRetry={handleRetry} 
          />
        )}

        {status === TestStatus.ERROR && (
           <div className="flex flex-col items-center justify-center h-[80vh]">
              <h2 className="text-2xl font-bold text-red-600 mb-4">System Error</h2>
              <p className="text-slate-600 mb-6">Failed to initialize the simulation environment.</p>
              <button 
                onClick={handleRetry}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Return Home
              </button>
           </div>
        )}
      </main>
    </div>
  );
};

export default App;