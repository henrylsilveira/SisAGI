import { createContext, useState, useEffect } from 'react';

import axios from 'axios';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));

    // const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            // Fetch user information if needed
            // Example: axios.get('/api/user').then(response => setUser(response.data));
        }
    }, [token]);

    const login = async (credentials) => {
        try {
            const response = await axios.post('/api/login', credentials);
            const { token } = response.data;
            localStorage.setItem('token', token);
            setToken(token);
            // Fetch user information if needed
            // Example: setUser(response.data.user);
            // navigate('/dashboard');
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        // navigate('/login');
    };

    // return (
    //     <AuthContext.Provider value={{ user, token, login, logout }} >
    //         {children}
    //     </AuthContext.Provider>
    // );
};

export default AuthContext;
