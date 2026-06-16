import { Navigate, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CreateEditTest from './pages/CreateEditTest';
import AddQuestions from './pages/AddQuestions';
import PreviewPublish from './pages/PreviewPublish';

const App = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route element={<ProtectedRoute />}>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/tests/create" element={<CreateEditTest />} />
      <Route path="/tests/:id/edit" element={<CreateEditTest />} />
      <Route path="/tests/:id/questions" element={<AddQuestions />} />
      <Route path="/tests/:id/preview" element={<PreviewPublish />} />
    </Route>
    <Route path="*" element={<Navigate to="/dashboard" replace />} />
  </Routes>
);

export default App;
