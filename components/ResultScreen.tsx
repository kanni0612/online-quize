import React from 'react';
import { Question } from '../types';
import Button from './Button';
import { Check, X, RotateCcw, Award } from 'lucide-react';

interface ResultScreenProps {
  questions: Question[];
  userAnswers: Record<string, number>;
  onRetry: () => void;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ questions, userAnswers, onRetry }) => {
  const correctCount = questions.reduce((acc, q) => {
    return acc + (userAnswers[q.id] === q.correctIndex ? 1 : 0);
  }, 0);

  const percentage = Math.round((correctCount / questions.length) * 100);
  
  let gradeColor = "text-red-600";
  let gradeText = "Needs Improvement";
  if (percentage >= 80) {
    gradeColor = "text-green-600";
    gradeText = "Excellent";
  } else if (percentage >= 60) {
    gradeColor = "text-yellow-600";
    gradeText = "Good Effort";
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Header Score Card */}
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8 text-center mb-12 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
        
        <div className="inline-flex items-center justify-center p-4 bg-indigo-50 rounded-full mb-6">
          <Award className="w-10 h-10 text-indigo-600" />
        </div>
        
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Assessment Complete</h2>
        <p className="text-slate-500 mb-8">Here is how you performed on this technical simulation.</p>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 mb-8">
          <div className="text-center">
            <div className="text-5xl font-black text-slate-900 mb-1">{correctCount}/{questions.length}</div>
            <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Score</div>
          </div>
          <div className="w-px h-16 bg-slate-200 hidden md:block"></div>
          <div className="text-center">
            <div className={`text-5xl font-black ${gradeColor} mb-1`}>{percentage}%</div>
            <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider">{gradeText}</div>
          </div>
        </div>

        <Button onClick={onRetry} variant="secondary">
          <div className="flex items-center gap-2">
            <RotateCcw size={18} /> Take New Test
          </div>
        </Button>
      </div>

      <h3 className="text-xl font-bold text-slate-900 mb-6 px-2">Detailed Review</h3>

      <div className="space-y-6">
        {questions.map((q, index) => {
          const userAnswer = userAnswers[q.id];
          const isCorrect = userAnswer === q.correctIndex;
          const isSkipped = userAnswer === undefined;

          return (
            <div key={q.id} className={`bg-white rounded-xl border-l-4 shadow-sm overflow-hidden ${isCorrect ? 'border-green-500' : 'border-red-500'}`}>
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-1 block">Question {index + 1} • {q.topic}</span>
                    <h4 className="text-lg font-semibold text-slate-900">{q.questionText}</h4>
                  </div>
                  <div className={`flex-shrink-0 ml-4 rounded-full p-2 ${isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {isCorrect ? <Check size={20} /> : <X size={20} />}
                  </div>
                </div>

                <div className="space-y-3">
                  {q.options.map((opt, optIdx) => {
                    let optionStyle = "bg-slate-50 border-slate-100 text-slate-600"; // Default
                    let icon = null;

                    if (optIdx === q.correctIndex) {
                      // This is the correct answer
                      optionStyle = "bg-green-50 border-green-200 text-green-800 font-medium";
                      icon = <Check size={16} className="text-green-600" />;
                    } else if (optIdx === userAnswer) {
                      // This is the user's WRONG answer
                      optionStyle = "bg-red-50 border-red-200 text-red-800";
                      icon = <X size={16} className="text-red-600" />;
                    }

                    return (
                      <div key={optIdx} className={`p-3 rounded-lg border flex items-center justify-between text-sm ${optionStyle}`}>
                        <span>{opt}</span>
                        {icon}
                      </div>
                    );
                  })}
                </div>
                
                {isSkipped && <p className="mt-4 text-sm text-orange-600 font-medium">⚠️ Question skipped</p>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ResultScreen;