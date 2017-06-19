import React, { Component } from 'react'
import ReactCSSTransitionReplace from 'react-css-transition-replace'
import { List } from 'immutable'

import QuoteModal from './components/QuoteModal'
import Control from './components/Control'

import './App.css'

import quotes from './quotes'
import colors from './colors'

const BackVector =  () => {
  return (
    <path d="M27,0C12.1,0,0,12.1,0,27s12.1,27,27,27c14.9,0,27-12.1,27-27S41.9,0,27,0z M35,38H19c-0.6,0-1-0.4-1-1
    s0.4-1,1-1h16c0.6,0,1,0.4,1,1S35.6,38,35,38z M35.4,25.9l-16,8C19.3,34,19.2,34,19,34c-0.4,0-0.7-0.2-0.9-0.6
    c-0.2-0.5,0-1.1,0.4-1.3L32.8,25l-14.2-7.1c-0.5-0.2-0.7-0.8-0.4-1.3c0.2-0.5,0.8-0.7,1.3-0.4l16,8c0.3,0.2,0.6,0.5,0.6,0.9
    S35.8,25.7,35.4,25.9z"/>
  )
}

const NextVector = () => {
  return (
    <path d="M27,0C12.1,0,0,12.1,0,27s12.1,27,27,27c14.9,0,27-12.1,27-27S41.9,0,27,0z M35,38H19c-0.6,0-1-0.4-1-1
  	s0.4-1,1-1h16c0.6,0,1,0.4,1,1S35.6,38,35,38z M35.4,25.9l-16,8C19.3,34,19.2,34,19,34c-0.4,0-0.7-0.2-0.9-0.6
  	c-0.2-0.5,0-1.1,0.4-1.3L32.8,25l-14.2-7.1c-0.5-0.2-0.7-0.8-0.4-1.3c0.2-0.5,0.8-0.7,1.3-0.4l16,8c0.3,0.2,0.6,0.5,0.6,0.9
  	S35.8,25.7,35.4,25.9z"/>
  )
}

class App extends Component {

  constructor(props){
    super(props)

    //randomize order of quotes at start of session
    const shuffled = List(this.shuffleQuotes(quotes))
    const init = shuffled.get(0)

    const bgcolors = List(colors)

    this.state = {
      quote: init.quote,
      author: init.author,
      available_quotes: shuffled,
      colors: bgcolors,
      index: 0
    }
  }

  // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  shuffleQuotes(arr){
    let curIndex = arr.length, tempVal, randIndex

    while(0 !== curIndex){
      //pick remaining element
      randIndex = Math.floor(Math.random() * curIndex)
      curIndex -= 1

      //swap with current
      tempVal = arr[curIndex]
      arr[curIndex] = arr[randIndex]
      arr[randIndex] = tempVal
    }

    return arr
  }

  getRandomColor(){
    let ind = Math.floor(Math.random() * this.state.colors.size)
    return this.state.colors.get(ind)
  }

  performUpdate(){
    const nq = this.state.available_quotes.get(this.state.index)
    this.setState({
      quote: nq.quote,
      author: nq.author,
    })
  }

  handleBackButton(){
    this.setState({
      index: this.state.index - 1
    }, this.performUpdate)
  }

  handleNextButton(){
    this.setState({
      index: this.state.index + 1
    }, this.performUpdate)
  }

  render() {

    const bgcolor = this.getRandomColor()
    const container_style  = {
      backgroundColor: bgcolor,
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

        <div className="control-section">
          <div className="control-container">
            <Control width={"40"} height={"40"} icon={"arrow-back"} onClickFunction={this.handleBackButton.bind(this)} className="inline-control" />
          </div>
          <div className="control-container">
            <Control width={"40"} height={"40"} icon={"arrow-forward"} onClickFunction={this.handleNextButton.bind(this)} className="inline-control" />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
