import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import QuestionCard from '../components/QuestionCard';
import { getTestById, publishTest } from '../api/testApi';
import { fetchBulkQuestions } from '../api/questionApi';
import { Question, Test } from '../types';

const PreviewPublish = () => {
  const { id = '' } = useParams();
  const navigate = useNavigate();
  const [test, setTest] = useState<Test | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    getTestById(id).then(async (data) => {
      setTest(data);
      if (data.questions?.length) setQuestions(await fetchBulkQuestions(data.questions));
    }).catch(() => setError('Unable to load preview.'));
  }, [id]);

  const handlePublish = async () => {
    try {
      await publishTest(id);
      setMessage('Test published successfully. Redirecting to dashboard...');
      setTimeout(() => navigate('/dashboard'), 1200);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Publish failed.');
    }
  };

  return (
    <><Navbar /><main className="container">
      <div className="page-head"><h1>Preview & Publish</h1><button className="btn btn-primary" onClick={handlePublish}>Publish Test</button></div>
      {message && <div className="alert success">{message}</div>}
      {error && <div className="alert error">{error}</div>}
      {test && <section className="preview-box">
        <h2>{test.name}</h2>
        <p><b>Subject:</b> {test.subject}</p><p><b>Status:</b> {test.status || 'draft'}</p><p><b>Difficulty:</b> {test.difficulty}</p><p><b>Total Time:</b> {test.total_time} minutes</p><p><b>Total Marks:</b> {test.total_marks}</p>
        <div className="actions"><button className="btn btn-light" onClick={() => navigate(`/tests/${id}/edit`)}>Edit Test</button><button className="btn btn-light" onClick={() => navigate(`/tests/${id}/questions`)}>Edit Questions</button></div>
      </section>}
      <h2>Questions</h2>
      {questions.length ? questions.map((q, index) => <QuestionCard key={q.id || index} question={q} index={index} />) : <p>No questions found.</p>}
    </main></>
  );
};
export default PreviewPublish;
