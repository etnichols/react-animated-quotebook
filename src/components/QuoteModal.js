import React, { Component } from 'react';
import './styles.css'

class QuoteModal extends Component {
  render(){
    return(
      <div className="text-center quote-modal">
        <p>"{this.props.quote}"</p>
          <hr/>
        <p>- {this.props.author}</p>
      </div>
    )
  }
}

export default QuoteModal
