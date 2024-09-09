const login = async (username, password) => {
  const response = await fetch('http://localhost:3001/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();
  console.log('dataaa', data);
  if (response.ok) {
    localStorage.setItem('token', JSON.stringify({password }));
    const token = JSON.parse(localStorage.getItem('token'));
    console.log("token ", token);
    return token;
  } else {
    throw new Error(data.error);
  }
};

const logout = () => {
  localStorage.removeItem('token');
};

const getToken = () => localStorage.getItem('token');

const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

const AuthService = {
  login,
  logout,
  getToken,
  isAuthenticated,
};

export default AuthService;
