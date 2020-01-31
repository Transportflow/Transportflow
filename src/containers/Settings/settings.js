import React, {Component} from 'react';
import * as serviceWorker from "../../serviceWorker";
import DarkmodeToggle from "../../components/Buttons/DarkmodeToggle";
import BackButton from "../../components/Buttons/BackButton";
import NetworkSwitch from "../../components/Buttons/NetworkSwitch";
import Checkmark from "../../components/Buttons/Checkmark";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDumpsterFire, faPowerOff} from "@fortawesome/free-solid-svg-icons";
import ImpressPrivacy from "../../components/Buttons/ImpressPrivacy";
import Seperator from "../../components/Segments/Seperator";
import SettingsCategory from "../../components/Segments/SettingsCategory";
import Twemoji from 'react-twemoji';

class Settings extends Component {
    unregisterWorker() {
        serviceWorker.unregister();
        window.location.reload(true);
    }

    clearLocalStorage() {
        localStorage.clear();
        window.location.reload(true);
    }

    render() {
        return (
            <div className="p-6 pt-12 sm:p-20 lg:pl-56 bg-gray-400 dark\:bg-gray-800 min-h-screen trans">
                <div className="w-full sm:w-auto sm:max-w-sm">
                    <BackButton to="/" large={true}/>
                    <h1 className="dark\:text-gray-200 font-bold font-inter text-2xl mt-5 mb-1 flex"><Twemoji options={{className: "h-8 mr-2"}}>⚙</Twemoji> Einstellungen</h1>

                    <SettingsCategory title="Region" description="Wählen Sie Ihren Verkehrsverbund aus."/>
                    <div className="flex w-full justify-start"><NetworkSwitch onChange={() => {}}/></div>
                    <Checkmark
                        val={localStorage.getItem("showNetworkSwitch") !== null ? localStorage.getItem("showNetworkSwitch") : false}
                        description="Jedes Mal fragen?"
                        className="mt-3"
                        itemName="showNetworkSwitch"
                    />

                    <Seperator/>

                    <SettingsCategory title="Erscheinungsbild" description="Wählen Sie Ihr präferiertes Design."/>
                    <DarkmodeToggle button={true}/>

                    <Seperator/>

                    <SettingsCategory title="Version" description={<>Leeren Sie den Cache dieser Website.<br/>Dies aktualisiert Transportflow ggf. auf die neueste Version.</>}/>
                    <button
                        onClick={this.unregisterWorker}
                        className="text-gray-900 bg-gray-300 dark\:bg-gray-700 dark\:text-gray-300 dark-hover\:bg-gray-600 sm:hover:bg-gray-300 px-5 py-3 rounded-lg text-base sm:hover:shadow-md focus:outline-none z-50 relative trans-fast">
                        <span className="mr-2"><FontAwesomeIcon icon={faDumpsterFire}/></span>Cache leeren
                    </button>

                    <Seperator/>

                    <SettingsCategory title="Datenerhebung" description={<>Wir erheben sog. "personalisierte Daten"<br/>
                        <span className="font-semibold">nur mit Ihrer Zustimmung</span>.<br/>
                        Darunter fallen u.a. Betriebssystem,
                        Browserversion und Gerätename.
                        Genaueres kann unserer Datenschutzerklärung
                        entnommen werden.</>}/>
                    <Checkmark className="mt-4" val={localStorage.getItem("detailed_data") !== null ? localStorage.getItem("detailed_data") : false} description="Personalisierte Daten senden" itemName="detailed_data"/>

                    <Seperator/>

                    <SettingsCategory title="Zurücksetzen" description={<>Setzen Sie alle Einstellungen zurück.<br/>Sie durchlaufen den Einrichtungsprozess anschließend erneut.</>}/>
                    <button
                        onClick={this.clearLocalStorage}
                        className="mb-20 text-gray-900 bg-gray-300 dark\:bg-gray-700 dark\:text-gray-300 dark-hover\:bg-gray-600 sm:hover:bg-gray-300 px-5 py-3 rounded-lg text-base sm:hover:shadow-md focus:outline-none z-50 relative trans-fast">
                        <span className="mr-2"><FontAwesomeIcon icon={faPowerOff}/></span>Zurücksetzen
                    </button>
                    <ImpressPrivacy inline={true} className="mt-10 mb-4"/>
                </div>
            </div>
        );
    }
}

export default Settings;