import React, {Component} from 'react';
import ImpressPrivacy from "../../components/Buttons/ImpressPrivacy";
import DarkmodeToggle from "../../components/Buttons/DarkmodeToggle";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronRight} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";

class Privacy extends Component {
    accept() {
        localStorage.setItem("privacy", "true");
    }

    render() {
        return (
            <div
                className="pt-20 sm:pt-32 md:pt-40 lg:pt-56 bg-gray-400 dark\:bg-gray-800 min-h-screen text-center trans">
                <DarkmodeToggle hidden={true} onboarding={true}/>
                <h1 className="font-semibold font-inter text-2xl text-black dark\:text-gray-100">
                    <span className="font-sans" role="img" aria-labelledby="">🎈</span> Datenschutz
                </h1>
                <p className="font-inter text-gray-700 dark\:text-gray-400 mb-4 mt-4">
                    Um Transportflow zu nutzen<br/>
                    müssen Sie unserer Datenschutzerklärung zustimmen.<br/>
                    Mit dem Klicken auf die "Akzeptieren"-Schaltfläche<br/>
                    bestätigen Sie, die Datenschutzerklärung gelesen<br/>
                    zu haben und ihr zuzustimmen.
                </p>
                <Link to="/onboarding/done">
                    <button
                        onClick={this.accept()}
                        className="text-gray-900 bg-gray-300 dark\:bg-gray-700 dark\:text-gray-300 dark-hover\:bg-gray-600 sm:hover:bg-gray-300 px-5 py-3 rounded-lg text-base sm:hover:shadow-md focus:outline-none z-50 relative trans-fast">
                        <span className="mr-2">{"Akzeptieren"}</span><FontAwesomeIcon icon={faChevronRight} />
                    </button>
                </Link>
                <ImpressPrivacy centered={true}/>
            </div>
        );
    }
}

export default Privacy;
