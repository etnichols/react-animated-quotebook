import { CSSTransitionGroup } from 'react-transition-group'
import React, { Component } from 'react';
import './styles.css'

class BackIcon extends Component {
  render(){
    return(
    <svg
      onClick={this.props.onClickFunction}
        style={{
          fill: '#FFF',
          transform: 'scaleX(-1)',
          margin: '0px 45px 0px 45px'
        }}
      width="41"
      height="41"
      viewBox="0 0 55 54">
      <path d="M27,0C12.1,0,0,12.1,0,27s12.1,27,27,27c14.9,0,27-12.1,27-27S41.9,0,27,0z M35,38H19c-0.6,0-1-0.4-1-1
    	s0.4-1,1-1h16c0.6,0,1,0.4,1,1S35.6,38,35,38z M35.4,25.9l-16,8C19.3,34,19.2,34,19,34c-0.4,0-0.7-0.2-0.9-0.6
    	c-0.2-0.5,0-1.1,0.4-1.3L32.8,25l-14.2-7.1c-0.5-0.2-0.7-0.8-0.4-1.3c0.2-0.5,0.8-0.7,1.3-0.4l16,8c0.3,0.2,0.6,0.5,0.6,0.9
    	S35.8,25.7,35.4,25.9z"/>
    </svg>
    )
  }
}

export default BackIcon
