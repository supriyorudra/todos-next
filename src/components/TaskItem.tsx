import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../store/storeContext';
import { Task } from '../store/TaskStore';
import toast from 'react-hot-toast';

interface UpdatedTask {
  id: string;
  title: string;
  description: string;
  status: string;
  setTitle(title: string): void;
  setDescription(description: string): void;
  setStatus(status: string): void;
}

interface TaskItemProps {
  task: typeof Task.Type;
  onEdit: (taskId: string, updatedTask: UpdatedTask & { setTitle(title: string): void; setDescription(description: string): void; setStatus(status: string): void; }) => void;
  onDelete: (taskId: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = observer(({ task, onEdit, onDelete }) => {
  const { taskStore } = useStore();
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(task.title);
  const [updatedDescription, setUpdatedDescription] = useState(task.description);
  const [updatedStatus, setUpdatedStatus] = useState(task.status);

  const handleEdit = () => {
    const updatedTask: UpdatedTask & {
      setTitle(title: string): void;
      setDescription(description: string): void;
      setStatus(status: string): void;
    } = {
      id: task.id,
      title: task.title,
      description: task.description,
      status: task.status,
      setTitle: () => {},
      setDescription: () => {},
      setStatus: () => {},
    };
    
    onEdit(task.id, updatedTask);
    setIsEditing(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedTask: UpdatedTask & {
      setTitle(title: string): void;
      setDescription(description: string): void;
      setStatus(status: string): void;
    } = {
      id: task.id,
      title: updatedTitle,
      description: updatedDescription,
      status: updatedStatus,
      setTitle: (title: string) => {
        setUpdatedTitle(title);
      },
      setDescription: (description: string) => {
        setUpdatedDescription(description);
      },
      setStatus: (status: string) => {
        setUpdatedStatus(status);
      },
    };
    onEdit(task.id, updatedTask);
    if (task.status === 'To Do') {
      toast.success(`Task updated!`);
    }
    if (updatedTask.status === 'In Progress' || updatedTask.status === 'Completed') {
      toast.success(`Task ${updatedTask.status}`);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setUpdatedTitle(task.title);
    setUpdatedDescription(task.description);
    setUpdatedStatus(task.status);
    toast.error('Cancelled');
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDelete(task.id);
    taskStore.deleteTask(task.id);
    toast.success('Task deleted successfully');
  };

  return (
    <div className='bg-white shadow-md p-5 rounded-lg mb-6'>

      <>
        <h3 className='text-xl font-semibold'>{task.title}</h3>
        <p className='text-gray-500'>{task.description}</p>
        <div className='flex gap-2 mt-10'>
          <div>
            <button className='border-0 bg-[#64a7fe] p-1 px-3 rounded-full text-sm text-white font-semibold' onClick={handleEdit}>Edit</button>
          </div>
          <div>
            <button className='border-0 bg-[#8C64FE] p-1 px-3 rounded-full text-sm text-white font-semibold' onClick={handleDelete}>Delete</button>
          </div>
        </div>
      </>
      {isEditing &&
        <div className='fixed top-0 bottom-0 grid place-content-center left-0 right-0 bg-black/10 backdrop-blur-sm'>
          <form onSubmit={handleSave} className='flex flex-col justify-between max-w-md h-[350px] bg-[#fafafa] p-5 shadow lg rounded-lg'>
            <div className='grid'>
              <h2 className='text-center mb-5'>Edit Task</h2>
              <input
                className='shadow-lg border py-2 rounded-sm px-3 mb-2'
                type='text'
                placeholder='Title'
                value={updatedTitle}
                onChange={(e) => setUpdatedTitle(e.target.value)}
              />
              <input
                className='shadow-lg border py-2 rounded-sm px-3 mb-2'
                type='text'
                placeholder='Description'
                value={updatedDescription}
                onChange={(e) => setUpdatedDescription(e.target.value)}
              />
              <select
                className='p-2 rounded-sm shadow-lg bg-transparent mb-2'
                value={updatedStatus}
                onChange={(e) => setUpdatedStatus(e.target.value)}
              >
                <option value='To Do'>To Do</option>
                <option value='In Progress'>In Progress</option>
                <option value='Completed'>Completed</option>
              </select>
            </div>
            <div className='grid grid-cols-2 gap-2'>
              <div>
                <button type='submit' className="btn w-full bg-[#8C64FE] text-white hover:text-black">Done</button>
              </div>
              <div>
                <button onClick={handleCancel} className="btn w-full bg-[#8C64FE] text-white hover:text-black">Cancel</button>
              </div>
            </div>
          </form>
        </div>
      }
    </div>
  );
});

export default TaskItem;
