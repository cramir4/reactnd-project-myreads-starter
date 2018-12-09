import React from 'react';
import './App.css';
import { Route, Link } from 'react-router-dom';
import Search from './components/Search';
import * as BooksAPI from './BooksAPI';
import BookShelf from './components/BookShelf';
import Book from './components/Book';


class BooksApp extends React.Component {
  state = {
    books: [],
  };

  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          books,
        }));
      });
  }

  searchFunction = (query) => {
    BooksAPI.search(query)
      .then(
        data => this.setState(() => ({
          books: data,
        })),
      );
  };

  searchMapped() {
    const { books } = this.state;
    return books.map(book => (
      <li key={book.id}>
        <Book title={book.title} authors={book.authors} thumbnail={book.imageLinks.thumbnail} />
      </li>
    ));
  }

  shelved(shelf) {
    const { books } = this.state;
    return books.filter(book => book.shelf && (book.shelf === shelf));
  }

  updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf).then(
      this.setState(() => ({
        books: shelf,
    })),
    );
  };

  render() {
    return (
      <div className="app">
        <Route
          path="/search"
          render={() => (
            <div className="search-books">
              <div className="search-books-bar">
                <Link
                  to="/"
                  className="close-search"
                />
                <div className="search-books-input-wrapper">
                  <Search searchFunction={this.searchFunction} />
                </div>
              </div>
              <div className="search-books-results">
                <ol className="books-grid">
                  {this.searchMapped()}
                </ol>
              </div>
            </div>
          )}
        />

        <Route
          exact
          path="/"
          render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <BookShelf title="Currently Reading" books={this.shelved('currentlyReading')} />
                  <BookShelf title="Want to Read" books={this.shelved('wantToRead')} />
                  <BookShelf title="Read" books={this.shelved('read')} />
                </div>
              </div>
              <div className="open-search">
                <Link to="/search" className="open-search" />
              </div>
            </div>
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
