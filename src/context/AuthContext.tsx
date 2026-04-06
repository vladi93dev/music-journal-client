import type { User } from "../types";
import { createContext, useState, useContext } from 'react';
import { login as apiLogin, logout as apiLogout } from '../api/index';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
    const context = useContext(AuthContext);

    if(!context) throw new Error('useAuth must be used within AuthProvider')
    return context;
};

export function AuthProvider({children}: { children: React.ReactNode}) {
    const [ user, setUser ] = useState<User | null>(null);
    const [ loading, setLoading ] = useState(true);

    const login = async(email: string, password: string) => {
        const response = await apiLogin(email, password);
        
        setUser(response);
    }

    const logout = async() => {
        const response = await apiLogout();
        console.log(response);

        setUser(null);
    }

    return (    
        <AuthContext.Provider value={{user, loading, login, logout}}>
            {children}
        </AuthContext.Provider>
    )    
}

