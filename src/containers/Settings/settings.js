import React, {Component} from 'react';
import * as serviceWorker from "../../serviceWorker";
import DarkmodeToggle from "../../components/DarkmodeToggle";
import BackButton from "../../components/BackButton";
import NetworkSwitch from "../../components/NetworkSwitch";
import {faCheck} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Checkmark from "../../components/Checkmark";

class Settings extends Component {
    unregisterWorker() {
        serviceWorker.unregister();
    }

    render() {
        return (
            <div className="p-6 pt-12 sm:p-20 lg:pl-56 bg-gray-400 dark\:bg-gray-800 min-h-screen trans">
                <div className="w-full sm:w-auto sm:max-w-sm">
                    <BackButton to="/" large={true}/>
                    <h1 className="dark\:text-gray-200 font-bold font-inter text-2xl mt-5 mb-1"><span className="font-sans">⚙</span> Einstellungen</h1>
                    <h2 className="dark\:text-gray-200 font-semibold font-inter text-xl">Region</h2>
                    <p className="font-inter text-gray-700 dark\:text-gray-400 mb-2">Wählen Sie Ihren Verkehrsverbund
                        aus.</p>
                    <div className="flex w-full justify-start"><NetworkSwitch onChange={() => {}}/></div>
                    <Checkmark
                        val={localStorage.getItem("showNetworkSwitch") !== null ? localStorage.getItem("showNetworkSwitch") : false}
                        description="Jedes Mal fragen?"
                        className="mt-3"
                        itemName="showNetworkSwitch"
                    />


                    <hr className="border-2 border-gray-500 rounded-lg dark\:border-gray-700 my-6"/>

                    <h2 className="dark\:text-gray-200 font-semibold font-inter text-xl">Erscheinungsbild</h2>
                    <p className="font-inter text-gray-700 dark\:text-gray-400 mb-2">Wählen Sie Ihr präferiertes
                        Design.</p>
                    <DarkmodeToggle button={true}/>
                </div>
            </div>
        );
    }
}

export default Settings;