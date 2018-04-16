import React from 'react';
import PropTypes from 'prop-types';

class Modal extends React.Component {
  render() {
    // Render nothing if the "show" prop is false
    if(!this.props.show) {
      return null;
    } else {
      console.log('lol whhherhwaheuieh')
    }


    return (
      <div className="">
        <div >
          <h1> Are you sure you want to delete {this.props.toDelete} ?</h1>
          <h1> This could be irreversable </h1>
          <button onClick={this.props.sure}>Yes</button>
          <button onClick={this.props.onClose}>No</button>
        </div>
      </div>
    );
  }
}



export default Modal;
