import { CSSTransitionGroup } from 'react-transition-group'
import React, { Component } from 'react';
import './styles.css'

class MinusIcon extends Component {
  render(){
    return(
    <svg onClick={this.props.onClickFunction} style={{fill: '#FFF'}} width="40" height="40" viewBox="0 0 55 54" >
	     <path d="M27,0C12.1,0,0,12.1,0,27s12.1,27,27,27s27-12.1,27-27S41.9,0,27,0z M41,28 H13c-0.6,0-1-0.4-1-1s0.4-1,1-1h28c0.6,0,1,0.4,1,1S41.6,28,41,28z"/>
     </svg>
    )
  }
}

export default MinusIcon
