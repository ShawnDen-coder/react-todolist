import PropTypes from "prop-types";
import {toggleTodo} from "../../state/todosSlice.js";
import {useDispatch} from "react-redux";

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    todo: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  onComplete: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default function TodoItem({todo, onComplete, onDelete}) {
  const dispatch = useDispatch();

  const handleClick = (todo) => {
    dispatch(toggleTodo(todo))
  }

  return (
    <div>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onComplete(todo.id)}
        onClick={() => handleClick(todo)}
      />
      <span>{todo.todo}</span>
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </div>
  );
}

