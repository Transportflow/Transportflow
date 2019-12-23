import React, {Component} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronRight} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";

class RedirectingButton extends Component {
    render() {
        return (
            <Link to={this.props.to}>
                <button
                    className={(this.props.disabled ? "hidden" : "") + " text-gray-900 bg-gray-300 dark\\:bg-gray-700 dark\\:text-gray-300 dark-hover\\:bg-gray-600 sm:hover:bg-gray-300 px-5 py-3 rounded-lg text-base sm:hover:shadow-md focus:outline-none z-50 relative trans-fast " + this.props.className || ""}>
                    <span className="mr-2">{this.props.text || "Weiter"}</span><FontAwesomeIcon icon={faChevronRight} />
                </button>
            </Link>
        );
    }
}

export default RedirectingButton;