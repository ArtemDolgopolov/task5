import React from 'react';
import { Book } from '../interfaces/interface';

interface BookTableProps {
  books: Book[];
  loadMoreBooks: () => void;
}

const BookTable: React.FC<BookTableProps> = ({ books, loadMoreBooks }) => {
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
          </tr>
        </thead>
        <tbody>
          {books.map((book, idx) => (
            <tr key={book.isbn}>
              <td>{book.index}</td>
              <td>{book.isbn}</td>
              <td>{book.title}</td>
              <td>{book.authors}</td>
              <td>{book.publisher}</td>
              <td>{book.likes}</td>
              <td>{book.reviews}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookTable;