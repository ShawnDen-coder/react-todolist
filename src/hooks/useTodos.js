import {useDispatch, useSelector} from "react-redux";
import {
  currentUserInfo,
  fetchTodos,
  selectTodos,
  todosError,
  todosStatus,
} from "src/state/todosSlice.js";
import {useEffect} from "react";

export const useFetchTodos = () => {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.auth.isLoggedIn);
  const currentUserinfo = useSelector(currentUserInfo);

  const status = useSelector(todosStatus);
  const error = useSelector(todosError);
  const todos = [...useSelector(selectTodos)].sort(
    (a, b) => a.completed - b.completed,
  );

  useEffect(() => {
    if (status === "idle" && isLogin) {
      dispatch(fetchTodos(currentUserinfo.id));
    }
  }, [status, dispatch, isLogin]);

  return {
    status,
    error,
    todos,
  };
};
