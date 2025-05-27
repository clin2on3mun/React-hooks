import { useState } from "react";
import { useTaskDispatchCustomHook } from "./Context";

export default function AddTask() {
  const [text, setText] = useState<string>("");
  const dispatch = useTaskDispatchCustomHook();

  return (
    <>
      <input
        type="text"
        placeholder="Add Text"
        onChange={(e) => setText(e.target.value)}
      />
      <button
        onClick={() => {
          setText("");
          dispatch({
            type: "added",
            id: nextId++,
            text: text,
          });
        }}
      >
        Add Task
      </button>
    </>
  );
}

let nextId = 3;
