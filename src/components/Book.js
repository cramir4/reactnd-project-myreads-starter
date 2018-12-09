import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Book extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { title, authors, thumbnail } = this.props;
    const authorRow = authors && authors.map(author => <div key={author} className="book-authors">{author}</div>);
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ backgroundImage: `url(${thumbnail})` }} />
          <div className="book-shelf-changer">
            <select>
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
  title: PropTypes.string.isRequired,
  authors: PropTypes.arrayOf(PropTypes.string),
  thumbnail: PropTypes.string,
};
Book.defaultProps = {
  thumbnail: 'https://books.google.com/books/content?id=fcArAQAAMAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE725qmrtGiJe_eWzh6SHdN-jTwVpNXMNEMz-bPdy-I7oyyG69yj-4adBLypA2pSMTUqmHlVthWXNFRvewG0m26bcqcTDP9WYWv-nJbX-PDVJjdHgIyIUQrsSANZTvEDGHXU3c3Yt',
  authors: ['unknown'],
};

export default Book;
