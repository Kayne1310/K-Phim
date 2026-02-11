import { configureStore } from '@reduxjs/toolkit';
import movieReducer from './slices/movieSlice';
import loadingReducer from './slices/loadingSlice';

export const store = configureStore({
    reducer: {
        movie: movieReducer,
        loading: loadingReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
