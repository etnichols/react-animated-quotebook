import React, { Component } from 'react';
import './styles.css'

class QuoteModal extends Component {

  constructor(props){
    super(props)
  }

  render(){
    let quote = null
    let author = null

    if(this.props.quote !== ''){
      quote = <p className="quote-text">"{this.props.quote}"</p>
    }

    if(this.props.author !== ''){
      author = <p className="">- {this.props.author}</p>
    }

    return(
      <div className="text-center quote-modal">
        {quote}
          <hr/>
        {author}
      </div>
    )
  }
}

export default QuoteModal
