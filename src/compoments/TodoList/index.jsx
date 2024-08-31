import TodoItem from "../TodoItem";
import {
  List,
  Pagination,
  CircularProgress,
  Paper,
  Autocomplete,
  TextField,
} from "@mui/material";
import {useFetchTodos} from "src/hooks/useTodos.js";
import {useEffect, useState} from "react";

function TodoList() {
  const {status, error, todos} = useFetchTodos();

  const [page, setPage] = useState(1);
  const [allTodos, setAllTodos] = useState(todos);
  const [filteredTodos, setFilteredTodos] = useState(allTodos);

  useEffect(() => {
    if (status === "succeeded") {
      setAllTodos(todos);
    }
  }, [status, todos]);

  return (
    <Paper sx={{mx: 20, my: 5, p: 2}}>
      {status === "loading" && <CircularProgress/>}
      {status === "failed" && <p>Error: {error}</p>}
      {status === "succeeded" && (
        <>
          <Autocomplete
            freeSolo
            id="todos-search-input"
            size="small"
            disableClearable
            sx={{pb: 3, px: 6}}
            options={allTodos.map((option) => option.todo)}
            onInputChange={(event, newValue) => {
              setFilteredTodos(allTodos.filter((todo) => todo.todo.includes(newValue)))
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search input"
                InputProps={{...params.InputProps, type: "search"}}
              />
            )}
          />

          <List sx={{mx: 2}}>
            {filteredTodos.slice((page - 1) * 10, (page - 1) * 10 + 10).map((todo) => (
              <TodoItem key={todo.id} todo={todo}/>
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
