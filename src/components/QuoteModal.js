import React, { Component } from 'react';
import './styles.css'

class QuoteModal extends Component {
  render(){
    return(
      <div className="text-center quote-modal">
        <p>This will be a quote.</p>
          <hr/>
        <p>-Author</p>
      </div>
    )
  }
}

export default QuoteModal
