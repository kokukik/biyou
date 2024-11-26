import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            美容師国家試験 学習診断テスト
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            あなたに最適な学習方法を診断します。性格や学習スタイルに合わせて、
            効率的な学習プランをご提案いたします。
          </p>
          <Button 
            onClick={() => navigate('/diagnosis')}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            <Sparkles className="mr-2 h-5 w-5" />
            診断をはじめる
          </Button>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-4">個別最適化</h3>
            <p className="text-gray-600">
              あなたの学習スタイルに合わせた最適な学習方法をご提案します。
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-4">効率的な学習</h3>
            <p className="text-gray-600">
              時間を最大限に活用できる、効率的な学習スケジュールを作成します。
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-4">合格へのサポート</h3>
            <p className="text-gray-600">
              経験豊富な講師陣が、あなたの合格までしっかりサポートします。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}