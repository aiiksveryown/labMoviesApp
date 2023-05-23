import React, { useState, useEffect, createContext } from 'react';
import { login, signup } from "../api/auth";

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  const existingToken = localStorage.getItem("token");
  const user = localStorage.getItem("userId");
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(existingToken));
  const [authToken, setAuthToken] = useState(existingToken);
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState(user);

  const setToken = (data) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("userId", data.id);
    setAuthToken(data);
  }

  const authenticate = async (email, password) => {
    const result = await login(email, password);
    if (result.token) {
      setToken(result);
      setIsAuthenticated(true);
      setEmail(email);
      setUserId(result.id);
    } else {
      throw new Error(result.message);
    }
  };

  const register = async (email, password, firstName, lastName) => {
    const result = await signup(email, password, firstName,lastName);
    if (result.code === 201) {
      await authenticate(email, password);
    } else {
      throw new Error(result.error);
    }
  };

  const signout = () => {
    setTimeout(() => {
      setAuthToken(null);
      setIsAuthenticated(false);
      setEmail("");
      localStorage.clear();
    }, 100);
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        authenticate,
        register,
        signout,
        authToken,
        email,
        userId
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
