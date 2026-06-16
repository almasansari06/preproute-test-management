const subjects = [
  { id: 'math', name: 'Mathematics' },
  { id: 'physics', name: 'Physics' },
  { id: 'chemistry', name: 'Chemistry' },
];

const topics = [
  { id: 'algebra', name: 'Algebra', subject_id: 'math' },
  { id: 'geometry', name: 'Geometry', subject_id: 'math' },
  { id: 'mechanics', name: 'Mechanics', subject_id: 'physics' },
];

const subTopics = [
  { id: 'linear-equations', name: 'Linear Equations', topic_id: 'algebra' },
  { id: 'triangles', name: 'Triangles', topic_id: 'geometry' },
  { id: 'laws-motion', name: 'Laws of Motion', topic_id: 'mechanics' },
];

export const getSubjects = async () => subjects;

export const getTopicsBySubject = async (subjectId: string) =>
  topics.filter((topic) => topic.subject_id === subjectId);

export const getSubTopicsByTopic = async (topicId: string) =>
  subTopics.filter((subTopic) => subTopic.topic_id === topicId);

export const getSubTopicsByTopics = async (topicIds: string[]) =>
  subTopics.filter((subTopic) => topicIds.includes(subTopic.topic_id));