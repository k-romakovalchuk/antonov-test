import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Changes from './pages/Changes';
import Note from './pages/Note';

function App() {
  return (
    <Routes>
      <Route path="" element={<HomePage />} />
      <Route path="/create" element={<Changes />} />
      <Route path="/change/*" element={<Changes />} />
      <Route path="/*" element={<Note />} />
    </Routes>
  );
}

export default App;
