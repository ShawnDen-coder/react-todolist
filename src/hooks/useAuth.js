import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkTokenAndLogin, loginWithCredentials, logout } from "src/state/authSlice.js";

export const useAuth = () => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const isAuthenticated = auth.isLoggedIn;
  const userinfo = auth.userinfo;

  useEffect(() => {
    if (!isAuthenticated && localStorage.getItem('token')) {
      dispatch(checkTokenAndLogin());
    }
  }, [dispatch, isAuthenticated]);

  const login = (username, password) => dispatch(loginWithCredentials({username, password}));
  const logoutUser = () => dispatch(logout());

  return {
    isAuthenticated,
    userinfo,
    login,
    logout: logoutUser,
  };
};
