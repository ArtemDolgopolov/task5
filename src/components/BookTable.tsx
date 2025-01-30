import React, { useState } from 'react';
import { Book } from '../interfaces/interface';

interface BookTableProps {
  books: Book[];
  loadMoreBooks: () => void;
}

const BookTable: React.FC<BookTableProps> = ({ books, loadMoreBooks }) => {
  const [openBookIndex, setOpenBookIndex] = useState<number | null>(null);

  const handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const bottom = e.currentTarget.scrollHeight === e.currentTarget.scrollTop + e.currentTarget.clientHeight;
    if (bottom) {
      loadMoreBooks();
    }
  };

  return (
    <div onScroll={handleScroll} style={{ height: '500px', overflowY: 'auto' }}>
      <table>
        <thead>
          <tr>
            <th>Index</th>
            <th>ISBN</th>
            <th>Title</th>
            <th>Author</th>
            <th>Publisher</th>
            <th>Likes</th>
            <th>Reviews</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, idx) => (
            <React.Fragment key={book.isbn}>
              <tr>
                <td>{book.index}</td>
                <td>{book.isbn}</td>
                <td>{book.title}</td>
                <td>{book.authors}</td>
                <td>{book.publisher}</td>
                <td>{book.likes}</td>
                <td>{book.reviews}</td>
                <td>
                  <button onClick={() => setOpenBookIndex(openBookIndex === idx ? null : idx)}>
                    {openBookIndex === idx ? 'Hide Details' : 'Show Details'}
                  </button>
                </td>
              </tr>
              {openBookIndex === idx && (
                <tr>
                  <td colSpan={8}>
                    <div style={{ display: 'flex', padding: '10px', backgroundColor: '#f9f9f9' }}>
                      <img src={book.cover} alt="Book Cover" style={{ width: '100px', marginRight: '10px' }} />
                      <ul>
                        {book.reviewDetails.map((review, i) => (
                          <li key={i}>{review}</li>
                        ))}
                      </ul>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookTable;