import React, { Component } from "react";
import axios from "axios"

class StudentNotes extends Component {
  //this.props.student
  constructor(props){
    super(props);
    this.state = {
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount(){
    // this.setState({...this.props})
    //
    // console.log("hey ",this)
    // console.log("hello ",this.props)
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.props.student.Twittler = value;
    this.setState({
      [name]: value
    });
    axios.post("http://35.173.188.239:3000/api/updateone", {
        repo: "Twittler",
        score: value,
        github: this.props.student.GithubName
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  flip(n){
    console.log(n)
    if(n){
      return "true"
    }
    return false
  }
  render(){
    console.log("in render",this.state, this.props)
    return (
      <div className="notesWrapper">
        <form>
          <label>
            Twittler Complete :
            <input
            name="Twittler"
            type="checkbox"
            checked={!!this.props.student.Twittler}
            onChange={this.handleInputChange} />
          </label>
        </form>
      </div>
    )
  }
}

export default StudentNotes;
