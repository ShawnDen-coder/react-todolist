import PropTypes from "prop-types";
import { toggleTodo, deleteTodo } from "../../state/todosSlice.js";
import { useDispatch } from "react-redux";
import {
  Checkbox,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    todo: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
};

export default function TodoItem({ todo }) {
  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState(todo.completed);
  const handleToggle = (event) => {
    setIsChecked(event.target.checked);
    dispatch(toggleTodo(todo));
  };

  return (
    <>
      <ListItemButton sx={{ padding: 0.5 }}>
        <ListItemIcon>
          <Checkbox
            edge="start"
            disableRipple
            checked={isChecked}
            onChange={handleToggle}
            color={isChecked ? "success" : "default"}
          />
        </ListItemIcon>
        <ListItemText>
          <Typography noWrap>{todo.todo}</Typography>
        </ListItemText>
        <DeleteIcon
          sx={{ mx: 5 }}
          onClick={() => dispatch(deleteTodo(todo.id))}
        />
      </ListItemButton>
    </>
  );
}
