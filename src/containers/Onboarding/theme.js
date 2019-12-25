import React, {Component} from 'react';
import ImpressPrivacy from "../../components/Buttons/ImpressPrivacy";
import DarkmodeToggle from "../../components/Buttons/DarkmodeToggle";
import RedirectingButton from "../../components/Buttons/RedirectingButton";

class Theme extends Component {
    render() {
        return (
            <div className="pt-20 sm:pt-32 md:pt-40 lg:pt-56 bg-gray-400 dark\:bg-gray-800 min-h-screen text-center trans">
                <h1 className="font-semibold font-inter text-2xl text-black dark\:text-gray-100">
                    <span className="font-sans">🕯</span> Erscheinungsbild
                </h1>
                <p className="font-inter text-gray-700 dark\:text-gray-400 mb-4 mt-4">
                    Wählen Sie Ihr präferiertes Erscheinungsbild.<br/>
                    Sie können es später ändern.
                </p>
                <div className="flex justify-center mb-6">
                    <DarkmodeToggle button={true} onboarding={true}/>
                </div>
                <RedirectingButton to="/onboarding/network" />
                <div className="absolute bottom-0 mb-2 flex justify-center w-full">
                    <ImpressPrivacy centered={true}/>
                </div>
            </div>
        );
    }
}

export default Theme;