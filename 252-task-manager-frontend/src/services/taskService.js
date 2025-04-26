// frontend/src/services/taskService.js
const API = import.meta.env.VITE_API_URL + '/tasks';

const taskService = {
  getAll: async () => {
    try {
      const res = await fetch(API);
      if (!res.ok) throw new Error('Failed to fetch tasks');
      return await res.json();
    } catch (error) {
      console.error('Fetch Tasks Error:', error.message);
      return [];
    }
  },

  create: async (task) => {
    try {
      const res = await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task)
      });

      if (!res.ok) throw new Error('Failed to create task');
      return await res.json();
    } catch (error) {
      console.error('Create Task Error:', error.message);
      return null;
    }
  }
};

export default taskService;
