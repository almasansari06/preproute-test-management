import { FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import QuestionCard from '../components/QuestionCard';
import { getTestById, updateTest } from '../api/testApi';
import { bulkCreateQuestions } from '../api/questionApi';
import { Question, Test } from '../types';

const emptyQuestion = (testId: string): Question => ({
  id: '',
  type: 'mcq',
  test_id: testId,
  question: '',
  option1: '',
  option2: '',
  option3: '',
  option4: '',
  correct_option: 'option1',
  explanation: '',
  difficulty: 'medium',
  media_url: '',
});

const AddQuestions = () => {
  const { id = '' } = useParams();
  const navigate = useNavigate();

  const [test, setTest] = useState<Test | null>(null);
  const [form, setForm] = useState<Question>(emptyQuestion(id));
  const [questions, setQuestions] = useState<Question[]>([]);
  const [editId, setEditId] = useState<string | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    getTestById(id)
      .then(setTest)
      .catch(() => setError('Unable to load test details.'));
  }, [id]);

  const validate = () => {
    if (!form.question.trim()) return 'Question text is required.';
    if (!form.option1.trim() || !form.option2.trim() || !form.option3.trim() || !form.option4.trim()) {
      return 'All 4 options are required.';
    }
    return '';
  };

  const addQuestion = (e: FormEvent) => {
    e.preventDefault();

    const validation = validate();
    if (validation) {
      setError(validation);
      return;
    }

    setError('');

    if (editId) {
      setQuestions((prev) =>
        prev.map((q) =>
          q.id === editId
            ? {
                ...form,
                id: editId,
                test_id: id,
              }
            : q
        )
      );
      setEditId(null);
    } else {
      const newQuestion: Question = {
        ...form,
        id: `q-${Date.now()}-${Math.random().toString(36).slice(2)}`,
        test_id: id,
      };

      setQuestions((prev) => [...prev, newQuestion]);
    }

    setForm(emptyQuestion(id));
  };

  const handleEdit = (question: Question) => {
    setForm(question);
    setEditId(question.id || null);
  };

  const handleDelete = (questionId?: string) => {
    setQuestions((prev) => prev.filter((q) => q.id !== questionId));
  };

  const saveContinue = async () => {
    if (questions.length < 1) {
      setError('Minimum 1 question is required.');
      return;
    }

    try {
      const res = await bulkCreateQuestions(questions);
      const questionIds = res.data.map((q: Question) => q.id).filter(Boolean) as string[];

      await updateTest(id, {
        questions: questionIds,
        total_questions: questionIds.length,
        total_marks: questionIds.length * Number(test?.correct_marks || 4),
      });

      navigate(`/tests/${id}/preview`);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Unable to save questions.');
    }
  };

  return (
    <>
      <Navbar />

      <main className="container">
        <h1>Add Questions</h1>

        {test && (
          <div className="summary-card">
            <b>{test.name}</b>
            <span>Subject: {test.subject}</span>
            <span>Marks: {test.total_marks}</span>
            <span>Time: {test.total_time} min</span>
          </div>
        )}

        {error && <div className="alert error">{error}</div>}

        <form className="question-form" onSubmit={addQuestion}>
          <label>
            Question Text *
            <textarea
              value={form.question}
              onChange={(e) => setForm({ ...form, question: e.target.value })}
            />
          </label>

          <div className="grid-2">
            {(['option1', 'option2', 'option3', 'option4'] as const).map((key, index) => (
              <label key={key}>
                Option {index + 1}
                <input
                  value={form[key]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                />
              </label>
            ))}
          </div>

          <div className="grid-2">
            <label>
              Correct Option
              <select
                value={form.correct_option}
                onChange={(e) =>
                  setForm({
                    ...form,
                    correct_option: e.target.value as Question['correct_option'],
                  })
                }
              >
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
                <option value="option4">Option 4</option>
              </select>
            </label>

            <label>
              Difficulty
              <select
                value={form.difficulty}
                onChange={(e) => setForm({ ...form, difficulty: e.target.value })}
              >
                <option value="easy">easy</option>
                <option value="medium">medium</option>
                <option value="hard">hard</option>
              </select>
            </label>
          </div>

          <label>
            Explanation
            <textarea
              value={form.explanation}
              onChange={(e) => setForm({ ...form, explanation: e.target.value })}
            />
          </label>

          <label>
            Media URL
            <input
              value={form.media_url}
              onChange={(e) => setForm({ ...form, media_url: e.target.value })}
            />
          </label>

          <button className="btn btn-primary" type="submit">
            {editId ? 'Update Question' : 'Add Another Question'}
          </button>
        </form>

        <h2>Added Questions ({questions.length})</h2>

        {questions.map((q, index) => (
          <QuestionCard
            key={q.id}
            question={q}
            index={index}
            onEdit={() => handleEdit(q)}
            onDelete={() => handleDelete(q.id)}
          />
        ))}

        <button className="btn btn-primary" onClick={saveContinue}>
          Save & Continue
        </button>
      </main>
    </>
  );
};

export default AddQuestions;