import React from 'react';
import {useLocation} from "react-router-dom";
import {useAckee} from "use-ackee";

function Ackee() {
    const loc = useLocation();

    // have to implement proper proxy
    useAckee(loc.pathname, {
        server: 'https://non-cors.herokuapp.com/http://adwira.wien:3000',
        domainId: 'e378db20-177b-4351-ac54-8a4533567513'
    }, {
        ignoreLocalhost: true,
        detailed: localStorage.getItem("detailed_data") === "true"
    });

    return (
        <></>
    );
}

export default Ackee;