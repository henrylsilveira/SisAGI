import { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../api';
import { Militar } from '../../@types/types';
import Router from 'next/router';
import { destroyCookie, parseCookies, setCookie } from 'nookies';

interface AuthContextData {
    signed: boolean;
    user: Militar;
    Login(user: object): Promise<ResponseAuth>;
    logout(): void;
    status: "authenticated" | "unauthenticated"
}

interface ResponseAuth {
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
        const { 'nextauth.token': token } = parseCookies()
        if (token && user === undefined) {
            const userId = localStorage.getItem('@App:userId');
            async () => {
                 await api.get<Militar>(`/me/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }).then(response => {
                    setUser(response.data)
                }).catch(() => logout);
            }
        
        }else(
            logout()
        )
        const storagedUser =JSON.parse(localStorage.getItem('@App:user'));
        // const storagedToken = localStorage.getItem('@App:token');

        if (token && storagedUser?.id) {
            setUser(storagedUser);
            api.defaults.headers.Authorization = `Bearer ${token}`;
        }else{
            () => logout
        }
    }, []);

    async function Login(credentials: object) {
        try {
            const response = await api.post('/auth', credentials);
            const militar = await api.get<Militar>(`/me/${response.data.id}`);
            api.defaults.headers.Authorization = `Bearer ${response.data.token}`
            localStorage.setItem('@App:userId', JSON.stringify(militar.data.id));
            localStorage.setItem('@App:user', JSON.stringify(militar.data));
            // localStorage.setItem('@App:token', response.data.token);
            setUser(militar.data as Militar)
            setStatus("authenticated")
            setCookie(null, 'nextauth.token', response.data.token, {
                maxAge: 60 * 60 * 24,
                path: '/',
            })
            Router.push("/dashboard");
            return response
        } catch (error) {
            console.error('Falha ao logar', error);
        }
    };

    function logout() {
        destroyCookie(undefined, 'nextauth.token')
        localStorage.removeItem("@App:userId")
        localStorage.removeItem("@App:user")
        setUser(null);
        // authChannel.postMessage('signOut')
        Router.push('/')
    }

    // function logout() {
    //     sessionStorage.removeItem('@App:user');
    //     sessionStorage.removeItem('@App:token');
    //   }


    return (
        <AuthContext.Provider value={{ signed: Boolean(user), Login, user, logout, status }} >
            {children}
        </AuthContext.Provider>

    )
}

export function useSession() {
    const context = useContext(AuthContext);
    return context

}

