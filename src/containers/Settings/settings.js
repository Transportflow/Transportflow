import React, {Component} from 'react';
import * as serviceWorker from "../../serviceWorker";
import DarkmodeToggle from "../../components/DarkmodeToggle";
import BackButton from "../../components/BackButton";

class Settings extends Component {
    unregisterWorker() {
        serviceWorker.unregister();
    }

    render() {
        return (
            <div className="p-6 pt-12 sm:p-20 lg:pl-56 bg-gray-400 dark\:bg-gray-800 min-h-screen trans">
                <div className="w-full sm:w-auto sm:max-w-sm">
                    <BackButton to="/" large={true}/>
                    <h1 className="dark\:text-gray-200 font-bold font-inter text-2xl mt-5 mb-1">🔨 Einstellungen</h1>
                    <h2 className="dark\:text-gray-200 font-semibold font-inter text-xl">Region</h2>
                    <p className="font-inter text-gray-700 dark\:text-gray-400 mb-2">Wählen Sie Ihren Verkehrsverbund
                        aus.</p>
                    <div className="flex w-full justify-start">
                        <button className="rounded-l-lg w-24 bg-gray-300 dark\:bg-gray-700 dark\:text-white focus:outline-none"><div className="m-1 py-1 rounded bg-gray-100 dark\:bg-gray-600">VVO</div></button>
                        <button className="rounded-r-lg w-24 bg-gray-300 dark\:bg-gray-700 dark\:text-white focus:outline-none"><div className="m-1 py-1 rounded">BVG</div></button>
                    </div>

                    <hr className="border-2 border-gray-500 rounded-lg dark\:border-gray-700 my-6"/>

                    <h2 className="dark\:text-gray-200 font-semibold font-inter text-xl">Erscheinungsbild</h2>
                    <p className="font-inter text-gray-700 dark\:text-gray-400 mb-2">Wählen Sie Ihr präferiertes Design.</p>
                    <DarkmodeToggle button={true}/>
                </div>
            </div>
        );
    }
}

export default Settings;