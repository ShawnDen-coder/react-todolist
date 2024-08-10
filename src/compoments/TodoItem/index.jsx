import PropTypes from "prop-types";
import DeleteIcon from "@material-ui/icons/Delete";
import {toggleTodo, deleteTodo} from "../../state/todosSlice.js";
import {useDispatch} from "react-redux";
import {TodoItemStyled} from "./styles.js";

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    todo: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
};

export default function TodoItem({todo}) {
  const dispatch = useDispatch();
  return (
    <TodoItemStyled>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => console.log("clicked")}
        onClick={() => dispatch(toggleTodo(todo))}
      />
      <span>{todo.todo}</span>
      <button onClick={() => dispatch(deleteTodo(todo.id))}><DeleteIcon/></button>
    </TodoItemStyled>
  );
}

