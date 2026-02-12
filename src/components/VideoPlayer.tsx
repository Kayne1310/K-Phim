'use client';

import { useEffect, useRef, useState } from 'react';
import { useWatchHistory } from '@/hooks/useWatchHistory';

interface VideoPlayerProps {
  embedUrl: string;
  movie: {
    _id: string;
    name: string;
    slug: string;
    poster_url: string;
    thumb_url: string;
  };
  currentEpisode: {
    name: string;
    slug: string;
  };
  serverName: string;
}

export default function VideoPlayer({ embedUrl, movie, currentEpisode, serverName }: VideoPlayerProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { saveToHistory, getHistoryForMovie, isLoaded } = useWatchHistory();
  const [initialTime, setInitialTime] = useState<number>(0);
  const [hasRestoredTime, setHasRestoredTime] = useState(false);

  // Load initial time from history
  useEffect(() => {
    if (isLoaded && !hasRestoredTime) {
      const historyItem = getHistoryForMovie(movie._id);
      if (historyItem && historyItem.episodeSlug === currentEpisode.slug) {
        if (historyItem.timestamp > 0) {
          setInitialTime(historyItem.timestamp);
          // We can try to append ?t=seconds to embedUrl if it supports it
          // OR postMessage to seek
        }
      }
      setHasRestoredTime(true);
    }
  }, [isLoaded, movie._id, currentEpisode.slug, getHistoryForMovie, hasRestoredTime]);

  // Construct URL with timestamp if possible
  // Most players support #t= or ?t=
  // But since we can't be sure, we just append it if initialTime > 0

  const finalEmbedUrl = initialTime > 0
    ? (embedUrl.includes('?') ? `${embedUrl}&t=${initialTime}` : `${embedUrl}?t=${initialTime}`)
    : embedUrl;

  // Listen for messages from iframe (Best effort for time tracking)
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (!iframeRef.current) return;

      // Check if message comes from our iframe
      // Note: event.source might not equal iframeRef.current.contentWindow in all cases due to redirects
      // But we can try to filter by origin or data structure

      const data = event.data;
      if (!data) return;

      let currentTime = 0;
      let duration = 0;

      // Handle different player message formats (e.g. JWPlayer, standard HTML5)
      if (data.event === 'time' || data.type === 'timeupdate') {
        currentTime = data.position || data.currentTime || 0;
        duration = data.duration || 0;
      } else if (typeof data === 'string' && data.startsWith('{"event":"time"')) {
        try {
          const parsed = JSON.parse(data);
          currentTime = parsed.position || parsed.currentTime || 0;
          duration = parsed.duration || 0;
        } catch (e) { }
      }

      if (currentTime > 0) {
        // Debounce saving? Hook handles state updates, but we should throttle localStorage
        // However, useWatchHistory's saveToHistory does setState then localStorage.
        // We should throttle here.
        // For simplicity, save every 5 seconds or huge milestones?
        // Actually, let's just save. React state updates might be frequent.
        // Setting state effectively debounces render if same value? No.

        // Let's rely on a ref to throttle
        const now = Date.now();
        if (now - lastSaveTime.current > 5000) {
          saveToHistory({
            movieId: movie._id,
            movieName: movie.name,
            movieSlug: movie.slug,
            serverName: serverName,
            episodeSlug: currentEpisode.slug,
            episodeName: currentEpisode.name,
            timestamp: Math.floor(currentTime),
            duration: Math.floor(duration),
            lastUpdated: now,
            movieThumb: movie.thumb_url || movie.poster_url
          });
          lastSaveTime.current = now;
        }
      }
    };

    // Ref for throttling
    const lastSaveTime = { current: 0 };

    window.addEventListener('message', handleMessage);

    // Also save just the episode visit immediately (time 0 or initialTime)
    if (isLoaded) {
      saveToHistory({
        movieId: movie._id,
        movieName: movie.name,
        movieSlug: movie.slug,
        serverName: serverName,
        episodeSlug: currentEpisode.slug,
        episodeName: currentEpisode.name,
        timestamp: initialTime,
        duration: 0,
        lastUpdated: Date.now(),
        movieThumb: movie.thumb_url || movie.poster_url
      });
    }

    return () => window.removeEventListener('message', handleMessage);
  }, [embedUrl, movie, currentEpisode, serverName, saveToHistory, isLoaded, initialTime]);

  return (
    <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden shadow-2xl">
      <iframe
        ref={iframeRef}
        src={finalEmbedUrl}
        className="absolute top-0 left-0 w-full h-full"
        allowFullScreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        title={`Xem phim ${movie.name} - ${currentEpisode.name}`}
      />
    </div>
  );
}
