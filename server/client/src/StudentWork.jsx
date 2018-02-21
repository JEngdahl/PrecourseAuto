import React, { Component } from "react";

class StudentWork extends Component {
  openWork(student){
    console.log("clicked")
    window.open(`http://localhost:9000/${student.Class}/${student.GithubName}/javascript-koans/KoansRunner.html`)
    window.open(`http://localhost:9000/${student.Class}/${student.GithubName}/testbuilder/index.html`)
    window.open(`http://localhost:9000/${student.Class}/${student.GithubName}/recursion/SpecRunner.html`)
    window.open(`http://localhost:9000/${student.Class}/${student.GithubName}/underbar/SpecRunner.html`)
    window.open(`http://localhost:9000/${student.Class}/${student.GithubName}/twittler/index.html`)
  }

  render(){
    return (
      <div className="workContainer">
        <button onClick={() => {this.openWork(this.props.student)}}>OpenRepos</button>
      </div>
    )
  }

}

export default StudentWork;
