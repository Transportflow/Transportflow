import React, {Component} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck} from "@fortawesome/free-solid-svg-icons";

/*
Props:
var - Initial value
className - className additions
description - description
itemName - key in localstorage
 */

class Checkmark extends Component {
    constructor(props) {
        super();
        this.state = {
            val: props.val
        }
    }

    componentDidMount() {
        localStorage.setItem(this.props.itemName, this.props.val)
    }

    toggleVal(event) {
        if (localStorage.getItem(this.props.itemName) === "false") {
            this.setState({val: "true"});
            localStorage.setItem(this.props.itemName, "true");
        } else if (localStorage.getItem(this.props.itemName) === "true") {
            this.setState({val: "false"});
            localStorage.setItem(this.props.itemName, "false");
        }

    }

    render() {
        return (
            <button onClick={this.toggleVal.bind(this)} className={"flex text-gray-700 dark\\:text-gray-400 focus:outline-none "+this.props.className}>
                <div className="w-6 h-6 rounded-full bg-gray-300 dark\:bg-gray-700 mr-2">
                    <FontAwesomeIcon className={"trans-faster " + (this.state.val === "true" ? "opacity-100": "opacity-0")} icon={faCheck}/>
                </div>{" "}
                {this.props.description}
            </button>
        );
    }
}

export default Checkmark;