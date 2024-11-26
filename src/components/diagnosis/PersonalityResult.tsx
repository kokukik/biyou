import React from 'react';
import { useDiagnosis } from '@/store/DiagnosisContext';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const personalityDescriptions = {
  ant: {
    title: 'コツコツ蟻さんタイプ',
    description: '計画を立てて進めるのが得意で、時間をかけて着実に進む傾向があります。',
    image: '🐜',
  },
  grasshopper: {
    title: '一発逆転バッタタイプ',
    description: '集中力が高く、短期間で大量の情報を処理できる特徴があります。',
    image: '🦗',
  },
  dolphin: {
    title: '逆算できるイルカさんタイプ',
    description: '目標から逆算して計画を立てるのが得意で、効率的に学習を進められます。',
    image: '🐬',
  },
  dog: {
    title: '素直なワンちゃんタイプ',
    description: '指示された通りに着実に進められ、安定した学習ペースを保てます。',
    image: '🐕',
  },
  cat: {
    title: '感情に忠実！猫ちゃんタイプ',
    description: '自分の理解度に合わせて柔軟に学習方法を選べる特徴があります。',
    image: '🐱',
  },
};

interface Props {
  onContinue: () => void;
}

export default function PersonalityResult({ onContinue }: Props) {
  const { state } = useDiagnosis();
  
  if (!state.personalityType) return null;
  
  const personality = personalityDescriptions[state.personalityType];

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 text-center">
      <div className="text-6xl mb-4">{personality.image}</div>
      <h2 className="text-2xl font-bold mb-4">
        あなたは{personality.title}です！
      </h2>
      <p className="text-gray-600 mb-8">{personality.description}</p>

      <div className="bg-blue-50 rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4">
          あなたに最適な学習スケジュールを作成しませんか？
        </h3>
        <p className="text-gray-600 mb-4">
          さらに詳しい情報をお聞きして、より具体的な学習プランをご提案します。
        </p>
      </div>

      <Button
        size="lg"
        className="text-lg"
        onClick={onContinue}
      >
        学習プランを作成する
        <ArrowRight className="ml-2 h-5 w-5" />
      </Button>
    </div>
  );
}