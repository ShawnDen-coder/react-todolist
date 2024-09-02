import {
  List,
  Pagination,
  CircularProgress,
  Paper,
  Autocomplete,
  TextField,
  ListItem,
  Checkbox,
  Typography,
  ListItemText,
} from "@mui/material";
import { useFetchTodos } from "src/hooks/useTodos.js";
import { useEffect, useState } from "react";
import { deleteTodo, toggleTodo } from "src/state/todosSlice.js";
import DeleteIcon from "@mui/icons-material/Delete.js";
import { useDispatch } from "react-redux";

function TodoList() {
  const dispatch = useDispatch();
  const { status, error, todos } = useFetchTodos();
  const [page, setPage] = useState(1);
  const [filteredTodos, setFilteredTodos] = useState(todos);

  useEffect(() => {
    if (status === "succeeded") {
      setFilteredTodos(todos);
    }
  }, [status]);

  function handleDelete(id) {
    dispatch(deleteTodo(id));
    setFilteredTodos(filteredTodos.filter((todo) => todo.id !== id));
  }

  function handleToggle(todo) {
    dispatch(toggleTodo(todo));
    setFilteredTodos(
      filteredTodos.map((orgtodo) => {
        if (orgtodo.id === todo.id) {
          return { ...orgtodo, completed: !todo.completed };
        }
        return orgtodo;
      }),
    );
  }

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

          <List>
            {filteredTodos
              .slice((page - 1) * 10, (page - 1) * 10 + 10)
              .map((todo) => (
                <ListItem key={todo.id}>
                  <Checkbox
                    edge="start"
                    checked={todo.completed}
                    onClick={() => handleToggle(todo)}
                    disableRipple
                  ></Checkbox>
                  <ListItemText>
                    <Typography noWrap>{todo.todo}</Typography>
                  </ListItemText>
                  <DeleteIcon onClick={() => handleDelete(todo.id)} />
                </ListItem>
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
