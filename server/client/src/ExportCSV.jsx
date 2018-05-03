import React, { Component } from "react";
import BASE_URL from "./baseUrl";

class ExportCSV extends Component {
  render(){
    return (
      <div className="exportLink">
        <a href={`${BASE_URL}/api/csvlist?c=${this.props.class}`} download={this.props.class}>Download</a>
      </div>
    )
  }
}

export default ExportCSV;
