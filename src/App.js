import React, { Component } from 'react';
import ReactCSSTransitionReplace from 'react-css-transition-replace';

import './App.css';

import QuoteModal from './components/QuoteModal'
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

  componentWillMount(){
    this.getRandomQuote()
  }

  componentDidMount(){
    let interval_id = setInterval(this.getRandomQuote.bind(this), 5000)
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
          <h2 className="animated fadeIn">Quotebook</h2>
        </div>
            <ReactCSSTransitionReplace
              transitionName="cross-fade"
              transitionEnterTimeout={1500}
              transitionLeaveTimeout={1500}>
                <QuoteModal key={this.state.quote} quote={this.state.quote} author={this.state.author} />
            </ReactCSSTransitionReplace>
      </div>
    );
  }
}

export default App;
