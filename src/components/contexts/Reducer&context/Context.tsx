import { createContext, useContext } from "react";
import type { TaskDispatch, TaskObj } from "./TaskContext";

export const TasksContext = createContext<TaskObj[] | undefined>(undefined);
export const TaskDispatchContext = createContext<TaskDispatch | undefined>(
  undefined
);

export function useTaskCustomHook() {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error("useCurrentUser must be used within a CurrentUserProvider");
  }
  return context;
}

export function useTaskDispatchCustomHook() {
  const context = useContext(TaskDispatchContext);
  if (!context) {
    throw new Error("useCurrentUser must be used within a CurrentUserProvider");
  }
  return context;
}
