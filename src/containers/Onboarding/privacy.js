import React, {Component} from 'react';
import ImpressPrivacy from "../../components/Buttons/ImpressPrivacy";
import RedirectingButton from "../../components/Buttons/RedirectingButton";
import DarkmodeToggle from "../../components/Buttons/DarkmodeToggle";
import Checkmark from "../../components/Buttons/Checkmark";

class Privacy extends Component {

    render() {
        return (
            <div
                className="pt-20 sm:pt-32 md:pt-40 lg:pt-56 bg-gray-400 dark\:bg-gray-800 min-h-screen text-center trans">
                <DarkmodeToggle hidden={true} onboarding={true}/>
                <h1 className="font-semibold font-inter text-2xl text-black dark\:text-gray-100">
                    <span className="font-sans" role="img" aria-labelledby="">🎈</span> Datenerhebung
                </h1>
                <p className="font-inter text-gray-700 dark\:text-gray-400 mb-4 mt-4">
                    Wir erheben personenbezogene Daten<br/>
                    <span className="font-medium">nur mit Ihrer Zustimmung</span>.<br/>
                    Darunter fallen u.a. Betriebssystem,<br/>
                    Browserversion und Gerätename.<br/>
                    Genaueres kann unserer Datenschutzerklärung<br/>
                    entnommen werden.
                </p>
                <Checkmark className="mx-auto mt-2 mb-6" val="true" description="Personalisierte Daten senden" itemName="detailed_data"/>
                <RedirectingButton to="/onboarding/done"/>
                <ImpressPrivacy centered={true}/>
            </div>
        );
    }
}

export default Privacy;
