import React, { Component } from "react";
import { withRouter } from 'react-router'
import { Link } from "react-router-dom";


const assembleLink = (givenIndex, array) => {
    let linkSrc = "";
    for (let i = 0; i <= givenIndex; i ++) {
        linkSrc += "/" + array[i];
    }

    return linkSrc;
}

const renderLinks = (location) => {
    try {
        var links = location.pathname.slice(1).split('/');
        links = links.map((link, i, arr)=> {
            return {
                text : link[0].toUpperCase() + link.slice(1),
                href : assembleLink(i, arr),
            } 
        });
        
    } catch(err) {
        var links = [];
    }

  
    return (
        <span>
        {
            links.map((linkObj, i) =>
           <Link className='navLink' to={linkObj.href} key={i}>{linkObj.text} </Link> )
           
        }
        </span>

    );

}


class Nav extends Component {
 
    render() {
        console.log('props', this.props)
        return (

            <div className="navBar">
                
                <Link to="/">
                    <img height="65" src="https://static1.squarespace.com/static/ta/522a22cbe4b04681b0bff826/3066/assets/legacy-img/brandguide/logo/hack-reactor-logo-gray-blue.png" /> 
                </Link>
                {
                    renderLinks(this.props.location)

                }
                <div className="navText">Student Insights</div>    

               
            </div>
        );
    }
}

export default withRouter(Nav);
