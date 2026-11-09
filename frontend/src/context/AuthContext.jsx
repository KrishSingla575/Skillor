import React, { createContext, useContext, useState, useEffect } from 'react';
import { api, getToken, setToken } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      const storedToken = getToken();
      if (storedToken) {
        try {
          const res = await api.auth.me();
          if (res.success && res.user) {
            setCurrentUser(res.user);
          } else {
            const storedUser = localStorage.getItem('skillor_user');
            if (storedUser) {
              try {
                setCurrentUser(JSON.parse(storedUser));
              } catch (e) {}
            }
          }
        } catch (err) {
          console.warn('[Auth] Error fetching current user; restoring cached session:', err);
          const storedUser = localStorage.getItem('skillor_user');
          if (storedUser) {
            try {
              setCurrentUser(JSON.parse(storedUser));
            } catch {}
          }
        }
      }
      setLoading(false);
    }

    loadUser();
  }, []);

  const login = async (email, password) => {
    const res = await api.auth.login({ email, password });
    if (res.success && res.token) {
      setToken(res.token);
      setCurrentUser(res.user);
      localStorage.setItem('skillor_user', JSON.stringify(res.user));
      return { success: true, user: res.user };
    }
    return { success: false, message: res.message || 'Login failed.' };
  };

  const register = async (formData) => {
    const res = await api.auth.register(formData);
    if (res.success && res.token) {
      setToken(res.token);
      setCurrentUser(res.user);
      localStorage.setItem('skillor_user', JSON.stringify(res.user));
      return { success: true, user: res.user };
    }
    return { success: false, message: res.message || 'Registration failed.' };
  };

  const quickDemoLogin = async (role = 'learner') => {
    const res = await api.auth.quickDemo(role);
    if (res.success && res.token) {
      setToken(res.token);
      setCurrentUser(res.user);
      localStorage.setItem('skillor_user', JSON.stringify(res.user));
      return { success: true, user: res.user };
    }

    const fallbackUser = {
      id: role === 'mentor' ? 'usr_narendar' : 'usr_priya',
      name: role === 'mentor' ? 'Narendar Kumar' : 'Priya Patel',
      username: role === 'mentor' ? 'narendar_dev' : 'priyadesign',
      email: role === 'mentor' ? 'narendar@skillor.io' : 'priya@skillor.io',
      role: 'Skill Trader',
      avatar: role === 'mentor' ? 'NK' : 'PP',
      teaches: role === 'mentor' ? ['React', 'JavaScript', 'Python'] : ['UI/UX Design', 'Figma'],
      wants: role === 'mentor' ? ['UI/UX Design', 'Figma'] : ['Python', 'FastAPI'],
    };
    setCurrentUser(fallbackUser);
    localStorage.setItem('skillor_user', JSON.stringify(fallbackUser));
    return { success: true, user: fallbackUser };
  };

  const logout = () => {
    setToken(null);
    setCurrentUser(null);
    localStorage.removeItem('skillor_user');
  };

  const refreshUser = async () => {
    const res = await api.auth.me();
    if (res.success && res.user) {
      setCurrentUser(res.user);
      localStorage.setItem('skillor_user', JSON.stringify(res.user));
    }
  };

  const updateProfile = async (updates) => {
    const res = await api.users.updateProfile(updates);
    if (res.success && res.user) {
      setCurrentUser(res.user);
      localStorage.setItem('skillor_user', JSON.stringify(res.user));
      return { success: true, user: res.user };
    }
    return { success: false, message: res.message || 'Profile update failed.' };
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        loading,
        login,
        register,
        quickDemoLogin,
        logout,
        refreshUser,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}