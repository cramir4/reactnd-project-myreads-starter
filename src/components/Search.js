import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DebounceInput } from 'react-debounce-input';

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
        <DebounceInput
          type="text"
          value={query}
          placeholder={placeholder}
          onChange={this.onChange}
          debounceTimeout="200"
        />
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
