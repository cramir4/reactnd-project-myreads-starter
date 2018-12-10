import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: this.props.query,
    };
    this.onChange = this.onChange.bind(this);
  }


  onChange(e) {
    const { searchFunction } = this.props;
    this.setState({ query: e.target.value }, searchFunction(e.target.value.trim()));
  }

  render() {
    const { placeholder } = this.props;
    const { query } = this.state;
    return (
      <div>
        <input type="text" value={query} placeholder={placeholder} onChange={this.onChange} />
      </div>
    );
  }
}

Search.propTypes = {
  placeholder: PropTypes.string,
  searchFunction: PropTypes.func.isRequired,
  query: PropTypes.string,
};

Search.defaultProps = {
  placeholder: 'Search for a book',
  query: '',
};

export default Search;
