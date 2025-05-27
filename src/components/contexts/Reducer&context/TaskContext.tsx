import { type ReactNode } from "react";
import { useReducer } from "react";
import { TaskDispatchContext, TasksContext } from "./Context";

export interface TaskObj {
  id: number;
  text: string;
  done?: boolean;
}
type TaskAction = {
  type: string;
  id?: number;
  text?: string;
  task?: TaskObj;
};
export type TaskDispatch = (action: TaskAction) => void;

export default function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);
  return (
    <>
      <TasksContext.Provider value={tasks}>
        <TaskDispatchContext.Provider value={dispatch}>
          {children}
        </TaskDispatchContext.Provider>
      </TasksContext.Provider>
    </>
  );
}

function tasksReducer(tasks: TaskObj[], action: TaskAction) {
  switch (action.type) {
    case "added": {
      if (action.id === undefined || action.text === undefined) {
        throw new Error("Missing id or text in 'added' action");
      }
      return [
        ...tasks,
        {
          id: action.id,
          text: action.text,
          done: false,
        },
      ];
    }
    case "changed": {
      if (
        !action.task ||
        action.task.id === undefined ||
        action.task.text === undefined
      ) {
        throw new Error("Invalid 'changed' action payload");
      }
      return tasks.map((t) => {
        if (t.id === action.task?.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case "deleted": {
      if (action.id === undefined) {
        throw new Error("Missing id in 'deleted' action");
      }
      return tasks.filter((t) => t.id !== action.id);
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

const initialTasks: TaskObj[] = [
  { id: 0, text: "Philosopher’s Path", done: true },
  { id: 1, text: "Visit the temple", done: false },
  { id: 2, text: "Drink matcha", done: false },
];
