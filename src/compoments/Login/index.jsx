import {
  Button,
  Container,
  TextField,
} from "@material-ui/core";
import {Form, useNavigate} from "react-router-dom"
import {useAuth} from "src/hooks/useAuth.js";
import {useEffect} from "react";


export default function Login() {
  const {isAuthenticated, login} = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/todos");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = formData.get("username");
    const password = formData.get("password");
    await login(username, password);
  };

  return <>
    {!isAuthenticated &&
      <Container component="main" maxWidth="xs" sx={{mt: 50, mb: 2}}>
        <Form method={"POST"} onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            defaultValue="emilys"
            required
            fullWidth
            autoFocus
            id="username"
            label="User Name"
            name="username"/>

          <TextField
            margin="normal"
            defaultValue="emilyspass"
            required
            fullWidth
            autoFocus
            id="password"
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"/>

          <Button type="submit" fullWidth variant="contained" sx={{mt: 3, mb: 2}}>
            Login
          </Button>

        </Form>
      </Container>
    }

  </>
}