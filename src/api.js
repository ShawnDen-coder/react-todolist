export const allToDosUrl = (userid) =>
  `https://dummyjson.com/users/${userid}/todos`;
export const addNewToDo = "https://dummyjson.com/todos/add";
export const singleToDo = (todoid) => `https://dummyjson.com/todos/${todoid}`;

export const authenticationWithUser = "https://dummyjson.com/auth/login";
export const authenticationWithToken = "https://dummyjson.com/auth/me";
export const refreshAuthenticationToken = "https://dummyjson.com/auth/refresh";
