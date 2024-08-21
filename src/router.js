import {createBrowserRouter} from "react-router-dom";
import App from "./App.jsx";
import Login from "src/compoments/Login/index.jsx";


const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/todos",
    element: <App/>,
  }

])

export default router;