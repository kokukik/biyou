import React, { useState } from 'react';
import { useDiagnosis } from '@/store/DiagnosisContext';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

const questions = {
  examTiming: {
    text: '受験予定の試験はいつですか？',
    options: [
      { value: 'next', label: '次回の国試（3月/9月）' },
      { value: 'future', label: '次回以降の国試' },
    ],
  },
  status: {
    text: '現在の状況は？',
    options: [
      { value: 'current', label: '現役生' },
      { value: 'graduate', label: '既卒生' },
    ],
  },
  previousExam: {
    text: '前回の試験結果は？',
    options: [
      { value: 'practicalOnly', label: '実技のみ合格' },
      { value: 'none', label: '実技・筆記ともに未合格' },
    ],
  },
  weakSubjects: {
    text: '苦手科目はありますか？（複数選択可）',
    options: [
      { value: 'law', label: '関係法規/運営管理' },
      { value: 'hygiene', label: '衛生管理' },
      { value: 'health', label: '保健' },
      { value: 'chemistry', label: '香粧品化学' },
      { value: 'theory', label: '美容理論/文化論' },
    ],
  },
};

interface Props {
  onComplete: () => void;
}

export default function DetailQuestions({ onComplete }: Props) {
  const { dispatch } = useDiagnosis();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});

  const questionIds = Object.keys(questions) as Array<keyof typeof questions>;
  const currentQuestionData = questions[questionIds[currentQuestion]];

  const handleAnswer = (value: string | string[]) => {
    const questionId = questionIds[currentQuestion];
    setAnswers(prev => ({ ...prev, [questionId]: value }));
    dispatch({
      type: 'SET_DETAIL_ANSWER',
      question: questionId,
      answer: value
    });

    if (currentQuestion < questionIds.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  const handleCheckboxChange = (checked: boolean, value: string) => {
    const currentValues = answers.weakSubjects || [];
    const newValues = checked
      ? [...currentValues, value]
      : currentValues.filter((v: string) => v !== value);
    
    handleAnswer(newValues);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <div className="mb-8">
        <div className="flex justify-between mb-4 text-sm text-gray-500">
          <span>詳細情報収集</span>
          <span>{currentQuestion + 1} / {questionIds.length}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-primary rounded-full h-2 transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questionIds.length) * 100}%` }}
          />
        </div>
      </div>

      <h2 className="text-2xl font-semibold mb-6">{currentQuestionData.text}</h2>

      {questionIds[currentQuestion] === 'weakSubjects' ? (
        <div className="space-y-4">
          {currentQuestionData.options.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <Checkbox
                id={option.value}
                checked={(answers.weakSubjects || []).includes(option.value)}
                onCheckedChange={(checked) => 
                  handleCheckboxChange(checked as boolean, option.value)
                }
              />
              <Label htmlFor={option.value}>{option.label}</Label>
            </div>
          ))}
          <Button
            className="mt-6"
            onClick={() => handleAnswer(answers.weakSubjects || [])}
          >
            次へ
          </Button>
        </div>
      ) : (
        <RadioGroup
          className="space-y-4"
          onValueChange={handleAnswer}
          value={answers[questionIds[currentQuestion]]}
        >
          {currentQuestionData.options.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <RadioGroupItem value={option.value} id={option.value} />
              <Label htmlFor={option.value}>{option.label}</Label>
            </div>
          ))}
        </RadioGroup>
      )}
    </div>
  );
}