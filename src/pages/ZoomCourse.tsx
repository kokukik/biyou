import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Video, Calendar, Users, CheckCircle } from 'lucide-react';

export default function ZoomCourse() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h1 className="text-3xl font-bold text-center mb-8">
              Zoom授業つきプラン
            </h1>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div>
                <img
                  src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
                  alt="オンライン授業"
                  className="rounded-lg shadow-md w-full"
                />
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-4">
                  プラン特徴
                </h2>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <Video className="h-6 w-6 text-blue-600 mr-2 flex-shrink-0" />
                    <span>マンツーマンのZoomレッスン（月4回）</span>
                  </li>
                  <li className="flex items-start">
                    <Calendar className="h-6 w-6 text-blue-600 mr-2 flex-shrink-0" />
                    <span>柔軟な予約システムで都合に合わせて受講可能</span>
                  </li>
                  <li className="flex items-start">
                    <Users className="h-6 w-6 text-blue-600 mr-2 flex-shrink-0" />
                    <span>経験豊富な講師による個別指導</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-blue-600 mr-2 flex-shrink-0" />
                    <span>オリジナルテキスト付き</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-semibold mb-4">
                料金プラン
              </h3>
              <div className="text-3xl font-bold text-blue-600 mb-2">
                ¥99,800 <span className="text-base font-normal text-gray-600">（税込）</span>
              </div>
              <p className="text-gray-600">
                ※ 6ヶ月間の受講料金です
              </p>
            </div>

            <div className="text-center space-y-4">
              <Button
                className="w-full max-w-md bg-blue-600 hover:bg-blue-700"
                size="lg"
              >
                申し込む
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate(-1)}
                className="w-full max-w-md"
              >
                戻る
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}