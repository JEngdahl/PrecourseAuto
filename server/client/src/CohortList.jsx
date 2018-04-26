import React, { Component } from "react";
import axios from 'axios';
import {
  NavLink,
  HashRouter,
  Route,
  Redirect
} from "react-router-dom";
import ExportCSV from "./ExportCSV"
import Modal from "./Modal"
import BASE_URL from "./baseUrl";

class ClassList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cohorts: [],
      redirect : false,
      warningIsOpen: false
    };
  }

  componentDidMount() {
    var p = this.props.location.pathname
    axios.get(`${BASE_URL}/api/cohorts?c=${p.slice(1,p.length)}`)
    .then(res => {
      if (res.data.length < 1 ) {
        this.setState({redirect : true});
      }
      var cohorts = res.data
      this.setState({cohorts})
    }).catch(err => {
      this.setState({redirect : true});
    })  
  }

  deleteClass() {
    var p = this.props.location.pathname
    axios.delete(`${BASE_URL}/api/cohorts?c=${p.slice(1,p.length)}/${this.state.toDelete}` )
    .then(res => {
      console.log('deleted')
      window.location.reload(); 
    }).catch(err=> {
      console.log('error deleting class', err)
    })
  }

  openModal(e){
    this.setState({warningIsOpen: true, toDelete: e});
  
  }
  closeModal(){
    this.setState({warningIsOpen: false, toDelete: ""});
  }

  render(){
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to='/404'/>;
    }

    return (
      <div >
         <Modal show={this.state.warningIsOpen}
          onClose={()=>this.closeModal()}
          toDelete={this.state.toDelete}
          sure={()=>this.deleteClass()} >
        </Modal>
       
        <ul className="cohortList">
          {this.state.cohorts.map(e =>
              <li className="cohort">
                <div className="deleteCohort" onClick={() => this.openModal(e)}>X</div>
                <NavLink to={this.props.location.pathname+"/"+e}>
                  {e}
                </NavLink>
                <ExportCSV class={e} />
              </li>
            )}
        </ul>
       
      </div>
    )
  }
}

export default ClassList;
