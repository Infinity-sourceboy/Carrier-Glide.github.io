const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
// or whatever your deployed backend URL is

const fetchUser = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('No token found');
      return;
    }
    
    // Log the exact token being sent
    console.log('Token from localStorage:', token);
    
    // Make sure token format is correct
    const authHeader = `Bearer ${token}`;
    console.log('Authorization header:', authHeader);
    
    const response = await axios.get(`${API_BASE_URL}/user/getuser`, {
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json'
      },
      withCredentials: true
    });
    
    console.log('Response:', response.data); // Log successful response
    
    if (response.data) {
      setUser(response.data);
    }
  } catch (error) {
    // More detailed error logging
    console.error('Error details:', {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      headers: error.response?.headers
    });
    
    if (error.response?.status === 401 || error.response?.status === 400) {
      console.log('Clearing invalid token');
      localStorage.removeItem('token');
      setUser(null);
    }
  }
};

const login = async (credentials) => {
  try {
    console.log('Attempting login with credentials:', {
      ...credentials,
      password: '***' // Don't log actual password
    });
    
    const response = await axios.post(
      `${API_BASE_URL}/user/login`, 
      credentials,
      {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      }
    );
    
    console.log('Login response:', {
      status: response.status,
      hasToken: !!response.data?.token,
      hasUser: !!response.data?.user
    });
    
    if (response.data?.token) {
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);
      
      // Verify token was saved
      const savedToken = localStorage.getItem('token');
      console.log('Token saved successfully:', !!savedToken);
    } else {
      console.error('No token received in login response');
    }
  } catch (error) {
    console.error('Login error details:', {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      headers: error.response?.headers
    });
    throw error;
  }
}; 