import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

function BookShelf({ title, books, updateBook }) {
  const bookRow = books.length > 0 && books.map(book => (
    <li key={book.id}>
      <Book
        updateBook={updateBook}
        book={book}
      />
    </li>
  ));
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {bookRow}
        </ol>
      </div>
    </div>
  );
}

BookShelf.propTypes = {
  books: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
  updateBook: PropTypes.func.isRequired,
};

BookShelf.defaultProps = {
  books: [],
};

export default BookShelf;
