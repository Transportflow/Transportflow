import React from "react";
import {Link} from "react-router-dom";
import "../../css/tailwind.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faChevronRight
} from "@fortawesome/free-solid-svg-icons";
import DarkmodeToggle from "../../components/DarkmodeToggle";
import ImpressPrivacy from "../../components/ImpressPrivacy";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="p-6 pt-12 sm:p-20 lg:pl-56 bg-gray-400 dark\:bg-gray-800 min-h-screen trans">
                <div className="flex justify-between mb-5 w-full sm:w-auto sm:max-w-xs">
                    <div>
                        <h1 className="dark\:text-gray-200 font-bold font-inter text-2xl text-black"><span role="img" aria-label="parrot">🦜</span> Transportflow <span className="align-text-top rounded py-1 px-2 bg-red-600 text-gray-200 text-sm uppercase font-bold tracking-tight">beta</span></h1>
                        <p className="font-inter text-gray-700 dark\:text-gray-400">Kein Auto, kein Problem. <span role="img" aria-label="rocket">🚀</span></p>
                    </div>
                    <div className="my-auto">
                        <DarkmodeToggle large={true}/>
                    </div>
                </div>
                <div className="w-full sm:w-auto sm:max-w-xs mb-6">
                    <div className="mb-2 sm:mb-3">
                        <Link to="/monitor">
                            <div
                                className="sm:hover:shadow-md sm:hover:bg-gray-300 trans w-full bg-gray-300 font-medium dark\:text-gray-200 dark\:bg-gray-700 dark-hover\:bg-gray-600 font-inter rounded-lg overflow-hidden p-2 pl-3 flex flex-shrink justify-between">
                                <div className="w-3/4 flex">
                                    <div>
                                        <p className="font-semibold text-xl flex items-center mt-1">
                                            <ion-icon name={"ios-bus"} style={{fontSize: "24px"}}/>
                                            <span className="truncate ml-1">Monitor</span>
                                        </p>
                                        <p className="font-normal truncate text-gray-700 dark\:text-gray-400">
                                            Echtzeit Fahrplanauskunft
                                        </p>
                                    </div>
                                </div>

                                <div className="w-1/4 sm:w-1/5 md:w-1/6 p-3 object-right trans">
                                    <p className="font-semibold text-right text-2xl">
                                        <FontAwesomeIcon style={{height: "21px"}} icon={faChevronRight}/>
                                    </p>
                                </div>
                            </div>
                        </Link>
                    </div>

                    {/*
                        <Link to="/planner">

                            <div
                                className="sm:hover:shadow-md sm:hover:bg-gray-300 trans w-full bg-gray-300 dark\:text-gray-200 dark\:bg-gray-700 dark-hover\:bg-gray-600 font-medium font-inter rounded-lg overflow-hidden p-2 pl-3 flex flex-shrink justify-between">
                                <div className="w-3/4">
                                    <p className="font-semibold text-xl flex items-center mt-1">
                                        <ion-icon name={"ios-navigate"} style={{fontSize: "24px"}}/>
                                        <span className="truncate ml-1">Planer</span>
                                    </p>
                                    <p className="font-normal truncate text-gray-700 dark\:text-gray-400">
                                        Routenplaner
                                    </p>
                                </div>

                                <div className="w-1/4 sm:w-1/5 md:w-1/6 p-3 object-right trans">
                                    <p className="font-semibold text-right text-2xl">
                                        <FontAwesomeIcon style={{height: "21px"}} icon={faChevronRight}/>
                                    </p>
                                </div>
                            </div>
                        </Link>
                    */}

                    <Link to="/settings">
                        <div
                            className="sm:hover:shadow-md sm:hover:bg-gray-300 trans w-full bg-gray-300 dark\:text-gray-200 dark\:bg-gray-700 dark-hover\:bg-gray-600 font-medium font-inter rounded-lg overflow-hidden p-2 pl-3 flex flex-shrink justify-between">
                            <p className="w-3/4 font-semibold text-xl flex items-center">
                                <ion-icon name={"ios-cog"} style={{fontSize: "24px"}}/>
                                <span className="truncate ml-1">Einstellungen</span>
                            </p>

                            <div className="w-1/4 sm:w-1/5 md:w-1/6 p-3 py-0 object-right trans">
                                <p className="font-semibold text-right text-2xl">
                                    <FontAwesomeIcon style={{height: "21px"}} icon={faChevronRight}/>
                                </p>
                            </div>
                        </div>
                    </Link>

                    <ImpressPrivacy/>
                </div>
            </div>
        );
    }
}

export default App;
