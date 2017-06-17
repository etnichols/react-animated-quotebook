import React, { Component } from 'react'
import ReactCSSTransitionReplace from 'react-css-transition-replace'
import { Stack } from 'immutable'

import NextIcon from './components/NextIcon'
import BackIcon from './components/BackIcon'
import QuoteModal from './components/QuoteModal'

import './App.css'
import quotes from './quotes'

class App extends Component {

  constructor(props){
    super(props)

    //init immutable.js list with quotes object

    //init session_history to empty list

    this.state = {
      quote: '',
      author: '',
      background_color: '#668cc9',
      quote_duration: 15,
      session_history: [],
      available_quotes: quotes
    }
  }

  // https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
  refreshBackgroundColor(){
    let hex_val = []
    let possible = "0123456789ABCDEFG"

    for(let i = 0; i < 6; i++){
      hex_val.push(possible.charAt(Math.floor(Math.random() * possible.length)))
    }

    hex_val.unshift('#')
    let color = hex_val.join('')

    this.setState({
      background_color: color
    })
  }

  pushSessionHistory(prevQuote){
    let new_session_history = this.state.session_history
    new_session_history.unshift(prevQuote)

    this.setState({
      session_history: new_session_history
    })
  }

  getRandomQuote(){
    // ... but first handle preserving session history.
    this.pushSessionHistory({
      quote: this.state.quote,
      author: this.state.author
    })

    let min = Math.ceil(0)
    let max = Math.floor(quotes.length)
    let random_index = Math.floor(Math.random() * (max - min)) + min

    this.setState({
      quote: quotes[random_index]['quote'],
      author: quotes[random_index]['author']
    })
  }

  handleBackButton(){
    //if history actually exists...
    if(this.state.session_history !== []){
      clearInterval(this.state.driver_interval)
      let prevQuote = this.popSessionHistory()
      if(prevQuote !== undefined){
        this.setState({
          quote: prevQuote['quote'],
          author: prevQuote['author']
        })
      }
    }
  }

  handleNextButton(){
    this.getRandomQuote();
    this.refreshBackgroundColor()
  }

  componentWillUnmount(){
  }

  componentWillMount(){
    this.getRandomQuote()
  }

  render() {

    const container_style  = {
      backgroundColor: this.state.background_color,
      transition: 'background-color 1s ease'
    }

    return (
      <div className="App" style={container_style}>
        <div className="App-header">
          <h2 className="animated fadeIn">Quotebook</h2>
        </div>

        <ReactCSSTransitionReplace transitionName="cross-fade" transitionEnterTimeout={1500} transitionLeaveTimeout={1500} >
          <QuoteModal key={this.state.quote} quote={this.state.quote} author={this.state.author} />
        </ReactCSSTransitionReplace>

        <div className="controls-section">
          <div className="history-control-container">
            <BackIcon onClickFunction={this.handleBackButton.bind(this)} className="inline-control history-control" />
            <NextIcon onClickFunction={this.handleNextButton.bind(this)} className="inline-control history-control" />
          </div>
        </div>
    </div>
    );
  }
}

export default App;
