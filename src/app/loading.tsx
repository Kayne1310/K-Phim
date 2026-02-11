import Skeleton from '@/components/Skeleton';

export default function Loading() {
  return (
    <div className="container mx-auto px-4 md:px-12 py-8 min-h-screen space-y-8">
       {/* Hero Skeleton */}
       <Skeleton className="w-full h-[60vh] md:h-[80vh] rounded-xl" />
       
       {/* Rows Skeleton */}
       <div className="space-y-8">
          {[1, 2, 3].map((i) => (
             <div key={i} className="space-y-4">
               <Skeleton className="w-48 h-8" />
               <div className="flex gap-4 overflow-hidden">
                 {[1, 2, 3, 4, 5, 6].map((j) => (
                    <Skeleton key={j} className="flex-shrink-0 w-32 md:w-48 h-48 md:h-72 rounded-md" />
                 ))}
               </div>
             </div>
          ))}
       </div>
    </div>
  );
}
