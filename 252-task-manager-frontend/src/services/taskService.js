const API = 'http://localhost:5000/api/tasks';

export default {
  getAll: async () => {
    const res = await fetch(API);
    return res.json();
  },
  create: async (task) => {
    const res = await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task)
    });
    return res.json();
  }
};