import React, {Component} from "react";
import {Link} from "react-router-dom";

class ImpressPrivacy extends Component {
    render() {
        return (
            <div className={"text-left absolute bottom-0 mb-4 flex w-full " + (this.props.centered ? "justify-center" : this.props.inline ? "w-auto mb-0 flex-none relative" : "") + " " + this.props.className}>
                <Link to={"/impressprivacy"}><button className="italic focus:outline-none dark\:text-gray-400 text-gray-700 mt-5">impressum & datenschutz</button></Link>
            </div>
        );
    }
}

export default ImpressPrivacy;