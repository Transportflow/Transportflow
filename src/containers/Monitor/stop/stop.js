import React from "react";
import "../../../css/tailwind.css";
import {BarLoader} from "react-spinners";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faMapMarkerAlt,
    faTimes,
    faRedo
} from "@fortawesome/free-solid-svg-icons";

import {findDeparturesForDVB} from "./profiles/DVB";
import {findDeparturesForBVG} from "./profiles/BVG";

import DarkmodeToggle from "../../../components/Buttons/DarkmodeToggle";
import ImpressPrivacy from "../../../components/Buttons/ImpressPrivacy";
import BackButton from "../../../components/Buttons/BackButton";
import BVGDepartue from "../../../components/Departure/BVGDepartue";
import Departure from "../../../components/Departure";

class Stop extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            stopName: "",
            stop: [],


        };
    }

    toggleMode = event => {
        var modes = this.state.modes;
        var mode = event.target.id;

        event.target.classList.toggle("sm:bg-gray-300");
        event.target.classList.toggle("sm:bg-gray-400");
        event.target.classList.toggle("bg-gray-100");
        event.target.classList.toggle("bg-gray-300");
        event.target.classList.toggle("sm:dark\\:bg-gray-800");
        event.target.classList.toggle("sm:dark\\:bg-gray-700");
        event.target.classList.toggle("dark\\:bg-gray-700");
        event.target.classList.toggle("dark\\:bg-gray-500");
        if (modes.indexOf(mode) === -1) {
            modes.push(mode);
            this.setState({
                modes: modes
            });
        } else {
            modes.splice(modes.indexOf(mode), 1);
            this.setState({
                modes: modes
            });
        }
    };

    reloadDepartures = event => {
        event.preventDefault();
        this.findDeparturesForCurrentNetwork();
    };

    async findDeparturesForCurrentNetwork() {
        if (this.props.match.params.network === "dvb") {
            await findDeparturesForDVB();
        } else if (this.props.match.params.network === "bvg") {
            await findDeparturesForBVG();
        } else {
            throw new Error("Couldn't find Network")
        }
    }

    componentDidMount = async () => {
        await this.setState({
            stopName: decodeURI(
                this.props.match.params.id
                    .replace("%2F", "/")
            )
        });
    };

    render() {
        return (
            <div>
                <div
                    className="p-6 pt-12 sm:p-20 lg:pl-56"
                >
                    <div className="flex mb-3">
                        <BackButton large={true} className="mr-3"/>
                        <button
                            onClick={this.reloadDepartures}
                            className="text-gray-900 bg-gray-300 dark\:bg-gray-700 dark\:text-gray-300 dark-hover\:bg-gray-600 sm:hover:bg-gray-300 px-4 py-3 rounded-lg mr-3 sm:hover:shadow-lg focus:outline-none trans"
                        >
                            <FontAwesomeIcon icon={faRedo}/>
                        </button>
                        <DarkmodeToggle large={true}/>
                    </div>
                    <h1 className="trans font-semibold font-inter text-2xl text-black truncate text-black dark\:text-gray-200">
                        {this.state.loading ?
                            "Laden..." :
                            this.state.stop.name || "Fehler"}
                    </h1>
                    {this.state.err === "" && !this.state.loading ? (
                        <a
                            href={
                                "https://maps.apple.com/?dirflg=w&daddr=" +
                                this.state.latitude +
                                "," +
                                this.state.longitude
                            }
                            className="font-inter text-gray-700 dark\:text-gray-400"
                        >
                            <FontAwesomeIcon icon={faMapMarkerAlt}/>
                            {" " +
                            this.state.latitude.toString().substring(0, 10) +
                            ", " +
                            this.state.longitude.toString().substring(0, 10)}
                        </a>
                    ) : this.state.err === "" ? (
                        <div className="mb-6 mt-3 rounded-lg overflow-hidden max-w-xs dark\:text-gray-400">
                            <BarLoader
                                heightUnit={"px"}
                                height={4}
                                widthUnit={"px"}
                                width={330}
                                color={"#718096"}
                                loading={this.state.loading}
                            />
                        </div>
                    ) : (
                        <p className="p-1 pl-2 bg-red-600 text-gray-300 mt-4 mb-5 max-w-xs rounded-lg font-semibold">
                            {this.state.err}
                        </p>
                    )}

                    <div
                        className="flex mt-4 mb-3 overflow-scroll overflow-y-hidden scrolling-touch sm:overflow-visible custom-scrollbar w-auto rounded-lg">

                        {this.state.err === "" ? (
                            <>
                                {this.state.allModes.length > 1 ? (
                                    this.state.allModes.map((mode, index) => {
                                        return (
                                            <button
                                                className="whitespace-no-wrap text-gray-900 bg-gray-300 sm:bg-gray-400 dark\:bg-gray-700 sm:dark\:bg-gray-800 dark\:text-gray-200 px-4 py-3 rounded-lg mr-3 focus:outline-none trans"
                                                onClick={this.toggleMode}
                                                key={mode}
                                                id={mode}
                                            >
                                                {mode
                                                    .replace("suburban", "S-Bahn")
                                                    .replace("subway", "U-Bahn")
                                                    .replace("tram", "Straßenbahn")
                                                    .replace("bus", "Bus")
                                                    .replace("express", "Zug")
                                                    .replace("regional", "RE")
                                                    .replace("ferry", "Fähre")
                                                }
                                            </button>
                                        );
                                    })
                                ) : (
                                    <></>
                                )}
                            </>
                        ) : (
                            <></>
                        )}
                    </div>
                    <div
                        style={{height: "70vh"}}
                        className="w-full sm:w-auto sm:max-w-lg mb-3 overflow-scroll overflow-x-hidden custom-scrollbar scrolling-touch rounded-lg pb-40"
                    >
                        {this.state.departures.map((departure, index) => {
                            if (this.props.match.params.network === "dvb") {
                                if (departure.arrivalTimeRelative > -1) {
                                    return (
                                        <Departure
                                            key={
                                                departure.line +
                                                departure.direction +
                                                index
                                            }
                                            modes={this.state.modes}
                                            departure={departure}
                                            embed={this.props.embed}
                                        />
                                    );
                                }
                            } else if (this.props.match.params.network === "bvg") {
                                if (Math.sign(new Date(Date.parse(departure.when)) - Date.now()) > -1) {
                                    return (
                                        <BVGDepartue
                                            key={departure.line.fahrtNr + index}
                                            departure={departure}
                                            modes={this.state.modes}
                                        />
                                    )
                                }
                            }
                            return <></>
                        })}
                        <ImpressPrivacy inline={true}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Stop;
