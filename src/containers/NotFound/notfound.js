import React from "react";
import "./NotFound.css";
import "../../css/tailwind.css"
import ImportantLine from "../../components/ImportantLine";

const Notfound = () => (
    <div className="not-found dark\:bg-gray-800 dark\:text-gray-200 trans">
        <h1 id="robot_face">{"<|°_°|>"}</h1>
        <h2>Not found</h2>
        <span className={"text-base"}><ImportantLine/></span>
    </div>
);
export default Notfound;
