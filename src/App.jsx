const fetchUser = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }
    
    const response = await axios.get('https://carrier-glide-backend.onrender.com/api/v1/user/getuser', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (response.data) {
      setUser(response.data);
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    localStorage.removeItem('token'); // Clear invalid token
    setUser(null);
  }
}; 