import React, {Component} from 'react';
import ImpressPrivacy from "../../components/Buttons/ImpressPrivacy";
import RedirectingButton from "../../components/Buttons/RedirectingButton";
import DarkmodeToggle from "../../components/Buttons/DarkmodeToggle";

class Welcome extends Component {
    render() {
        return (
            <div
                className="pt-20 sm:pt-32 md:pt-40 lg:pt-56 bg-gray-400 dark\:bg-gray-800 min-h-screen text-center trans">
                <DarkmodeToggle hidden={true} onboarding={true}/>
                <div className="m-auto flex" style={{width: "12.5rem"}}>
                    <img
                        draggable="false" alt="🦜" className="my-auto mr-1"
                        src="https://twemoji.maxcdn.com/v/12.1.4/72x72/1f99c.png"
                        style={{height: "24px"}}/>
                    <h1 className="font-semibold font-inter text-2xl text-black dark\:text-gray-100">
                        Transportflow
                    </h1>
                </div>
                <p className="font-inter text-gray-700 dark\:text-gray-400 mb-2 mt-4">
                    Willkommen bei Transportflow,<br/>
                    <span className="font-semibold mt-2 text-gray-800 dark\:text-gray-200">dem Abfahrtsmonitor und Routenplaner.</span>
                </p>
                <div className="flex justify-center h-8 mb-8">
                    <img className="w-8 mr-1" alt=""
                         src="https://upload.wikimedia.org/wikipedia/commons/a/a3/U-Bahn.svg"/>
                    <img className="w-8 mr-1" alt="" src="https://www.dvb.de/assets/img/trans-icon/transport-tram.svg"/>
                    <img className="w-8 mr-1" alt="" src="https://www.dvb.de/assets/img/trans-icon/transport-bus.svg"/>
                    <img className="w-8 mr-1" alt=""
                         src="https://www.dvb.de/assets/img/trans-icon/transport-metropolitan.svg"/>
                    <img className="w-8 mr-1" alt=""
                         src="https://www.dvb.de/assets/img/trans-icon/transport-train.svg"/>
                    <img className="w-8 mr-1" alt="" src="https://www.dvb.de/assets/img/trans-icon/transport-lift.svg"/>
                    <img className="w-8 mr-1" alt=""
                         src="https://www.dvb.de/assets/img/trans-icon/transport-ferry.svg"/>
                    <img className="w-8 mr-1" alt=""
                         src="https://upload.wikimedia.org/wikipedia/commons/a/a6/VBB_Bahn-Regionalverkehr.svg"/>
                    <img className="w-8" alt="" src="https://www.dvb.de/assets/img/trans-icon/transport-alita.svg"/>
                </div>
                <RedirectingButton text="Einrichten" to="/onboarding/theme"/>
                <ImpressPrivacy centered={true}/>
            </div>
        );
    }
}

export default Welcome;