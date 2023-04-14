import React, { useState, useEffect, createContext } from 'react';
import { supabase } from '../supabaseClient';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session = supabase.auth.getUser();
    setUser(session);
    setLoading(false);

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user);
        setLoading(false);
      }
    );

    return () => {
      authListener.subscription?.unsubscribe();
    };
  }, []);

  const signUp = async ({ email, password }) => {
    const { user, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      return { error };
    }
    setUser(user);
    return { user };
  };

  const signIn = async ({ email, password }) => {
    const { user, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      return { error };
    }
    setUser(user);
    return { user };
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      return { error };
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, signUp, signIn, signOut, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
