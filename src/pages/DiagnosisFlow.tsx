import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PersonalityQuestions from '@/components/diagnosis/PersonalityQuestions';
import PersonalityResult from '@/components/diagnosis/PersonalityResult';
import DetailQuestions from '@/components/diagnosis/DetailQuestions';

type DiagnosisStep = 'personality' | 'result' | 'details';

export default function DiagnosisFlow() {
  const navigate = useNavigate();
  const [step, setStep] = useState<DiagnosisStep>('personality');

  const handlePersonalityComplete = () => {
    setStep('result');
  };

  const handleContinueToDetails = () => {
    setStep('details');
  };

  const handleDetailsComplete = () => {
    navigate('/diagnosis/result');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {step === 'personality' && (
            <PersonalityQuestions onComplete={handlePersonalityComplete} />
          )}
          {step === 'result' && (
            <PersonalityResult onContinue={handleContinueToDetails} />
          )}
          {step === 'details' && (
            <DetailQuestions onComplete={handleDetailsComplete} />
          )}
        </div>
      </div>
    </div>
  );
}