import React, { Component } from 'react';
import ReactCSSTransitionReplace from 'react-css-transition-replace';

import './App.css'

import PlusIcon from './components/PlusIcon'
import MinusIcon from './components/MinusIcon'
import NextIcon from './components/NextIcon'

import QuoteModal from './components/QuoteModal'
import quotes from './quotes'

class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      quote: '',
      author: '',
      background_color: '#668cc9',
      color_interval: null,
      quote_interval: null,
      quote_duration: 15
    }
  }

  //https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
  generateRandomHexColor(){
    let text = []
    let possible = "0123456789ABCDEFG"

    for(let i = 0; i < 6; i++){
      text.push(possible.charAt(Math.floor(Math.random() * possible.length)))
    }

    text.unshift('#')
    let color = text.join('')

    this.setState({
      background_color: color
    })
  }

  getRandomQuote(){
    let min = Math.ceil(0)
    let max = Math.floor(quotes.length)
    let random_index = Math.floor(Math.random() * (max - min)) + min
    this.setState({
      quote: quotes[random_index]['quote'],
      author: quotes[random_index]['author']
    })
  }

  randomnessDriver(){
    this.getRandomQuote()
    this.generateRandomHexColor()
  }

  componentWillMount(){
    this.getRandomQuote()
  }

  handleNextButton(){
    clearInterval(this.state.driver_interval)
    this.getRandomQuote();
    this.generateRandomHexColor()
    let driver_interval = setInterval(this.randomnessDriver.bind(this), this.state.quote_duration * 1000)
    this.setState({
      driver_interval: driver_interval,
    })
  }

  componentDidMount(){
    let driver_interval = setInterval(this.randomnessDriver.bind(this), this.state.quote_duration * 1000)
    this.setState({
      driver_interval: driver_interval,
    })
  }

  handleDecrementDuration(){
    clearInterval(this.state.driver_interval)
    if(this.state.quote_duration !== 10){
      let new_duration = this.state.quote_duration - 5
      let driver_interval = setInterval(this.randomnessDriver.bind(this), new_duration * 1000)
      this.setState({
        driver_interval: driver_interval,
        quote_duration: new_duration
      }, () => {
        console.log("Duration decremented to : " + this.state.quote_duration)
      })
    }
  }

  handleIncrementDuration(){
    clearInterval(this.state.driver_interval)
    if(this.state.quote_duration !== 60){
      let new_duration = this.state.quote_duration + 5
      let driver_interval = setInterval(this.randomnessDriver.bind(this), new_duration * 1000)
      this.setState({
        driver_interval: driver_interval,
        quote_duration: new_duration
      }, () => {
        console.log("Duration incremented to : " + this.state.quote_duration)
      })
    }
  }

  componentWillUnmount(){
    clearInterval(this.state.driver_interval)
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
          <ReactCSSTransitionReplace
            transitionName="cross-fade"
            transitionEnterTimeout={1500}
            transitionLeaveTimeout={1500}
          >
              <QuoteModal key={this.state.quote} quote={this.state.quote} author={this.state.author} />
          </ReactCSSTransitionReplace>
        <div className="controls-section">
          <MinusIcon onClickFunction={this.handleDecrementDuration.bind(this)} className="inline-control" />
          <p className="duration-text inline-control">{this.state.quote_duration} sec</p>
          <PlusIcon onClickFunction={this.handleIncrementDuration.bind(this)} className="inline-control" />
          <div className="next-icon-container">
            <NextIcon onClickFunction={this.handleNextButton.bind(this)} className="inline-control" />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
