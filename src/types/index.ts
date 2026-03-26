export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    entries: Entry[];
}

export type Genre = 
    | 'Rock'
    | 'Pop'
    | 'Jazz'
    | 'Hip-Hop'
    | 'Classical'
    | 'R&B'
    | 'Electronic'
    | 'Country'
    | 'Metal'
    | 'Folk'

export interface Entry {
    id: string;
    title: string;
    artist: string;
    genre: Genre;
    rating: number;
    note: string;
    userId: string;
    createdAt: string;
}

