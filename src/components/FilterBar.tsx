'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { movieApi } from '@/service/api';

interface Category { _id: string; slug: string; name: string; }
interface Country { _id: string; slug: string; name: string; }
interface Year { _id: string; slug: string; name: string; }

export default function FilterBar() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [years, setYears] = useState<Year[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Custom dropdown state
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
     // Generate years from Current Year down to 2000 synchronously
     const currentYear = new Date().getFullYear();
     const generatedYears = Array.from({ length: currentYear - 2000 + 1 }, (_, i) => {
         const year = (currentYear - i).toString();
         return { _id: year, slug: year, name: year };
     });
     setYears(generatedYears);

     const fetchFilters = async () => {
        try {
           // Only fetch dynamic categories and countries
           const [catRes, countryRes] = await Promise.all([
              movieApi.getCategories().catch(() => ({ data: [] })),
              movieApi.getCountries().catch(() => ({ data: [] }))
           ]);
           
           const getItems = (res: any) => {
              if (Array.isArray(res?.data)) return res.data;
              if (res?.data?.items) return res.data.items;
              return [];
           };

           setCategories(getItems(catRes));
           setCountries(getItems(countryRes));
        } catch (e) {
           console.error("Error fetching filters", e);
        } finally {
            setLoading(false);
        }
     };
     
     fetchFilters();

     // Click outside to close
     const handleClickOutside = (event: MouseEvent) => {
        if (!(event.target as Element).closest('.custom-dropdown')) {
           setOpenDropdown(null);
        }
     };
     document.addEventListener('mousedown', handleClickOutside);
     return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleFilterChange = (type: 'category' | 'country' | 'year', value: string) => {
    if (!value) return;
    setOpenDropdown(null); // Close dropdown
    if (type === 'category') router.push(`/the-loai/${value}`);
    if (type === 'country') router.push(`/quoc-gia/${value}`);
    if (type === 'year') router.push(`/nam/${value}`);
  };

  const toggleDropdown = (name: string) => {
     if (openDropdown === name) setOpenDropdown(null);
     else setOpenDropdown(name);
  }

  // Render the UI immediately (skeleton state is just the UI with disabled interactions)
  
  const Dropdown = ({ title, items, type }: { title: string, items: any[], type: 'category' | 'country' | 'year' }) => (
      <div className="relative custom-dropdown">
         <button 
            onClick={() => !loading && toggleDropdown(type)}
            className={`flex items-center justify-between w-[140px] appearance-none bg-black text-white border border-white/30 hover:border-white px-3 py-1.5 text-sm font-semibold transition-colors duration-200 outline-none ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
         >
            <span>{title}</span>
            <span className={`text-[10px] transform transition-transform duration-200 ${openDropdown === type ? 'rotate-180' : ''}`}>▼</span>
         </button>

         {openDropdown === type && (
            <div className="absolute top-full left-0 mt-1 w-[300px] max-h-[400px] overflow-y-auto bg-black/95 border border-white/20 shadow-xl z-50 grid grid-cols-2 p-2 gap-1 custom-scrollbar">
               {items.map((item) => (
                  <div 
                     key={item._id} 
                     onClick={() => handleFilterChange(type, item.slug)}
                     className="px-3 py-2 text-sm text-gray-200 hover:bg-white/10 hover:text-white cursor-pointer transition-colors whitespace-nowrap overflow-hidden text-ellipsis"
                  >
                     {item.name}
                  </div>
               ))}
            </div>
         )}
      </div>
  );

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between mb-8 pt-4 px-4 md:px-0">
       <div className="flex items-center gap-4 mb-4 sm:mb-0">
          <h2 className="text-3xl font-bold text-white tracking-wide">Danh Sách Phim</h2>
       </div>
       
       <div className="flex flex-wrap items-center gap-3 justify-center sm:justify-end">
         <Dropdown title="Thể Loại" items={categories} type="category" />
         <Dropdown title="Quốc Gia" items={countries} type="country" />
         <Dropdown title="Năm" items={years} type="year" />
       </div>
    </div>
  );
}
