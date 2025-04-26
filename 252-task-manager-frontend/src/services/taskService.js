// frontend/src/services/taskService.js
const API = import.meta.env.VITE_API_URL + '/tasks';

// For modifying both filterTasks and sortTasks methods:
async function handleResponse(res) {
  const text = await res.text();
  const data = text ? JSON.parse(text) : {};

  if (!res.ok) {
    console.error('API Error:', data);
    throw new Error(data.error || data.message || 'Request failed');
  }
  return data.data || data;
}

const taskService = {
  getMyTasks: async (token) => {
    try {
      const res = await fetch(`${API}/my-tasks`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Failed to fetch tasks');
      }
      return await res.json();
    } catch (error) {
      console.error('Fetch Tasks Error:', error.message);
      throw error;
    }
  },

  createTask: async (task, token) => {
    try {
      const res = await fetch(`${API}/create`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Failed to create task');
      }
      return await res.json();
    } catch (error) {
      console.error('Create Task Error:', error.message);
      throw error;
    }
  },

  updateTask: async (id, updates, token) => {
    try {
      const res = await fetch(`${API}/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updates)
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Failed to update task');
      }
      return await res.json();
    } catch (error) {
      console.error('Update Task Error:', error.message);
      throw error;
    }
  },

  deleteTask: async (id, token) => {
    try {
      const res = await fetch(`${API}/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Failed to delete task');
      }
      return await res.json();
    } catch (error) {
      console.error('Delete Task Error:', error.message);
      throw error;
    }
  },

  filterTasks: async (filterCriteria, token) => {
    try {
      console.log('Sending filter request:', filterCriteria); // Debug what's being sent

      const res = await fetch(`${API}/my-tasks/filter`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(filterCriteria)
      });

      const data = await res.json();

      if (!res.ok) {
        console.error('Filter error response:', data); // Log error details
        throw new Error(data.error || 'Filtering failed');
      }

      return data;

    } catch (error) {
      console.error('Filter Tasks Error:', error);
      throw error;
    }
  },

  sortTasks: async (sortBy, token) => {
    try {
      const response = await fetch(`${API}/my-tasks/sort?sortBy=${sortBy}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to sort tasks');
      }

      return data;
    } catch (error) {
      console.error('Sorting Error:', error);
      throw new Error(error.message || 'Failed to sort tasks');
    }
  }
};

export default taskService;