import {useDispatch, useSelector} from "react-redux";
import {
  fetchTodos,
  selectTodos,
  todosError,
  todosStatus,
} from "../../state/todosSlice.js";
import {useEffect, useState} from "react";
import TodoItem from "../TodoItem";

import {List, Pagination, CircularProgress, Paper} from "@mui/material";

function TodoList() {
  const dispatch = useDispatch();
  const status = useSelector(todosStatus);
  const error = useSelector(todosError);
  const todos = useSelector(selectTodos);
  const sortedTodos = [...todos].sort((a, b) => a.completed - b.completed);

  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(todos.length / 10);
  const startIndex = (page - 1) * 10;
  const endIndex = startIndex + 10;
  const displayedTodos = sortedTodos.slice(startIndex, endIndex);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTodos());
    }
  }, [status, dispatch]);

  return (
    <Paper sx={{mx: 20, my: 5, p: 2}}>
      {status === "loading" && <CircularProgress/>}
      {status === "failed" && <p>Error: {error}</p>}
      {status === "succeeded" && (
        <>
          <List sx={{mx: 2}}>
            {displayedTodos.map((todo) => (
              <TodoItem key={todo.id} todo={todo}/>
            ))}
          </List>
          <Pagination count={totalPages} onChange={handlePageChange}/>
        </>
      )}

    </Paper>
  );
}

export default TodoList;
