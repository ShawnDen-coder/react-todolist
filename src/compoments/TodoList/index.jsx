import {useDispatch, useSelector} from "react-redux";
import {fetchTodos, selectTodos, todosError, todosStatus} from "../../state/todosSlice.js";
import {useEffect} from "react";
import TodoItem from "../TodoItem";
import TodoListStyled from "./styles.js";


function TodoList() {
  const dispatch = useDispatch();
  const status = useSelector(todosStatus)
  const error = useSelector(todosError)
  const todos = useSelector(selectTodos);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTodos());
    }
  }, [status, dispatch]);

  return (
    <>
      <TodoListStyled>
        {status === "loading" && <p>Loading...</p>}
        {status === "failed" && <p>Error: {error}</p>}
        {status === "succeeded" && (
          <ul>
            {[...todos]
              .sort((a, b) => b.completed - a.completed)
              .map((todo) => (<TodoItem key={todo.id} todo={todo}/>))}
          </ul>
        )}
      </TodoListStyled>
    </>
  );
}

export default TodoList;
