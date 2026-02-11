'use client';

import Link from 'next/link';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { usePathname, useSearchParams } from 'next/navigation';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-2 mt-12 mb-8">
      {/* Prev */}
      <Link
        href={createPageUrl(currentPage - 1)}
        className={`p-2 rounded hover:bg-white/10 transition-colors ${
          currentPage <= 1 ? 'pointer-events-none opacity-50' : 'text-white'
        }`}
        aria-disabled={currentPage <= 1}
      >
        <ChevronLeftIcon className="w-5 h-5" />
      </Link>

      {/* Page Numbers - Simplified logic for now */}
      <div className="flex items-center gap-2">
         {/* Show simple range around current page */}
         {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let pageNum = currentPage 
            if(totalPages > 5) {
                // Logic to center current page
                if (currentPage <= 3) pageNum = i + 1;
                else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + i;
                else pageNum = currentPage - 2 + i;
            } else {
                pageNum = i + 1;
            }
            
            return (
              <Link
                key={pageNum}
                href={createPageUrl(pageNum)}
                className={`w-8 h-8 flex items-center justify-center rounded transition-colors font-medium text-sm ${
                  pageNum === currentPage
                    ? 'bg-accent text-white font-bold'
                    : 'bg-bg-secondary text-gray-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                {pageNum}
              </Link>
            );
         })}
      </div>

      {/* Next */}
      <Link
        href={createPageUrl(currentPage + 1)}
        className={`p-2 rounded hover:bg-white/10 transition-colors ${
          currentPage >= totalPages ? 'pointer-events-none opacity-50' : 'text-white'
        }`}
        aria-disabled={currentPage >= totalPages}
      >
        <ChevronRightIcon className="w-5 h-5" />
      </Link>
    </div>
  );
}
