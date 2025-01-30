import React, { useState, useEffect } from 'react';
import BookTable from './components/BookTable';
import generateBook from './helpers/generateBook';
import { Book } from './interfaces/interface';

const locales = { EN: 'en', DE: 'de', FR: 'fr' } as const;
type LanguageKey = keyof typeof locales;
type LanguageValue = (typeof locales)[LanguageKey];

const App: React.FC = () => {
  const [language, setLanguage] = useState<LanguageKey>('EN');
  const [seed, setSeed] = useState<number>(Math.floor(Math.random() * 10000));
  const [avgLikes, setAvgLikes] = useState<number>(5.0);
  const [avgReviews, setAvgReviews] = useState<number>(5.0);
  const [books, setBooks] = useState<Book[]>([]);
  const [page, setPage] = useState<number>(0);

  useEffect(() => {
   const locale = locales[language];
   
   if (!locale) return;
 
   const newBooks = Array.from({ length: 20 }).map((_, index) =>
     generateBook(seed, page, locale)
   );
   setBooks(newBooks);
 }, [language, seed, avgLikes, avgReviews, page]);

  const loadMoreBooks = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div>
      <h1>Book Store Test</h1>
      
      <div>
        <label>Language:</label>
        <select onChange={(e) => setLanguage(e.target.value as LanguageKey)} value={language}>
          <option value="EN">English</option>
          <option value="DE">Deutsch (Germany)</option>
          <option value="FR">Français (France)</option>
        </select>
        
        <label>Seed:</label>
        <input 
          type="number" 
          value={seed} 
          onChange={(e) => setSeed(Number(e.target.value))} 
        />
        
        <label>Avg Likes:</label>
        <input 
          type="range" 
          min="0" 
          max="10" 
          step="0.1" 
          value={avgLikes} 
          onChange={(e) => setAvgLikes(parseFloat(e.target.value))} 
        />
        
        <label>Avg Reviews:</label>
        <input 
          type="range" 
          min="0" 
          max="10" 
          step="0.1" 
          value={avgReviews} 
          onChange={(e) => setAvgReviews(parseFloat(e.target.value))} 
        />
      </div>

      <BookTable books={books} loadMoreBooks={loadMoreBooks} />
    </div>
  );
};

export default App;