'use client';

import { Provider } from 'react-redux';
import { store } from './store';
import { ReactNode, useEffect } from 'react';
import { setFavorites, setHistory } from './slices/movieSlice';

import { setLoading } from './slices/loadingSlice';
import GlobalLoader from '@/components/GlobalLoader';

export default function ReduxProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Hydrate from localStorage
    const favorites = localStorage.getItem('favorites');
    const history = localStorage.getItem('history');

    if (favorites) {
      store.dispatch(setFavorites(JSON.parse(favorites)));
    }
    if (history) {
      store.dispatch(setHistory(JSON.parse(history)));
    }

   
    const timer = setTimeout(() => {
        store.dispatch(setLoading(false));
    }, 800); // 0.8s splash

    return () => clearTimeout(timer);
  }, []);

  return (
      <Provider store={store}>
          <GlobalLoader />
          {children}
      </Provider>
  );
}
