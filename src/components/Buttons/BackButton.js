import React, {Component} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft} from "@fortawesome/free-solid-svg-icons";

class BackButton extends Component {
    render() {
        return (
            <button
                onClick={() => window.history.back()}
                className={"text-gray-900 bg-gray-300 dark\\:bg-gray-700 dark\\:text-gray-300 dark-hover\\:bg-gray-600 sm:hover:bg-gray-300 px-5 py-3 rounded-lg text-base sm:hover:shadow-md focus:outline-none z-50 relative trans-faster " + this.props.className}>
                <FontAwesomeIcon icon={faChevronLeft}/><span
                className={this.props.large ? "ml-2" : ""}>{this.props.large ? " Zurück" : ""}</span>
            </button>
        );
    }
}

export default BackButton;