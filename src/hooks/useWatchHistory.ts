import { useState, useEffect, useCallback } from 'react';

export interface HistoryItem {
    movieId: string;
    movieName: string;
    serverName: string;
    episodeSlug: string;
    episodeName: string;
    timestamp: number; // seconds, current progress
    duration: number; // total duration if available
    lastUpdated: number; // epoch
    movieSlug: string;
    movieThumb?: string;
}

const STORAGE_KEY = 'kphim_watch_history_v1';

export const useWatchHistory = () => {
    const [history, setHistory] = useState<HistoryItem[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Load from local storage on mount
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                setHistory(JSON.parse(stored));
            } catch (e) {
                console.error('Failed to parse history', e);
            }
        }
        setIsLoaded(true);
    }, []);

    const saveToHistory = useCallback((item: HistoryItem) => {
        setHistory((prev) => {
            // Remove existing entry for this movie if any (to update it)
            const filtered = prev.filter((i) => i.movieId !== item.movieId);
            // Add as first item
            const newHistory = [item, ...filtered];
            // Limit to 50 items
            if (newHistory.length > 50) newHistory.length = 50;

            localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
            return newHistory;
        });
    }, []);

    const getHistoryForMovie = useCallback((movieId: string) => {
        return history.find((i) => i.movieId === movieId);
    }, [history]);

    const removeFromHistory = useCallback((movieId: string) => {
        setHistory((prev) => {
            const newHistory = prev.filter((i) => i.movieId !== movieId);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
            return newHistory;
        });
    }, []);

    const clearHistory = useCallback(() => {
        setHistory([]);
        localStorage.removeItem(STORAGE_KEY);
    }, []);

    return { history, isLoaded, saveToHistory, getHistoryForMovie, removeFromHistory, clearHistory };
};
