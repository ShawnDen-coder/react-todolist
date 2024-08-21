import {authenticationWithUser, authenticationWithToken, refreshAuthenticationToken} from "src/api.js";

export const authApi = {
    refreshToken: async (refreshtoken) => {
      const response = await fetch(refreshAuthenticationToken, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          "refresh_token": refreshtoken
        }),
      });
      if (!response.ok) throw new Error('refresh Token invalid');
      return await response.json();
    },

    loginWithToken: async (token) => {
      const response = await fetch(authenticationWithToken, {
        method: 'GET',
        headers: {'Authorization': `Bearer ${token}`},
      });
      if (!response.ok) throw new Error('Token invalid');
      return await response.json();
    },

    loginWithCredentials:
      async (username, password) => {
        const response = await fetch(authenticationWithUser, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            "username": username,
            "password": password
          }),
        });
        if (!response.ok) throw new Error('Login failed');
        return await response.json();
      },
  }
;

