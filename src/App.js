import React, { Component } from 'react'
import ReactCSSTransitionReplace from 'react-css-transition-replace'
import { List } from 'immutable'

import NextIcon from './components/NextIcon'
import BackIcon from './components/BackIcon'
import QuoteModal from './components/QuoteModal'

import './App.css'
import quotes from './quotes'
import colors from './colors'

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
    }, () => {
      console.log("performUpdate Completed")
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

        <div className="controls-section">
          <BackIcon onClickFunction={this.handleBackButton.bind(this)} className="inline-control history-control" />
          <NextIcon onClickFunction={this.handleNextButton.bind(this)} className="inline-control history-control" />
        </div>
      </div>
    );
  }
}

export default App;
