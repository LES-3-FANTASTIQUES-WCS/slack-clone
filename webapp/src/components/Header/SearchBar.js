import React, { Component } from 'react';
import { Search } from 'semantic-ui-react';
import times from 'lodash/times';
import escapeRegExp from 'lodash/escapeRegExp';
import filter from 'lodash/filter';
import debounce from 'lodash/debounce';
import faker from 'faker';

const source = times(10, () => ({
  title: faker.company.companyName(),
  description: faker.company.catchPhrase(),
  image: faker.internet.avatar(),
  price: faker.finance.amount(0, 100, 2, '$'),
}));

const initialState = { isLoading: false, results: [], value: '' };

class SearchExampleStandard extends Component {
  state = initialState;

  handleResultSelect = (e, { result }) =>
    this.setState({ value: result.title });

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });

    setTimeout(() => {
      if (this.state.value.length < 1) return this.setState(initialState);

      const re = new RegExp(escapeRegExp(this.state.value), 'i');
      const isMatch = result => re.test(result.title);

      this.setState({
        isLoading: false,
        results: filter(source, isMatch),
      });
    }, 300);
  };

  render() {
    const { isLoading, value, results } = this.state;

    return (
      <Search
        size="mini"
        aligned="right"
        loading={isLoading}
        onResultSelect={this.handleResultSelect}
        onSearchChange={debounce(this.handleSearchChange, 500, {
          leading: true,
        })}
        results={results}
        value={value}
        {...this.props}
      />
    );
  }
}

export default SearchExampleStandard;
