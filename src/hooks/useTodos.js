import {useDispatch, useSelector} from "react-redux";
import {fetchTodos, selectTodos, todosError, todosStatus} from "src/state/todosSlice.js";
import {useEffect} from "react";


export const useFetchTodos = () => {
  const dispatch = useDispatch();
  const status = useSelector(todosStatus);
  const error = useSelector(todosError);
  const todos = [...useSelector(selectTodos)].sort(
    (a, b) => a.completed - b.completed,
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTodos());
    }
  }, [status, dispatch]);

  return {
    status,
    error,
    todos,
  };
};
