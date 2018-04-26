import React, { Component } from "react";
import axios from "axios";
import BASE_URL from "./baseUrl";

class ExportCSV extends Component {
  constructor(props) {
    super(props);
  }
  render(){
    return (
      <div className="exportLink">
        <a href={`${BASE_URL}/api/csvlist?c=${this.props.class}`} download={this.props.class}>Download</a>
      </div>
    )
  }
}

export default ExportCSV;
