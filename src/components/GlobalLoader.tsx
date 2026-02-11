'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

export default function GlobalLoader() {
    const isLoading = useSelector((state: RootState) => state.loading.isLoading);

    if (!isLoading) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#141414] transition-opacity duration-500">
            <div className="flex flex-col items-center">
                <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                <div className="text-red-500 font-bold text-xl tracking-widest animate-pulse">K-PHIM</div>
            </div>
        </div>
    );
}
