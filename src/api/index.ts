import type { User, Entry } from "../types";

const BASE_URL = import.meta.env.VITE_API_URL;

export async function register(name: string, email: string, password: string) : Promise<User> {
    const response = await fetch(`${BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        credentials: 'include', 
        body: JSON.stringify({name, email, password})
    });

    console.log(response);

    if(!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
    }

    return response.json();
};

export async function login(email: string, password: string) : Promise<User> {
    const response = await fetch(`${BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password })
    });

    console.log(response);

    if(!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
    }

    return response.json();
}

export async function logout() : Promise<void> {
    const response = await fetch(`${BASE_URL}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include'
    });

    if(!response.ok) {
        throw new Error("Logout failed");
    }

    return response.json();
}

// Entries

export async function getEntries(): Promise<Entry[]> {
    const response = await fetch(`${BASE_URL}/api/entries`, {
        credentials: "include"
    });

    if(!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
    }

    return response.json();
};


export async function createEntry(data: Omit<Entry, 'id' | 'createdAt' | 'userId'>): Promise<Entry> {
    const response = await fetch(`${BASE_URL}/api/entries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(data)
    });

    if(!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
    }

    return response.json();
}

