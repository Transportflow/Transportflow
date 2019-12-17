import React from "react";
import {Link} from "react-router-dom";

export default function ImpressPrivacy() {
    return (<div className="text-left">
        <Link to={"/impressprivacy"}><button className="italic focus:outline-none dark\:text-gray-400 text-gray-700 mt-5">impressum & datenschutz</button></Link>
    </div>)
}