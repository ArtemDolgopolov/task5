import React, { useState, useEffect } from 'react';
import BookTable from './components/BookTable';
import generateBook from './helpers/generateBook';
import { Book } from './interfaces/interface';
import 'bootstrap/dist/css/bootstrap.min.css';

const locales = { EN: 'en', DE: 'de', FR: 'fr' } as const;
type LanguageKey = keyof typeof locales;

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
      ({ ...generateBook(seed, page, locale, avgLikes, avgReviews), index: page * 20 + index + 1 })
    );
    setBooks(newBooks);
  }, [language, seed, avgLikes, page]);

  const loadMoreBooks = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div className="container mt-4 text-center">
      <h1 className="text-center">Book Store Test</h1>

      <div className="row mb-3">
        <div className="col-md-4">
          <label className="form-label">Language:</label>
          <select className="form-select" onChange={(e) => setLanguage(e.target.value as LanguageKey)} value={language}>
            <option value="EN">English</option>
            <option value="DE">Deutsch (Germany)</option>
            <option value="FR">Français (France)</option>
          </select>
        </div>
        <div className="col-md-4">
          <label className="form-label">Seed:</label>
          <input 
            type="number" 
            className="form-control"
            value={seed} 
            onChange={(e) => setSeed(Number(e.target.value))} 
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-6">
          <label className="form-label">Avg Likes: {avgLikes.toFixed(1)}</label>
          <input 
            type="range" 
            className="form-range"
            min="0" 
            max="10" 
            step="0.1" 
            value={avgLikes} 
            onChange={(e) => setAvgLikes(parseFloat(e.target.value))} 
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Avg Reviews: {avgReviews.toFixed(1)}</label>
          <input 
            type="range" 
            className="form-range"
            min="0" 
            max="10" 
            step="0.1" 
            value={avgReviews} 
            onChange={(e) => setAvgReviews(parseFloat(e.target.value))} 
          />
        </div>
      </div>

      <BookTable books={books} loadMoreBooks={loadMoreBooks} />
    </div>
  );
};

export default App;