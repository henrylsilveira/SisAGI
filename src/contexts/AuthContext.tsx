import { createContext, ReactNode, useEffect, useState } from 'react';
import { api } from "../services/api";
import { setCookie, parseCookies, destroyCookie } from 'nookies'
import Router from 'next/router';
import { Militar } from '../@types/types';

type SignInCredentials = {
    identidade: string;
    senha: string;
}


type AuthContextData = {
    signIn: (credentials: SignInCredentials) => Promise<void>;
    signOut: () => void;
    user?: Militar;
    isAuthenticated: boolean;
}

type AuthProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData)

let authChannel: BroadcastChannel

export function signOut() {
    destroyCookie(undefined, 'nextauth.token')

    // authChannel.postMessage('signOut')

    Router.push('/')
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<Militar>()
    const isAuthenticated = !!user;

    // DESLOGA DE TODAS AS ABAS QUE ESTIVEREM ABERTAS NO NAVEGADOR
    // useEffect(() => {
    //     authChannel = new BroadcastChannel('auth')

    //     authChannel.onmessage = (message) => {
    //         switch (message.data) {
    //             case 'signOut':
    //                 signOut()
    //                 break;
    //             default:
    //                 break;
    //         }
    //     }
    // },[])

    useEffect(() => {
        const { 'nextauth.token': token } = parseCookies()

        if (token) {
            api.get('/me', {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }).then(response => {
                setUser(response.data)
            }).catch(() => {
                signOut()
            })
        }
    }, [])

    async function signIn({ identidade, senha }: SignInCredentials) {
        const values = {
            identidade,
            senha
        }

        try {
            const militar = await api.post('/auth', values)

            setCookie(null, 'nextauth.token', militar.data.token, {
            maxAge: 60* 60 * 24 * 7,
            path: '/',
            })

            // const { token, refreshToken, permissions, roles } = response.data

            // setCookie(undefined, 'nextauth.token', token, {
            //     maxAge: 60 * 60 * 24 * 30, // 30 days
            //     path: '/'
            // })
            // setCookie(undefined, 'nextauth.refreshToken', refreshToken, {
            //     maxAge: 60 * 60 * 24 * 30, // 30 days
            //     path: '/'
            // })

            setUser(militar.data)
            api.defaults.headers['Authorization'] = `Bearer ${militar.data.token}`

            Router.push('/dashboard')
        } catch (error) {
            console.error(error)
        }

    }

    return (
        <AuthContext.Provider value={{ signIn, signOut, isAuthenticated, user }}>
            {children}
        </AuthContext.Provider>
    )
}