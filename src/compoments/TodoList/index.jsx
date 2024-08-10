import {useDispatch, useSelector} from "react-redux";
import {fetchTodos, selectTodos, todosError, todosStatus} from "../../state/todosSlice.js";
import {useEffect} from "react";
import TodoItem from "../TodoItem";


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


  const onComplete = (id) => {
    console.log(id);
  }
  const onDelete = (id) => {
    console.log(id);
  }


  return (
    <div>
      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p>Error: {error}</p>}
      {status === "succeeded" && (
        <ul>
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onComplete={onComplete}
              onDelete={onDelete}/>))}
        </ul>
      )}
    </div>
  );
}

export default TodoList
