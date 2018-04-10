import React, { Component } from "react";
import axios from "axios"

class ExportCSV extends Component {
  constructor(props) {
    super(props);
  }
  render(){
    return (
      <div className="exportLink">
        <a href={'http://35.173.188.239:3000/api/csvlist?c='+this.props.class} download={this.props.class}>Download</a>
      </div>
    )
  }
}

export default ExportCSV;
