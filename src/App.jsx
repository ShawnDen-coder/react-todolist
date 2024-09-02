import "./App.css";
import TodoList from "./compoments/TodoList";
import { Container } from "@mui/material";
import { useAuth } from "src/hooks/useAuth.js";

const App = () => {
  const { isAuthenticated } = useAuth();

  return <Container maxWidth="lg">{isAuthenticated && <TodoList />}</Container>;
};

export default App;
