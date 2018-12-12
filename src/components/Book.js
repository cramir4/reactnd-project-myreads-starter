import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Book extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const { updateBook, book } = this.props;
    updateBook(book, e.target.value);
  }

  render() {
    const { book } = this.props;
    const {
      title, authors, imageLinks, shelf,
    } = book;
    const authorRow = authors && authors.map(author => <div key={author} className="book-authors">{author}</div>);
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={imageLinks ? { backgroundImage: `url(${imageLinks.thumbnail})` } : { backgroundImage: 'https://dummyimage.com/128x193/2e7c31/fff.png&text=Cover+Missing' }} />
          <div className="book-shelf-changer">
            <select onChange={this.handleChange} value={shelf || 'none'}>
              <option value="move" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{title}</div>
        {authorRow}
      </div>
    );
  }
}

Book.propTypes = {
  updateBook: PropTypes.func.isRequired,
  book: PropTypes.shape({
    title: PropTypes.string,
    authors: PropTypes.array,
    id: PropTypes.string,
  }).isRequired,
};

export default Book;
