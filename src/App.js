import React, { Component } from 'react'
import ReactCSSTransitionReplace from 'react-css-transition-replace'
import { List } from 'immutable'

import NextIcon from './components/NextIcon'
import BackIcon from './components/BackIcon'
import QuoteModal from './components/QuoteModal'

import './App.css'
import quotes from './quotes'

class App extends Component {

  constructor(props){
    super(props)

    this.state = {
      quote: '',
      author: '',
      background_color: '#668cc9',
      session_history: List(),
      available_quotes: List(quotes),
      history_index: 0
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

  unshiftSessionHistory(prevQuote){
    const new_session_history = this.state.session_history.unshift(prevQuote)
    this.setState({
      session_history: new_session_history
    })
  }

  getRandomQuote(){

    const available_quotes = this.state.available_quotes

    // update the session history with about-to-be-replaced quote
    if(this.state.quote !== ''){
        this.unshiftSessionHistory({
          quote: this.state.quote,
          author: this.state.author
        })
    }

    let max = Math.floor(available_quotes.size)
    let random_index = Math.floor(Math.random() * max)

    //fetch and remove random quotes from available ones
    let new_quote = available_quotes.get(random_index)
    const new_available_quotes = available_quotes.delete(random_index)

    this.setState({
      quote: new_quote['quote'],
      author: new_quote['author'],
      available_quotes: new_available_quotes
    })
  }

  /*
    handleBackButton: fetch a past quote from the history, if it exists, using
    the history_index state variable. Set the quote and author, and increase
    the history_index by one.
  */
  handleBackButton(){
    const cur_history = this.state.session_history
    const cur_index = this.state.history_index
    //two conditions we're guarding against here:
      // 1. user tries to hit back button upon initial app load (i.e. no history no scroll through yet)
      // 2. user has been scrolling back in history and we've hit the end.
    if( !(cur_history.isEmpty()) && cur_index !== cur_history.size ){
      let prev = cur_history.get(cur_index)
      this.setState({
        quote: prev['quote'],
        author: prev['author'],
        history_index: cur_index + 1
      })
    }
  }

  handleNextButton(){

    //we'll need to check and see if history index is 0 before fetching a new.
    const cur_history = this.state.session_history
    const cur_index = this.state.history_index

    if( cur_index === 0 ){
      //then we'll fetch a new quote
      this.getRandomQuote()
      this.refreshBackgroundColor()

    }
    else{
      //means user is making its way back through the history. So let's refresh using the next quote
      let more_recent_quote = cur_history.get(cur_index - 1)
      this.setState({
        quote: more_recent_quote['quote'],
        author: more_recent_quote['author'],
        history_index: cur_index - 1
      })
    }
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
