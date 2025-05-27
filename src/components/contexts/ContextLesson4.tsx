import AddTask from "./Reducer&context/AddTask";
import TaskProvider from "./Reducer&context/TaskContext";
import TaskList from "./Reducer&context/TaskList";

export default function MyApp4() {
  return (
    <TaskProvider>
      <h1>Day off in Kyoto</h1>
      <AddTask />
      <TaskList />
    </TaskProvider>
  );
}
