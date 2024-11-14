import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Homepage } from './pages/Homepage';
import { RecipePage } from './pages/RecipePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/recipe" element={<RecipePage />} />
      </Routes>
    </Router>
  )
}

export default App
