import React, { Component } from 'react'
//import ReactCSSTransitionReplace from 'react-css-transition-replace'
import { List } from 'immutable'

import QuoteModal from './components/QuoteModal'
import Control from './components/Control'

import './App.css'

import quotes from './quotes'
import colors from './colors'

class App extends Component {

  constructor(props){
    super(props)

    //randomize order of quotes at start of session
    const shuffled = List(quotes)
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
    //guard against users who are start scrolling backwards immediately and miraculously make it all the way through
    if(this.state.index === -(this.state.available_quotes.size - 1)){
        this.setState({
          index: 0
        }, this.performUpdate)
    } else {
        this.setState({
          index: this.state.index - 1
        }, this.performUpdate)
    }
  }

  handleNextButton(){
    //guard against reaching end of quotes array and having to "wrap back around"
    if(this.state.index === (this.state.available_quotes.size - 1)){
        this.setState({
          index: 0
        }, this.performUpdate)
    } else {
        this.setState({
          index: this.state.index + 1
        }, this.performUpdate)
    }
  }

  render() {

    return (
      <div className="App" style={{}}>
        <div className="App-header">
          <h2 className="animated fadeIn">Quotebook</h2>
        </div>

          <QuoteModal key={1} quote={this.state.quote} author={this.state.author} />

        <div className="control-section">
          <div className="control-container">
            <Control
              className="inline-control"
              width={"40"}
              height={"40"}
              icon={"arrow-back"}
              onClickFunction={this.handleBackButton.bind(this)}
              />
          </div>
          <div className="control-container">
            <Control
              className="inline-control"
              width={"40"}
              height={"40"}
              icon={"arrow-forward"}
              onClickFunction={this.handleNextButton.bind(this)}
              />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
