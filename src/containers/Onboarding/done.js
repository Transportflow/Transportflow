import React, {Component} from 'react';
import DarkmodeToggle from "../../components/Buttons/DarkmodeToggle";
import RedirectingButton from "../../components/Buttons/RedirectingButton";
import ImpressPrivacy from "../../components/Buttons/ImpressPrivacy";

class Done extends Component {
    render() {
        return (
            <div className="pt-20 sm:pt-32 md:pt-40 lg:pt-56 bg-gray-400 dark\:bg-gray-800 min-h-screen text-center trans">
                <DarkmodeToggle hidden={true}/>
                <h1 className="font-semibold font-inter text-2xl text-black dark\:text-gray-100">
                    <span role="img" aria-label="parrot">🦜</span> Transportflow <span className="align-text-top rounded py-1 px-2 bg-red-600 text-gray-200 text-sm uppercase font-bold tracking-tight">beta</span>
                </h1>
                <p className="font-inter text-gray-700 dark\:text-gray-300 mb-6 mt-4 font-medium">
                    Sie haben die Einrichtung erfolgreich<br/> abgeschlossen! <span role="img" aria-label="party" className="font-sans">🎉</span><br/>
                </p>
                <RedirectingButton text="Los geht's!" to="/" />
                <ImpressPrivacy centered={true}/>
            </div>
        );
    }
}

export default Done;