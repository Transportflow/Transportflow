import React, {Component} from "react";
import {Link} from "react-router-dom";

class Suggestion extends Component {
    constructor(props) {
        super(props);

        this.state = {
            network: localStorage.getItem("network") || "bvg"
        };
    }

    render() {
        return (
            <>
                <Link onClick={() => this.props.dispatch({type: "CLEAR_SUGGESTIONS"})}
                      to={"/monitor/" + this.state.network + "/stop/" + this.props.suggestion.id}>
                    <div
                        key={this.props.index}
                        className="rounded-lg mb-1 bg-gray-400 hover:bg-gray-300 dark\:bg-gray-800 dark-hover\:bg-gray-700 trans-fast"
                    >
                        <button
                            className="py-3 sm:py-2 px-3 trans w-full cursor-pointer outline-none focus:outline-none"
                        >
                            <span className="flex">
                                {this.props.suggestion.icons ? this.props.suggestion.icons.map((icon, index) =>
                                    <img key={index} className="h-5 mr-1  mt-1" src={icon} alt=""/>) : <></>
                                }
                            </span>
                            <span className="flex justify-start truncate">{this.props.suggestion.name}</span>
                        </button>
                    </div>
                </Link>
            </>
        );
    }
}

export default Suggestion;
