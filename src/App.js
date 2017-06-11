import React, { Component } from 'react';

import QuoteModal from './components/QuoteModal'
import logo from './logo.svg';
import './App.css';

import quotes from './quotes'


class App extends Component {

  fetchRandomQuote(){

  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Quotebook</h2>
        </div>
        <QuoteModal />
      </div>

    );
  }
}

export default App;
