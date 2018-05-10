import React, { Component } from 'react';
import './index.css';
import Footerbar from "../Footerbar"
import Header from "../Header"
class App extends Component {
  render() {
    return (
      <div >
      	<Header/>
      	<Footerbar/>
        {this.props.children}
      </div>
    );
  }
}

export default App;
