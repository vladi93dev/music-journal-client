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
    rating?: number;
    note?: string;
    userId: string;
    createdAt: string;
}

export interface Stats {
    totalEntries: number;
    averageRating: number;
    highest: { title: string, artist: string, rating: number } | null;
    lowest: { title: string, artist: string, rating: number } | null;
    genreBreakdown: { genre: string, count: number }[];
    ratingDistData: { rating: number, count: number }[]; 
    latestEntry: { title: string, artist: string, createdAt: string } | null;
}


