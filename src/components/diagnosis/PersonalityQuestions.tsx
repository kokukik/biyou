import React, { useState } from 'react';
import { useDiagnosis } from '@/store/DiagnosisContext';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface Question {
  id: keyof typeof questions;
  text: string;
  options: { value: string; label: string }[];
}

const questions = {
  homework: {
    text: '夏休みの宿題はどう進めましたか？',
    options: [
      { value: 'early', label: '早めに終わらせた' },
      { value: 'lastMinute', label: '残り3日で片付けた' },
      { value: 'planned', label: '計画を立ててコツコツやった' },
    ],
  },
  studyStyle: {
    text: '勉強スタイルはどちらですか？',
    options: [
      { value: 'following', label: '言われた通りに進める' },
      { value: 'understanding', label: '納得しないと始められない' },
    ],
  },
  readingAbility: {
    text: '文章を読むのが苦手ですか？',
    options: [
      { value: 'yes', label: '当てはまる' },
      { value: 'no', label: '当てはまらない' },
    ],
  },
  focusTime: {
    text: '1回の勉強で集中できる時間はどれくらいですか？',
    options: [
      { value: 'short', label: '30分未満' },
      { value: 'medium', label: '30分〜1時間' },
      { value: 'long', label: '1時間以上' },
    ],
  },
};

interface Props {
  onComplete: () => void;
}

export default function PersonalityQuestions({ onComplete }: Props) {
  const { dispatch } = useDiagnosis();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const questionIds = Object.keys(questions) as Array<keyof typeof questions>;
  const currentQuestionData = questions[questionIds[currentQuestion]];

  const handleAnswer = (value: string) => {
    const questionId = questionIds[currentQuestion];
    setAnswers(prev => ({ ...prev, [questionId]: value }));
    dispatch({ 
      type: 'SET_PERSONALITY_ANSWER',
      question: questionId,
      answer: value
    });

    if (currentQuestion < questionIds.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      // Determine personality type based on answers
      const personalityType = determinePersonalityType(answers);
      dispatch({
        type: 'SET_PERSONALITY_TYPE',
        personalityType
      });
      onComplete();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <div className="mb-8">
        <div className="flex justify-between mb-4 text-sm text-gray-500">
          <span>パーソナリティ診断</span>
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
    </div>
  );
}

function determinePersonalityType(answers: Record<string, string>): PersonalityType {
  // Simple personality determination logic
  if (answers.homework === 'early' || answers.focusTime === 'short') {
    return 'ant';
  } else if (answers.homework === 'lastMinute' || answers.focusTime === 'long') {
    return 'grasshopper';
  } else if (answers.homework === 'planned') {
    return 'dolphin';
  } else if (answers.studyStyle === 'following') {
    return 'dog';
  } else {
    return 'cat';
  }
}