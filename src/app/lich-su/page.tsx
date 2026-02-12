
import { Metadata } from 'next';
import WatchHistoryList from '@/components/WatchHistoryList';

export const metadata: Metadata = {
    title: 'Lịch sử xem phim | K-Phim',
    description: 'Danh sách các bộ phim bạn đã xem gần đây tại K-Phim.',
};

export default function HistoryPage() {
    return (
        <div className="container mx-auto px-4 md:px-12 py-8 min-h-screen">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-8 border-l-4 border-accent pl-4">
                Lịch Sử Xem Phim
            </h1>
            <WatchHistoryList />
        </div>
    );
}
