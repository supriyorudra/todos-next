import "../styles/globals.css";
import { AppProps } from 'next/app';
import { storeContext } from '../store/storeContext';
import { useLocalObservable } from 'mobx-react-lite';
import TaskStore  from '../store/TaskStore';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const store = useLocalObservable(() => {
    const tasksFromLocalStorage = typeof window !== 'undefined' ? localStorage.getItem('tasks') : null;
    const parsedTasks = tasksFromLocalStorage ? JSON.parse(tasksFromLocalStorage) : [];

    return {
      taskStore: TaskStore.create({
        tasks: parsedTasks,
      }),
    };
  });
  
  //   taskStore: TaskStore.create({
  //     tasks: [],
  //   }),
  // }));
  return (
    <storeContext.Provider value={store}>
      <Component {...pageProps} />
    </storeContext.Provider>
  );
};

export default MyApp;
