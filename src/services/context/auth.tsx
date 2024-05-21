import { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../api';
import { Militar } from '../../@types/types';
import Router from 'next/router';

interface AuthContextData {
    signed: boolean;
    user: Militar;
    Login(user: object): Promise<ResponseAuth>;
    logout(): void;
    status: "authenticated" | "unauthenticated"
}

interface ResponseAuth{
    status: number;
    data: {
        token: string;
        user: object;
    }
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);
export function AuthProvider({ children }) {
    const [user, setUser] = useState<Militar>();
    const [status, setStatus] = useState<"authenticated" | "unauthenticated">("unauthenticated");

    useEffect(() => {
        const storagedUser = localStorage.getItem('@App:user');
        const storagedToken = localStorage.getItem('@App:token');
    
        if (storagedToken && storagedUser) {
          setUser(JSON.parse(storagedUser));
          api.defaults.headers.Authorization = `Bearer ${storagedToken}`;
        }
      }, []);

    async function Login(credentials: object){
        try {
            
            const response = await api.post('/auth', credentials);
            const militar = await api.get<Militar>(`/me/${response.data.id}`);
            async () => await new Promise((resolve, reject) => {
                resolve(setUser(militar.data as Militar))
                resolve(setStatus("authenticated"))
              },
            ) 
            api.defaults.headers.Authorization = `Bearer ${response.data.token}`
            localStorage.setItem('@App:user', JSON.stringify(militar.data));
            localStorage.setItem('@App:token', response.data.token);
            Router.push("/dashboard");
            return response
        } catch (error) {
            console.error('Falha ao logar', error);
        }
    };
    
    function logout() {
        setUser(null);
    
        sessionStorage.removeItem('@App:user');
        sessionStorage.removeItem('App:token');
      }


    return (
        <AuthContext.Provider value={{ signed: Boolean(user), Login , user, logout, status }} >
            {children}
        </AuthContext.Provider>

    )
}

export function useSession(){
    const context = useContext(AuthContext);
    return context

   }
   
