import { createContext, useState, useContext } from 'react';

// Create the context
const AuthContext = createContext();

// Tell Vite's Fast Refresh to ignore this export
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  
  // Lazy initialization: Read from localStorage ONCE when the component renders.
  // This avoids the "setState in useEffect" ESLint error and improves performance.
  const [currentUser, setCurrentUser] = useState(() => {
    const storedUser = localStorage.getItem('rymdUser');
    const storedToken = localStorage.getItem('rymdToken');
    
    if (storedUser && storedToken) {
      return JSON.parse(storedUser);
    }
    return null; // Return null if no user is logged in
  });

  const login = (userData, token) => {
    setCurrentUser(userData);
    localStorage.setItem('rymdUser', JSON.stringify(userData));
    localStorage.setItem('rymdToken', token);
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('rymdUser');
    localStorage.removeItem('rymdToken');
  };

  // --- CRUD: UPDATE LOCAL USER STATE ---
  // Updates the global state without requiring the user to log out and back in
  const updateUser = (updatedData) => {
    const newUser = { ...currentUser, ...updatedData };
    setCurrentUser(newUser);
    localStorage.setItem('rymdUser', JSON.stringify(newUser));
  };

  return (
    <AuthContext.Provider value={{ 
      currentUser, 
      isLoggedIn: !!currentUser, 
      login, 
      logout,
      updateUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};