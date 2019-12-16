import React from "react";
import {Link} from "react-router-dom";
import "../../css/tailwind.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faArrowRight, faChevronRight
} from "@fortawesome/free-solid-svg-icons";
import ImportantLine from "../../components/ImportantLine";

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
                <ImportantLine />
                <h1 className="dark\:text-gray-200 font-bold font-inter text-2xl text-black">Transportflow</h1>
                <p className="font-inter mb-5 text-gray-700">🚂🚟🚍🚊🚈🚀</p>
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

                    <Link to="/planner">

                        <div
                            className="sm:hover:shadow-md sm:hover:bg-gray-300 trans w-full bg-gray-300 dark\:text-gray-200 dark\:bg-gray-700 dark-hover\:bg-gray-600 font-medium font-inter rounded-lg overflow-hidden p-2 pl-3 flex flex-shrink justify-between">
                            <div className="w-3/4">
                                <p className="font-semibold text-xl flex items-center mt-1">
                                    <ion-icon name={"ios-navigate"} style={{fontSize: "24px"}}/>
                                    <span className="truncate ml-1">Planner</span>
                                </p>
                                <p className="font-normal truncate text-gray-700 dark\:text-gray-400">
                                    Where do you want to go?
                                </p>
                            </div>

                            <div className="w-1/4 sm:w-1/5 md:w-1/6 p-3 object-right trans">
                                <p className="font-semibold text-right text-2xl">
                                    <FontAwesomeIcon style={{height: "21px"}} icon={faChevronRight}/>
                                </p>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        );
    }
}

export default App;
