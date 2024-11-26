import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function DiagnosisResult() {
  const location = useLocation();
  const navigate = useNavigate();
  const answers = location.state?.answers || {};

  // This is a simple example of personality type determination
  const determinePersonalityType = () => {
    const types = Object.values(answers);
    if (types.includes('ant')) return 'コツコツ蟻さんタイプ';
    if (types.includes('grasshopper')) return '一発逆転バッタタイプ';
    if (types.includes('dolphin')) return '逆算できるイルカさんタイプ';
    return 'バランス型';
  };

  const personalityType = determinePersonalityType();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h1 className="text-3xl font-bold text-center mb-8">診断結果</h1>
            
            <div className="text-center mb-8">
              <div className="text-lg text-gray-600 mb-2">あなたは</div>
              <div className="text-2xl font-bold text-blue-600 mb-2">
                {personalityType}
              </div>
              <div className="text-lg text-gray-600">です！</div>
            </div>

            <div className="bg-blue-50 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">おすすめの学習方法</h2>
              <p className="text-gray-700">
                計画を立てて進めるのが得意なあなたには、6ヶ月間で1科目ずつ進めるスケジュールをおすすめします。
                定期的な復習と組み合わせることで、効率的に学習を進めることができます。
              </p>
            </div>

            <div className="space-y-6 mb-8">
              <h2 className="text-xl font-semibold">おすすめの教材プラン</h2>
              
              <div className="grid gap-6">
                <div className="border rounded-lg p-6 relative hover:shadow-lg transition-shadow">
                  <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                    おすすめ
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Zoom授業つきプラン</h3>
                  <p className="text-gray-600 mb-4">
                    個別指導で、あなたのペースに合わせて学習を進められます。
                  </p>
                  <div className="text-2xl font-bold mb-4">¥99,800 <span className="text-sm font-normal text-gray-600">（税込）</span></div>
                  <Button 
                    onClick={() => navigate('/courses/zoom')}
                    className="w-full"
                  >
                    詳細を見る
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Button
                onClick={() => navigate('/')}
                variant="outline"
              >
                トップページに戻る
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}