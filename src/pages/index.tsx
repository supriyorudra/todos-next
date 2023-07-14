import React from 'react';
import TaskList from '@/components/TaskList';
import TaskForm from '@/components/TaskForm';
import { Toaster } from 'react-hot-toast';

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
}

const Home: React.FC = () => {
  return (
    <div className='max-w-[1280px] mx-auto my-10 px-5 lg:px-10'>
      <Toaster />
      <h1 className='font-bold text-center text-3xl mb-10'>MyTask 24/7</h1>
      <div>
        <TaskForm />
        <TaskList />
      </div>
    </div>
  );
};

export default Home;
