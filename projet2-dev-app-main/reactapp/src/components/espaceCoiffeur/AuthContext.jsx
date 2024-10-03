export const login = () => {
    localStorage.setItem('isConnected', 'true');
};
  
export const isAuthenticated = () => {
    return localStorage.getItem('isConnected') === 'true';
};

export const logout = () => {
    localStorage.removeItem('isConnected');
};  