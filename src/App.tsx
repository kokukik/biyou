import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import DiagnosisFlow from './pages/DiagnosisFlow';
import DiagnosisResult from './pages/DiagnosisResult';
import ZoomCourse from './pages/ZoomCourse';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/diagnosis" element={<DiagnosisFlow />} />
        <Route path="/diagnosis/result" element={<DiagnosisResult />} />
        <Route path="/courses/zoom" element={<ZoomCourse />} />
      </Routes>
    </Router>
  );
}

export default App;