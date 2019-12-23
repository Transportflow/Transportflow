import React from "react";
import "./NotFound.css";
import "../../css/tailwind.css"
import DarkmodeToggle from "../../components/DarkmodeToggle";
import ImpressPrivacy from "../../components/ImpressPrivacy";
import BackButton from "../../components/BackButton";

const Notfound = () => (
    <div className="not-found dark\:bg-gray-800 dark\:text-gray-200 trans">
        <h1 className="text-3xl font-semibold mb-6">Not found</h1>
        <BackButton large={true}/>
        <span className="text-base flex italic whitespace-no-wrap"><span className="flex"><span className="mt-5"><DarkmodeToggle/></span><span className="mt-5 italic mx-2"> | </span><ImpressPrivacy inline={true}/></span></span>
    </div>
);
export default Notfound;
