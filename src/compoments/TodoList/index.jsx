import TodoItem from "../TodoItem";
import {
  List,
  Pagination,
  CircularProgress,
  Paper,
  Autocomplete,
  TextField,
} from "@mui/material";
import { useFetchTodos } from "src/hooks/useTodos.js";
import { useEffect, useState } from "react";

function TodoList() {
  const { status, error, todos } = useFetchTodos();
  const [page, setPage] = useState(1);
  const [filteredTodos, setFilteredTodos] = useState(todos);

  useEffect(() => {
    if (status === "succeeded") {
      setFilteredTodos(todos);
    }
  }, [status]);

  return (
    <Paper sx={{ mx: 20, my: 5, p: 2 }}>
      {status === "loading" && <CircularProgress />}
      {status === "failed" && <p>Error: {error}</p>}
      {status === "succeeded" && (
        <>
          <Autocomplete
            freeSolo
            id="todos-search-input"
            size="small"
            disableClearable
            sx={{ pb: 3, px: 6 }}
            options={todos.map((option) => option.todo)}
            onInputChange={(event, newValue) => {
              const newtodos = [
                ...todos.filter((todo) => todo.todo.includes(newValue)),
              ];
              setFilteredTodos(newtodos);
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
            {filteredTodos
              .slice((page - 1) * 10, (page - 1) * 10 + 10)
              .map((todo) => (
                <TodoItem key={todo.id} todo={todo} />
              ))}
          </List>

          <Pagination
            count={Math.ceil(filteredTodos.length / 10)}
            onChange={(_, value) => setPage(value)}
          />
        </>
      )}
    </Paper>
  );
}

export default TodoList;
