import { Question } from '../types';

type Props = {
  question: Question;
  index: number;
  onEdit?: () => void;
  onDelete?: () => void;
};

const QuestionCard = ({ question, index, onEdit, onDelete }: Props) => (
  <div className="question-card">
    <div className="row-between">
      <h3>Q{index + 1}. {question.question}</h3>
      <div className="actions">
        {onEdit && <button className="btn btn-light" onClick={onEdit}>Edit</button>}
        {onDelete && <button className="btn btn-danger" onClick={onDelete}>Delete</button>}
      </div>
    </div>
    <ol className="options">
      <li>{question.option1}</li>
      <li>{question.option2}</li>
      <li>{question.option3}</li>
      <li>{question.option4}</li>
    </ol>
    <p><b>Correct:</b> {question.correct_option}</p>
    {question.explanation && <p><b>Explanation:</b> {question.explanation}</p>}
  </div>
);

export default QuestionCard;
