const QUESTION_KEY = 'preproute_questions';

const getStoredQuestions = () => {
  const data = localStorage.getItem(QUESTION_KEY);
  return data ? JSON.parse(data) : [];
};

const saveQuestions = (questions: any[]) => {
  localStorage.setItem(QUESTION_KEY, JSON.stringify(questions));
};

export const bulkCreateQuestions = async (questions: any[]) => {
  const oldQuestions = getStoredQuestions();

  const createdQuestions = questions.map((question, index) => ({
    id: `${Date.now()}-${index}-${Math.random().toString(36).slice(2)}`,
    type: question.type || 'mcq',
    ...question,
  }));

  const updatedQuestions = [...oldQuestions, ...createdQuestions];
  saveQuestions(updatedQuestions);

  return {
    success: true,
    data: createdQuestions,
    message: `Successfully created ${createdQuestions.length} questions`,
  };
};

export const fetchBulkQuestions = async (question_ids: string[]) => {
  const questions = getStoredQuestions();

  return questions.filter((question: any) =>
    question_ids.includes(question.id)
  );
};