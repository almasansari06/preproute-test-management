import { TestPayload } from '../types';

const STORAGE_KEY = 'preproute_tests';

const getStoredTests = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

const saveTests = (tests: any[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tests));
};

export const getTests = async () => {
  return getStoredTests();
};

export const getTestById = async (id: string) => {
  const tests = getStoredTests();
  return tests.find((test: any) => test.id === id) || null;
};

export const createTest = async (payload: TestPayload) => {
  const tests = getStoredTests();

  const newTest = {
    id: Date.now().toString(),
    ...payload,
    status: payload.status || 'draft',
    created_at: new Date().toISOString(),
  };

  tests.push(newTest);
  saveTests(tests);

  return {
    success: true,
    data: newTest,
    message: 'Test created successfully',
  };
};

export const updateTest = async (id: string, payload: any) => {
  const tests = getStoredTests();

  const updatedTests = tests.map((test: any) =>
    test.id === id ? { ...test, ...payload } : test
  );

  saveTests(updatedTests);

  return {
    success: true,
    data: updatedTests.find((test: any) => test.id === id),
    message: 'Test updated successfully',
  };
};

export const deleteTest = async (id: string) => {
  const tests = getStoredTests();

  const updatedTests = tests.filter((test: any) => test.id !== id);

  saveTests(updatedTests);

  return {
    success: true,
    message: 'Test deleted successfully',
  };
};

export const publishTest = async (id: string) => {
  const tests = getStoredTests();

  const updatedTests = tests.map((test: any) =>
    test.id === id ? { ...test, status: 'live' } : test
  );

  saveTests(updatedTests);

  return {
    success: true,
    data: updatedTests.find((test: any) => test.id === id),
    message: 'Test published successfully',
  };
};