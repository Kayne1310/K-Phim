'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useWatchHistory } from '@/hooks/useWatchHistory';

interface HistoryTrackerProps {
    movieId: string;
    movieSlug: string;
    hasSlugParam: boolean;
}

export default function HistoryTracker({ movieId, movieSlug, hasSlugParam }: HistoryTrackerProps) {
    const { getHistoryForMovie, isLoaded } = useWatchHistory();
    const router = useRouter();

    useEffect(() => {
        if (isLoaded && !hasSlugParam) {
            const historyItem = getHistoryForMovie(movieId);
            if (historyItem && historyItem.serverName && historyItem.episodeSlug) {
                // Redirect to last watched episode
                const targetUrl = `/phim/${movieSlug}/xem?server=${encodeURIComponent(historyItem.serverName)}&slug=${historyItem.episodeSlug}`;
                router.replace(targetUrl);
            }
        }
    }, [isLoaded, hasSlugParam, movieId, movieSlug, getHistoryForMovie, router]);

    return null;
}
