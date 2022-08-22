import PropTypes from 'prop-types';
import { Component } from 'react';

import styles from './Searchbar.module.css';


export class Searchbar extends Component {
  static defaultProps = { onSubmit: null };

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };
  state = {
    searchQuery: '',
  };

  handleInputChange = event => {
    const { name, value } = event.currentTarget;
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();

  const { searchQuery } = this.state;
  const searchQueryNormalize = searchQuery.trim().toLowerCase();

if (!searchQueryNormalize) {
  return;
}

this.props.onSubmit(searchQueryNormalize);
this.setState({ searchQuery: '' });
};

render() {
  return (
    <header className={styles.Searchbar}>
      <form className={styles.SearchForm} onSubmit={this.handleSubmit}>
        <button type="submit" className={styles.SearchFormButton}>
          <span className={styles.SearchFormButtonLabel}>Search</span>
        </button>

        <input
          className={styles.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={this.state.searchQuery}
          onChange={this.handleInputChange}
        />
      </form>
    </header>
  );
  }
}
