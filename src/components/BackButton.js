import React, {Component} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";

class BackButton extends Component {
    render() {
        return (
            <div>
                <Link to={this.props.to}>
                    <button
                        className="text-gray-900 bg-gray-300 dark\:bg-gray-700 dark\:text-gray-300 dark-hover\:bg-gray-600 sm:hover:bg-gray-300 px-5 py-3 rounded-lg text-base mr-3 sm:hover:shadow-md focus:outline-none z-50 relative trans-fast">
                        <FontAwesomeIcon icon={faChevronLeft} /><span className={this.props.large ? "ml-2":""}>{this.props.large ? " Zurück" : ""}</span>
                    </button>
                </Link>
            </div>
        );
    }
}

export default BackButton;