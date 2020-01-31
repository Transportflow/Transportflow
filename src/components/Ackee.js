import React from 'react';
import {useLocation} from "react-router-dom";
import {useAckee} from "use-ackee";

function Ackee() {
    const loc = useLocation();

    useAckee(loc.pathname, {
        server: process.env.REACT_APP_ACKEE_URL,
        domainId: process.env.REACT_APP_ACKEE_ID
    }, {
        ignoreLocalhost: true,
        detailed: localStorage.getItem("detailed_data") === "true"
    });

    return (
        <></>
    );
}

export default Ackee;