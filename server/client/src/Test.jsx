import React, { Component } from "react";

class Test extends Component {
  render(){
    console.log(this.props.location.pathname)
    return (
      <div>
        {console.log(this.props.location.pathname)}
        Hey
      </div>
    )
  }
}

export default Test;
