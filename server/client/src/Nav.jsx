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

const renderLinks = (path) => {
    var links = path.slice(1).split('/');
    links = links.map((link, i, arr)=> {
        return {
            text : link,
            href : assembleLink(i, arr),
        } 
    });
  
    return (
        <span>
        {
            links.map((linkObj, i) =>
           <Link to={linkObj.href} key={i}>{linkObj.text} </Link> )
        }
        </span>

    );

}


class Nav extends Component {
 
    render() {
        console.log('props', this.props)
        return (

            <div className="navBar">
                
                <img height="65" src="https://static1.squarespace.com/static/ta/522a22cbe4b04681b0bff826/3066/assets/legacy-img/brandguide/logo/hack-reactor-logo-gray-blue.png" />
                {
                    renderLinks(this.props.location.pathname)

                }
                <div className="navText">Student Insights</div>
            </div>
        );
    }
}

export default withRouter(Nav);
