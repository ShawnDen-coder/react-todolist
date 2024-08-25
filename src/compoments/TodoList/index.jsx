import { useDispatch, useSelector } from "react-redux";
import {
  fetchTodos,
  selectTodos,
  todosError,
  todosStatus,
} from "../../state/todosSlice.js";
import { useEffect, useState } from "react";
import TodoItem from "../TodoItem";

import {
  List,
  Pagination,
  CircularProgress,
  Paper,
  Autocomplete,
  TextField,
} from "@mui/material";

function TodoList() {
  const dispatch = useDispatch();
  const status = useSelector(todosStatus);
  const error = useSelector(todosError);

  const allTodos = [...useSelector(selectTodos)].sort(
    (a, b) => a.completed - b.completed,
  );

  const [page, setPage] = useState(1);
  const [todos, setTodos] = useState(allTodos);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTodos());
    }
    if (status === "succeeded") {
      setTodos(allTodos);
    }
  }, [status, dispatch, allTodos]);

  return (
    <Paper sx={{ mx: 20, my: 5, p: 2 }}>
      {status === "loading" && <CircularProgress />}
      {status === "failed" && <p>Error: {error}</p>}
      {status === "succeeded" && (
        <>
          <Autocomplete
            freeSolo
            id="free-solo-2-demo"
            size="small"
            disableClearable
            sx={{ pb: 3, px: 6 }}
            options={allTodos.map((option) => option.todo)}
            onInputChange={(event, newValue) => {
              if (newValue) {
                setTodos(
                  allTodos.filter((todo) => todo.todo.includes(newValue)),
                );
              } else if (!newValue) {
                setTodos(allTodos);
              }
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search input"
                InputProps={{ ...params.InputProps, type: "search" }}
              />
            )}
          />

          <List sx={{ mx: 2 }}>
            {todos.slice((page - 1) * 10, (page - 1) * 10 + 10).map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </List>
          <Pagination
            count={Math.ceil(todos.length / 10)}
            onChange={(_, value) => setPage(value)}
          />
        </>
      )}
    </Paper>
  );
}

export default TodoList;
