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
  Box,
  ListItemText,
  Container,
  InputAdornment,
} from "@mui/material";
import { useFetchTodos } from "src/hooks/useTodos.js";
import { useEffect, useState } from "react";
import { deleteTodo, toggleTodo } from "src/state/todosSlice.js";
import DeleteIcon from "@mui/icons-material/Delete.js";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
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
    <Container maxWidth="sm">
      {status === "loading" && <CircularProgress />}
      {status === "failed" && <p>Error: {error}</p>}
      {status === "succeeded" && (
        <>
          <TextField
            fullWidth
            size="small"
            margin="normal"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <AddOutlinedIcon />
                </InputAdornment>
              ),
            }}
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
    </Container>
  );
}

export default TodoList;
