export const allToDosUrl = (userid) => `api/users/${userid}/todos`;
export const addNewToDo = "api/todos/add";
export const singleToDo = (todoid) => `api/todos/${todoid}`;
export const authenticationWithUser = "api/auth/login";
export const authenticationWithToken = "api/auth/me";
export const refreshAuthenticationToken = "api/auth/refresh";
