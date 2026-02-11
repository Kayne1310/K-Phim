import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Movie } from '@/types/movie';

interface MovieState {
    favorites: Movie[];
    history: Movie[];
}

const initialState: MovieState = {
    favorites: [],
    history: [],
};

export const movieSlice = createSlice({
    name: 'movie',
    initialState,
    reducers: {
        setFavorites: (state, action: PayloadAction<Movie[]>) => {
            state.favorites = action.payload;
        },
        addToFavorites: (state, action: PayloadAction<Movie>) => {
            if (!state.favorites.some((m) => m._id === action.payload._id)) {
                state.favorites.push(action.payload);
                if (typeof window !== 'undefined') {
                    localStorage.setItem('favorites', JSON.stringify(state.favorites));
                }
            }
        },
        removeFromFavorites: (state, action: PayloadAction<string>) => {
            state.favorites = state.favorites.filter((m) => m._id !== action.payload);
            if (typeof window !== 'undefined') {
                localStorage.setItem('favorites', JSON.stringify(state.favorites));
            }
        },
        setHistory: (state, action: PayloadAction<Movie[]>) => {
            state.history = action.payload;
        },
        addToHistory: (state, action: PayloadAction<Movie>) => {
            // Remove if exists to push to top
            state.history = state.history.filter((m) => m._id !== action.payload._id);
            state.history.unshift(action.payload);
            // Limit history to 20 items
            if (state.history.length > 20) {
                state.history.pop();
            }
            if (typeof window !== 'undefined') {
                localStorage.setItem('history', JSON.stringify(state.history));
            }
        },
    },
});

export const { setFavorites, addToFavorites, removeFromFavorites, setHistory, addToHistory } = movieSlice.actions;

export default movieSlice.reducer;
