'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { movieApi } from '@/service/api';

interface Category { _id: string; slug: string; name: string; }
interface Country { _id: string; slug: string; name: string; }
interface Year { _id: string; slug: string; name: string; }

function FilterBarContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [categories, setCategories] = useState<Category[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [years, setYears] = useState<Year[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Selection State — chọn trước, chưa gọi API
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [selectedYear, setSelectedYear] = useState<Year | null>(null);

  // Custom dropdown state
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isFiltering, setIsFiltering] = useState(false);

  useEffect(() => {
     const currentYear = new Date().getFullYear();
     const generatedYears = Array.from({ length: currentYear - 2000 + 1 }, (_, i) => {
         const year = (currentYear - i).toString();
         return { _id: year, slug: year, name: year };
     });
     setYears(generatedYears);

     const fetchFilters = async () => {
        try {
           const [catRes, countryRes] = await Promise.all([
              movieApi.getCategories().catch(() => ({ data: [] })),
              movieApi.getCountries().catch(() => ({ data: [] }))
           ]);
           
           // eslint-disable-next-line @typescript-eslint/no-explicit-any
           const getItems = (res: any) => {
              if (Array.isArray(res?.data)) return res.data;
              if (res?.data?.items) return res.data.items;
              return [];
           };

           const cats = getItems(catRes);
           const counts = getItems(countryRes);
           setCategories(cats);
           setCountries(counts);

           // Initialize from URL
           if (pathname.includes('/the-loai/')) {
               const slug = pathname.split('/the-loai/')[1];
               const found = cats.find((c: Category) => c.slug === slug);
               if (found) setSelectedCategory(found);
           }
           
           const countrySlug = searchParams.get('country') || (pathname.includes('/quoc-gia/') ? pathname.split('/quoc-gia/')[1] : null);
           if (countrySlug) {
               const found = counts.find((c: Country) => c.slug === countrySlug);
               if (found) setSelectedCountry(found);
           }

           const yearSlug = searchParams.get('year') || (pathname.includes('/nam/') ? pathname.split('/nam/')[1] : null);
           if (yearSlug) {
               const found = generatedYears.find((y) => y.slug === yearSlug);
               if (found) setSelectedYear(found);
           }
        } catch (e) {
           console.error("Error fetching filters", e);
        } finally {
            setLoading(false);
        }
     };
     
     fetchFilters();

     const handleClickOutside = (event: MouseEvent) => {
        if (!(event.target as Element).closest('.custom-dropdown')) {
           setOpenDropdown(null);
        }
     };
     document.addEventListener('mousedown', handleClickOutside);
     return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [pathname, searchParams]);

  // Chỉ cập nhật state, KHÔNG gọi API
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSelect = (type: 'category' | 'country' | 'year', item: any) => {
    if (type === 'category') setSelectedCategory(item);
    if (type === 'country') setSelectedCountry(item);
    if (type === 'year') setSelectedYear(item);
    setOpenDropdown(null);
  };

  // Bấm nút "Lọc Phim" mới gọi API
  const handleApplyFilter = () => {
      setIsFiltering(true);
      let basePath = '/danh-sach/phim-moi';
      
      if (selectedCategory) {
          basePath = `/the-loai/${selectedCategory.slug}`;
      } else if (selectedCountry) {
          basePath = `/quoc-gia/${selectedCountry.slug}`;
      } else if (selectedYear) {
          basePath = `/nam/${selectedYear.slug}`;
      } else if (pathname.includes('/danh-sach/') || pathname.includes('/the-loai/') || pathname.includes('/quoc-gia/') || pathname.includes('/nam/')) {
          basePath = pathname;
      }

      const params = new URLSearchParams();
      if (selectedCountry && !basePath.includes(`/quoc-gia/${selectedCountry.slug}`)) {
          params.set('country', selectedCountry.slug);
      }
      if (selectedYear && !basePath.includes(`/nam/${selectedYear.slug}`)) {
          params.set('year', selectedYear.slug);
      }

      const queryString = params.toString();
      const finalUrl = queryString ? `${basePath}?${queryString}` : basePath;
      
      router.push(finalUrl);
      // Reset after a short delay (Next.js will handle the actual navigation)
      setTimeout(() => setIsFiltering(false), 2000);
  };

  const toggleDropdown = (name: string) => {
     if (openDropdown === name) setOpenDropdown(null);
     else setOpenDropdown(name);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Dropdown = ({ title, items, type, selected }: { title: string, items: any[], type: 'category' | 'country' | 'year', selected: any }) => (
      <div className="relative custom-dropdown flex-1 sm:flex-none">
         <button 
            onClick={() => !loading && toggleDropdown(type)}
            className={`flex items-center justify-between w-full sm:w-[140px] appearance-none bg-zinc-900 text-white border border-zinc-700 hover:border-accent px-3 py-2 text-sm font-medium transition-colors duration-200 outline-none rounded ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${selected ? 'border-accent text-accent' : ''}`}
         >
            <span className="truncate mr-2">{selected ? selected.name : title}</span>
            <span className={`text-[10px] transform transition-transform duration-200 flex-shrink-0 ${openDropdown === type ? 'rotate-180' : ''}`}>▼</span>
         </button>

         {openDropdown === type && (
            <div className="absolute top-full left-0 mt-1 w-48 sm:w-[300px] max-h-60 sm:max-h-[400px] overflow-y-auto bg-zinc-900 border border-zinc-700 shadow-2xl z-50 grid grid-cols-1 sm:grid-cols-2 p-1 gap-1 custom-scrollbar rounded-lg">
               <div 
                  onClick={() => handleSelect(type, null)}
                  className="px-3 py-2 text-xs text-gray-400 hover:bg-white/10 hover:text-white cursor-pointer transition-colors rounded col-span-full border-b border-white/5 mb-1"
               >
                  Tất cả
               </div>
               {items.map((item) => (
                  <div 
                     key={item._id} 
                     onClick={() => handleSelect(type, item)}
                     className={`px-3 py-2 text-xs hover:bg-accent hover:text-white cursor-pointer transition-colors whitespace-nowrap overflow-hidden text-ellipsis rounded ${selected?._id === item._id ? 'bg-accent/20 text-accent' : 'text-gray-300'}`}
                  >
                     {item.name}
                  </div>
               ))}
            </div>
         )}
      </div>
  );

  return (
    <div className="flex flex-col gap-4 mb-8 pt-4 px-4 md:px-0">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
             <h2 className="text-2xl md:text-3xl font-bold text-white tracking-wide hidden md:block">Bộ Lọc Phim</h2>
             
             <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                 <Dropdown title="Thể Loại" items={categories} type="category" selected={selectedCategory} />
                 <Dropdown title="Quốc Gia" items={countries} type="country" selected={selectedCountry} />
                 <Dropdown title="Năm" items={years} type="year" selected={selectedYear} />
                 
                 <button 
                    onClick={handleApplyFilter}
                    disabled={isFiltering}
                    className={`w-full sm:w-[140px] h-[40px] bg-accent hover:bg-red-700 text-white font-bold rounded transition-colors shadow-lg shadow-accent/20 flex items-center justify-center gap-2 ${isFiltering ? 'opacity-70 cursor-not-allowed' : ''}`}
                 >
                    {isFiltering ? (
                        <>
                           <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                           <span>Đang lọc...</span>
                        </>
                    ) : (
                        <span>Lọc Phim</span>
                    )}
                 </button>
             </div>
        </div>
    </div>
  );
}

export default function FilterBar() {
  return (
    <Suspense fallback={<div className="h-20 bg-zinc-900/50 animate-pulse rounded-lg mb-8" />}>
      <FilterBarContent />
    </Suspense>
  );
}
