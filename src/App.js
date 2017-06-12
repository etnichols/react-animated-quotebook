import React, { Component } from 'react';

import QuoteModal from './components/QuoteModal'
import logo from './logo.svg';
import './App.css';

import quotes from './quotes'

class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      quote: '',
      author: ''
    }
  }

  getRandomQuote(){
    console.log("getting new quote")
    let min = Math.ceil(0)
    let max = Math.floor(quotes.length)
    let random_index = Math.floor(Math.random() * (max - min)) + min
    this.setState({
      quote: quotes[random_index]['quote'],
      author: quotes[random_index]['author']
    })
  }

  componentDidMount(){
    let interval_id = setInterval(this.getRandomQuote.bind(this), 10000)
    this.setState({
      interval_id: interval_id
    })
  }

  componentWillUnmount(){
    clearInterval(this.state.interval_id)
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Quotebook</h2>
        </div>
        <QuoteModal quote={this.state.quote} author={this.state.author} />
      </div>

    );
  }
}

export default App;
