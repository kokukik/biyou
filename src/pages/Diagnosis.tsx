import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

const personalityQuestions = [
  {
    id: 1,
    question: '夏休みの宿題はどう進めましたか？',
    options: [
      { value: 'ant', label: '早めに終わらせた' },
      { value: 'grasshopper', label: '残り3日で片付けた' },
      { value: 'dolphin', label: '計画を立ててコツコツやった' },
    ],
  },
  {
    id: 2,
    question: '勉強スタイルはどちらですか？',
    options: [
      { value: 'dog', label: '言われた通りに進める' },
      { value: 'cat', label: '納得しないと始められない' },
    ],
  },
  // Add more questions here
];

export default function Diagnosis() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [selectedValue, setSelectedValue] = useState<string>('');

  const handleNext = () => {
    if (selectedValue) {
      setAnswers(prev => ({ ...prev, [currentQuestion]: selectedValue }));
      if (currentQuestion < personalityQuestions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedValue('');
      } else {
        navigate('/diagnosis/result', { state: { answers } });
      }
    }
  };

  const question = personalityQuestions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
      <div className="max-w-2xl w-full mx-4">
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <div className="mb-8">
            <div className="text-sm text-gray-500 mb-2">
              質問 {currentQuestion + 1} / {personalityQuestions.length}
            </div>
            <h2 className="text-2xl font-semibold text-gray-900">
              {question.question}
            </h2>
          </div>

          <RadioGroup
            value={selectedValue}
            onValueChange={setSelectedValue}
            className="space-y-4"
          >
            {question.options.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value} id={option.value} />
                <Label htmlFor={option.value}>{option.label}</Label>
              </div>
            ))}
          </RadioGroup>

          <div className="mt-8 flex justify-end">
            <Button
              onClick={handleNext}
              disabled={!selectedValue}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {currentQuestion === personalityQuestions.length - 1 ? '結果を見る' : '次へ'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}