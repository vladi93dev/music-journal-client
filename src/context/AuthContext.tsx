import type { User } from "../types";
import { createContext, useState } from 'react';

interface AuthContextType {
    user: User;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({children}: { children: React.ReactNode}) {
    const { user, setUser } = useState<User | null>(null);
    const { loading, setLoading } = useState(true);

    const login = async(email: string, password: string) => {

    }

    const logout = async() => {

    }

    <AuthContext.Provider value={{user, loading, login, logout}}>
        {children}
    </AuthContext.Provider>    
}

