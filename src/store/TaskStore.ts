import { types, applySnapshot } from 'mobx-state-tree';

export const Task = types
  .model('Task', {
    id: types.identifier,
    title: types.string,
    description: types.string,
    status: types.string,
  })
  .actions((self) => ({
    setTitle(title: string) {
      self.title = title;
    },
    setDescription(description: string) {
      self.description = description;
    },
    setStatus(status: string) {
      self.status = status;
    },
  }));

const TaskStore = types
  .model('TaskStore', {
    tasks: types.array(Task),
  })
  .actions((self) => {
    const saveTasksToLocalStorage = () => {
      const tasksJson = JSON.stringify(self.tasks);
      localStorage.setItem('tasks', tasksJson);
    };

    const loadTasksFromLocalStorage = () => {
      const tasksJson = localStorage.getItem('tasks');
      if (tasksJson) {
        const tasks = JSON.parse(tasksJson);
        self.tasks.replace(tasks);
      }
    };

    return {
      addTask(task: typeof Task.Type) {
        self.tasks.push(task);
        saveTasksToLocalStorage();
      },
      editTask(taskId: string, updatedTask: typeof Task.Type) {
        const task = self.tasks.find((t) => t.id === taskId);
        if (task) {
          applySnapshot(task, updatedTask);
          saveTasksToLocalStorage();
        }
      },
      deleteTask(taskId: string) {
        const taskIndex = self.tasks.findIndex((t) => t.id === taskId);
        if (taskIndex !== -1) {
          self.tasks.splice(taskIndex, 1);
          saveTasksToLocalStorage();
        }
      },
      loadTasksFromLocalStorage,
      saveTasksToLocalStorage,
    };
  });

export default TaskStore;
