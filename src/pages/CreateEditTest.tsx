import { FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { createTest, getTestById, updateTest } from '../api/testApi';
import { getSubjects, getSubTopicsByTopics, getTopicsBySubject } from '../api/subjectApi';
import { Subject, SubTopic, TestPayload, Topic } from '../types';

const initialForm: TestPayload = {
  name: '', type: 'chapterwise', subject: '', topics: [], sub_topics: [],
  correct_marks: 4, wrong_marks: -1, unattempt_marks: 0, difficulty: 'medium',
  total_time: 60, total_marks: 250, total_questions: 50, status: null
};

const CreateEditTest = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const [form, setForm] = useState<TestPayload>(initialForm);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [subTopics, setSubTopics] = useState<SubTopic[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => { getSubjects().then(setSubjects).catch(() => setError('Unable to load subjects.')); }, []);

  useEffect(() => {
    if (!id) return;
    getTestById(id).then((test) => {
      setForm({ ...initialForm, ...test, subject: test.subject, topics: test.topics || [], sub_topics: test.sub_topics || [] });
    }).catch(() => setError('Unable to load test.'));
  }, [id]);

  useEffect(() => {
    if (!form.subject) return setTopics([]);
    getTopicsBySubject(form.subject).then(setTopics).catch(() => setError('Unable to load topics.'));
  }, [form.subject]);

  useEffect(() => {
    if (!form.topics.length) return setSubTopics([]);
    getSubTopicsByTopics(form.topics).then(setSubTopics).catch(() => setError('Unable to load sub-topics.'));
  }, [form.topics]);

  const handleMulti = (field: 'topics' | 'sub_topics', values: string[]) => setForm((prev) => ({ ...prev, [field]: values }));

  const validate = () => {
    if (!form.name.trim()) return 'Test name is required.';
    if (!form.subject) return 'Subject is required.';
    if (!form.topics.length) return 'Select at least one topic.';
    if (form.total_time <= 0) return 'Total time must be greater than 0.';
    return '';
  };

  const save = async (status: 'draft' | null = null) => {
    const validation = validate();
    if (validation) { setError(validation); return null; }
    setLoading(true); setError('');
    try {
      const payload = { ...form, status };
      const res = isEdit && id ? await updateTest(id, payload) : await createTest(payload);
      return res.data.id;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Unable to save test.');
      return null;
    } finally { setLoading(false); }
  };

  const onSubmit = async (e: FormEvent) => { e.preventDefault(); const testId = await save(null); if (testId) navigate(`/tests/${testId}/questions`); };
  const saveDraft = async () => { const testId = await save('draft'); if (testId) navigate('/dashboard'); };

  return (
    <><Navbar /><main className="container narrow">
      <h1>{isEdit ? 'Edit Test' : 'Create Test'}</h1>
      {error && <div className="alert error">{error}</div>}
      <form className="form-grid" onSubmit={onSubmit}>
        <label>Test Name *<input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></label>
        <label>Subject *<select value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value, topics: [], sub_topics: [] })}><option value="">Select subject</option>{subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}</select></label>
        <label>Test Type<select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}><option value="chapterwise">Chapterwise</option><option value="mock">Mock</option><option value="topicwise">Topicwise</option></select></label>
        <label>Topics *<select multiple value={form.topics} onChange={(e) => handleMulti('topics', Array.from(e.target.selectedOptions, o => o.value))}>{topics.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}</select></label>
        <label>Sub-topics<select multiple value={form.sub_topics} onChange={(e) => handleMulti('sub_topics', Array.from(e.target.selectedOptions, o => o.value))}>{subTopics.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}</select></label>
        <label>Difficulty<select value={form.difficulty} onChange={(e) => setForm({ ...form, difficulty: e.target.value })}><option>easy</option><option>medium</option><option>hard</option></select></label>
        <label>Correct Marks<input type="number" value={form.correct_marks} onChange={(e) => setForm({ ...form, correct_marks: Number(e.target.value) })} /></label>
        <label>Wrong Marks<input type="number" value={form.wrong_marks} onChange={(e) => setForm({ ...form, wrong_marks: Number(e.target.value) })} /></label>
        <label>Unattempt Marks<input type="number" value={form.unattempt_marks} onChange={(e) => setForm({ ...form, unattempt_marks: Number(e.target.value) })} /></label>
        <label>Total Time<input type="number" value={form.total_time} onChange={(e) => setForm({ ...form, total_time: Number(e.target.value) })} /></label>
        <label>Total Marks<input type="number" value={form.total_marks} onChange={(e) => setForm({ ...form, total_marks: Number(e.target.value) })} /></label>
        <label>Total Questions<input type="number" value={form.total_questions} onChange={(e) => setForm({ ...form, total_questions: Number(e.target.value) })} /></label>
        <div className="form-actions"><button type="button" className="btn btn-outline" onClick={saveDraft} disabled={loading}>Save as Draft</button><button className="btn btn-primary" disabled={loading}>Next: Add Questions</button></div>
      </form>
    </main></>
  );
};
export default CreateEditTest;
