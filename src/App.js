import React from 'react';
import './App.css';
import { Route, Link } from 'react-router-dom';
import Search from './components/Search';
import * as BooksAPI from './BooksAPI';
import BookShelf from './components/BookShelf';
import Book from './components/Book';


class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      library: [],
    };
    this.getAll = this.getAll.bind(this);
  }

  componentDidMount() {
    this.getAll();
  }

  getAll() {
    BooksAPI.getAll()
      .then((library) => {
        this.setState(() => ({
          library,
        }));
      });
  }

    searchFunction = (query) => {
      query ? (BooksAPI.search(query)
        .then(
          data => this.setState(() => ({
            books: data,
          })),
        )) : (
        this.setState(() => (
          { books: [] }
        ))
      );
    };

    searchMapped = () => {
      const { books } = this.state;
      return (books.length > 0) && books.map(book => (
        <li key={book.id}>
          <Book
            updateBook={this.updateBook}
            book={book}
          />
        </li>
      ));
    };

    shelved = (shelf) => {
      const { library } = this.state;
      return library.length > 0 ? library.filter(book => book.shelf && (book.shelf === shelf)) : [];
    };

    updateBook = (book, shelf) => {
      BooksAPI.update(book, shelf).then(
        shelf !== 'none' ? this.getAll() : this.setState(prev => ({
          library: prev.library.filter(b => b.id !== book.id),
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
                    onClick={this.getAll}
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
                    <BookShelf
                      title="Currently Reading"
                      books={this.shelved('currentlyReading')}
                      updateBook={this.updateBook}
                    />
                    <BookShelf
                      title="Want to Read"
                      books={this.shelved('wantToRead')}
                      updateBook={this.updateBook}
                    />
                    <BookShelf
                      title="Read"
                      books={this.shelved('read')}
                      updateBook={this.updateBook}
                    />
                  </div>
                </div>
                <div className="open-search">
                  <Link to="/search" className="open-search" onClick={() => this.searchFunction()} />
                </div>
              </div>
            )}
          />
        </div>
      );
    }
}

export default BooksApp;
