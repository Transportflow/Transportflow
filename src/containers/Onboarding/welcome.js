import React, {Component} from 'react';
import ImpressPrivacy from "../../components/ImpressPrivacy";
import RedirectingButton from "../../components/RedirectingButton";
import DarkmodeToggle from "../../components/DarkmodeToggle";

class Welcome extends Component {
    render() {
        return (
            <div className="pt-20 sm:pt-32 md:pt-40 lg:pt-56 bg-gray-400 dark\:bg-gray-800 min-h-screen text-center trans">
                <DarkmodeToggle hidden={true} onboarding={true}/>
                <h1 className="font-semibold font-inter text-2xl text-black dark\:text-gray-100">
                    🦜 Transportflow <span className="align-text-top rounded py-1 px-2 bg-red-600 text-gray-200 text-sm uppercase font-bold tracking-tight">beta</span>
                </h1>
                <p className="font-inter text-gray-700 dark\:text-gray-400 mb-2 mt-4">
                    Willkommen bei Transportflow,<br/>
                    <span className="font-semibold mt-2 text-gray-800 dark\:text-gray-200">dem Abfahrtsmonitor und Routenplaner.</span>
                </p>
                <div className="flex justify-center h-8 mb-8">
                    <img className="w-8 mr-1" alt="" src="https://upload.wikimedia.org/wikipedia/commons/a/a3/U-Bahn.svg"/>
                    <img className="w-8 mr-1" alt="" src="https://www.dvb.de/assets/img/trans-icon/transport-tram.svg"/>
                    <img className="w-8 mr-1" alt="" src="https://www.dvb.de/assets/img/trans-icon/transport-bus.svg"/>
                    <img className="w-8 mr-1" alt="" src="https://www.dvb.de/assets/img/trans-icon/transport-metropolitan.svg"/>
                    <img className="w-8 mr-1" alt="" src="https://www.dvb.de/assets/img/trans-icon/transport-train.svg"/>
                    <img className="w-8 mr-1" alt="" src="https://www.dvb.de/assets/img/trans-icon/transport-lift.svg"/>
                    <img className="w-8 mr-1" alt="" src="https://www.dvb.de/assets/img/trans-icon/transport-ferry.svg"/>
                    <img className="w-8 mr-1" alt="" src="https://www.dvb.de/assets/img/trans-icon/transport-alita.svg"/>
                </div>
                <RedirectingButton text="Einrichten" to="/onboarding/theme" />
                <ImpressPrivacy centered={true}/>
            </div>
        );
    }
}

export default Welcome;