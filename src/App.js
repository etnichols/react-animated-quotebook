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

    //randomize order of quotes at start of session
    const shuffled = List(this.shuffleQuotes(quotes))
    const init = shuffled.get(0)

    this.state = {
      quote: init.quote,
      author: init.author,
      available_quotes: shuffled,
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

  // https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
  generateRandomHexColor(){
    let hex_val = []
    const possible = "0123456789ABCDEFG"

    for(let i = 0; i < 6; i++){
      hex_val.push(possible.charAt(Math.floor(Math.random() * possible.length)))
    }

    hex_val.unshift('#')
    let color = hex_val.join('')

    return color
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
    const bgcolor = this.generateRandomHexColor()
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
