'use client';

import { useWatchHistory } from '@/hooks/useWatchHistory';
import Link from 'next/link';
import Image from 'next/image';
import { TrashIcon, PlayIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';

export default function WatchHistoryList() {
    const { history, removeFromHistory, clearHistory, isLoaded } = useWatchHistory();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted || !isLoaded) {
        return <div className="text-white text-center py-10">Đang tải lịch sử...</div>;
    }

    if (history.length === 0) {
        return (
            <div className="text-center py-20 text-gray-400">
                <div className="mb-4 text-6xl">📺</div>
                <p className="text-lg">Bạn chưa xem phim nào.</p>
                <Link href="/" className="inline-block mt-6 px-6 py-2 bg-accent hover:bg-accent-hover text-white rounded-full transition-colors font-medium">
                    Khám phá ngay
                </Link>
            </div>
        );
    }

    const formatTime = (seconds: number) => {
        if (!seconds) return '00:00';
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        if (h > 0) return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
                <p className="text-gray-400">Đã xem {history.length} phim</p>
                <button
                    onClick={() => {
                        if (window.confirm('Bạn có chắc muốn xóa toàn bộ lịch sử xem?')) {
                            clearHistory();
                        }
                    }}
                    className="text-red-500 hover:text-red-400 text-sm flex items-center gap-1 transition-colors px-3 py-1 rounded-full hover:bg-white/5"
                >
                    <TrashIcon className="w-4 h-4" /> Xóa tất cả
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {history.map((item) => (
                    <div key={item.movieId} className="bg-bg-secondary rounded-lg overflow-hidden flex group border border-gray-800 hover:border-accent transition-colors">
                        <Link href={`/phim/${item.movieSlug}/xem?server=${encodeURIComponent(item.serverName)}&slug=${item.episodeSlug}`} className="relative w-24 sm:w-32 flex-shrink-0">
                            <Image
                                src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${item.movieThumb}`}
                                alt={item.movieName}
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                <PlayIcon className="w-8 h-8 text-white opacity-80 group-hover:scale-110 transition-transform" />
                            </div>
                        </Link>

                        <div className="p-3 flex flex-col justify-between flex-grow min-w-0">
                            <div>
                                <Link href={`/phim/${item.movieSlug}`} className="block">
                                    <h3 className="font-bold text-white text-sm sm:text-base line-clamp-1 hover:text-accent transition-colors" title={item.movieName}>
                                        {item.movieName}
                                    </h3>
                                </Link>
                                <p className="text-xs text-gray-400 mt-1">
                                    Đang xem: <span className="text-accent">{item.episodeName}</span>
                                </p>
                                {item.timestamp > 0 && (
                                    <p className="text-xs text-gray-500 mt-1">
                                        Thời gian: {formatTime(item.timestamp)}
                                        {item.duration > 0 && ` / ${formatTime(item.duration)}`}
                                    </p>
                                )}
                                <p className="text-xs text-gray-600 mt-2">
                                    {new Date(item.lastUpdated).toLocaleDateString('vi-VN')} {new Date(item.lastUpdated).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                                </p>
                            </div>

                            <div className="flex justify-end mt-2">
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        removeFromHistory(item.movieId);
                                    }}
                                    className="text-gray-500 hover:text-red-500 transition-colors p-2 -mr-2"
                                    title="Xóa khỏi lịch sử"
                                >
                                    <TrashIcon className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
