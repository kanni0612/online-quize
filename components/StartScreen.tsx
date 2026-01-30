import React from 'react';
import { Difficulty } from '../types';
import Button from './Button';
import { Layout, Code2, BrainCircuit, Terminal } from 'lucide-react';

interface StartScreenProps {
  onStart: (difficulty: Difficulty) => void;
  isGenerating: boolean;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart, isGenerating }) => {
  const [selectedDifficulty, setSelectedDifficulty] = React.useState<Difficulty>(Difficulty.MID);

  const features = [
    { icon: <Code2 className="w-6 h-6 text-indigo-500" />, title: "Real-world Scenarios", desc: "Questions based on actual technical interviews." },
    { icon: <BrainCircuit className="w-6 h-6 text-indigo-500" />, title: "AI-Powered", desc: "Dynamic question generation powered by Gemini." },
    { icon: <Terminal className="w-6 h-6 text-indigo-500" />, title: "Instant Feedback", desc: "Detailed breakdown of your performance." },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
          Technical Interview <span className="text-indigo-600">Simulator</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
          Evaluate your technical readiness with our adaptive mock tests. 
          Simulate the pressure of a real exam environment.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {features.map((f, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="bg-indigo-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              {f.icon}
            </div>
            <h3 className="font-bold text-slate-900 mb-2">{f.title}</h3>
            <p className="text-slate-500 text-sm">{f.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200 max-w-lg mx-auto">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Configure Assessment</h2>
        
        <div className="mb-8">
          <label className="block text-sm font-medium text-slate-700 mb-3">Select Difficulty Level</label>
          <div className="space-y-3">
            {Object.values(Difficulty).map((diff) => (
              <div 
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedDifficulty === diff 
                    ? 'border-indigo-600 bg-indigo-50' 
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`font-medium ${selectedDifficulty === diff ? 'text-indigo-900' : 'text-slate-700'}`}>
                    {diff}
                  </span>
                  {selectedDifficulty === diff && (
                    <div className="w-4 h-4 rounded-full bg-indigo-600"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <Button 
          fullWidth 
          onClick={() => onStart(selectedDifficulty)}
          disabled={isGenerating}
        >
          {isGenerating ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Preparing Test Environment...
            </span>
          ) : "Start Assessment"}
        </Button>
      </div>
    </div>
  );
};

export default StartScreen;