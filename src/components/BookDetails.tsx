import React from 'react';
import { Book } from '../interfaces/interface'; // Импорт типов

interface BookDetailsProps {
  book: Book;
}

const BookDetails: React.FC<BookDetailsProps> = ({ book }) => {
  return (
    <div>
      <h2>{book.title}</h2>
      <img src={book.cover} alt="cover" />
      <p>Authors: {book.authors}</p>
      <p>Publisher: {book.publisher}</p>
      <p>Reviews:</p>
      <ul>
        {book.reviewDetails.map((review, idx) => (
          <li key={idx}>{review}</li>
        ))}
      </ul>
    </div>
  );
};

export default BookDetails;