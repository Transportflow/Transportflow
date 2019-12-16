import React from "react";
import {Link} from "react-router-dom";

export default function ImpressPrivacy(history) {
    return (<Link to={"/impressprivacy"}><button className="italic focus:outline-none">impressum & datenschutz</button></Link>)
}