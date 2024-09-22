import { useReducer } from "react";

interface IState<T> {
  past: T[];
  present: T;
  future: T[];
}

interface IAction<T> {
  type: "UNDO" | "REDO" | "SET" | "CLEAR";
  initialPresent?: T;
  newPresent?: T;
}

const initialState = <T>(initialPresent: T): IState<T> => ({
  past: [],
  present: initialPresent,
  future: [],
});

function reducer<T>(state: IState<T>, action: IAction<T>): IState<T> {
  const { past, present, future } = state;

  switch (action.type) {
    case "UNDO":
      if (!past.length) return state;
      return {
        past: past.slice(0, past.length - 1),
        present: past[past.length - 1],
        future: [present, ...future],
      };
    case "REDO":
      if (!future.length) return state;
      return {
        past: [...past, present],
        present: future[0],
        future: future.slice(1),
      };
    case "SET":
      if (!action.newPresent || action.newPresent === present) {
        return state;
      }
      return {
        past: [...past, present],
        present: action.newPresent,
        future: [],
      };
    case "CLEAR":
      if (!action.initialPresent) {
        throw new Error("initialPresent is required when clearing state.");
      }
      return initialState(action.initialPresent);
    default:
      throw new Error("Unsupported action type");
  }
}

export default function useHistoryState<T>(initialPresent: T) {
  const [state, dispatch] = useReducer(
    reducer<T>,
    initialState(initialPresent)
  );

  const handleSet = (newPresent: T) => {
    dispatch({ type: "SET", newPresent });
  };

  const handleUndo = () => {
    dispatch({ type: "UNDO" });
  };

  const handleRedo = () => {
    dispatch({ type: "REDO" });
  };

  const handleClear = () => {
    dispatch({ type: "CLEAR", initialPresent });
  };

  return {
    state: state.present,
    canUndo: state.past.length > 0,
    canRedo: state.future.length > 0,
    set: handleSet,
    undo: handleUndo,
    redo: handleRedo,
    clear: handleClear,
  };
}
