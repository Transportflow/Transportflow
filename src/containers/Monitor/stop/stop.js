import React from "react";
import "../../../css/tailwind.css";
import {BarLoader} from "react-spinners";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faMapMarkerAlt,
    faRedo
} from "@fortawesome/free-solid-svg-icons";

import * as dvb from "../profiles/DVB";
import * as bvg from "../profiles/BVG";
import * as db from "../profiles/DB";

import DarkmodeToggle from "../../../components/Buttons/DarkmodeToggle";
import ImpressPrivacy from "../../../components/Buttons/ImpressPrivacy";
import BackButton from "../../../components/Buttons/BackButton";
import Departure from "../../../components/Departure";
import {connect} from "react-redux";

class Stop extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            stop: "",
            loading: true,
            err: "",
            activeModes: this.props.modes,
            stopInfo: false
        }
    }

    toggleMode = event => {
        var activeModes = this.state.activeModes;
        var mode = event.target.id;

        event.target.classList.toggle("sm:bg-gray-300");
        event.target.classList.toggle("sm:bg-gray-400");
        event.target.classList.toggle("bg-gray-100");
        event.target.classList.toggle("bg-gray-300");
        event.target.classList.toggle("sm:dark\\:bg-gray-800");
        event.target.classList.toggle("sm:dark\\:bg-gray-700");
        event.target.classList.toggle("dark\\:bg-gray-700");
        event.target.classList.toggle("dark\\:bg-gray-500");
        if (activeModes.indexOf(mode) === -1) {
            activeModes.push(mode);
            this.setState({
                activeModes: activeModes
            });
        } else {
            activeModes.splice(activeModes.indexOf(mode), 1);
            this.setState({
                modes: activeModes
            });
        }
    };

    reloadDepartures = async event => {
        this.findDeparturesForCurrentNetwork();
    };

    async findDeparturesForCurrentNetwork() {
        this.setState({loading: true});
        try {
            if (this.props.match.params.network === "dvb") {
                await dvb.findDepartures(this.state.stop, this.props.dispatch);
            } else if (this.props.match.params.network === "bvg") {
                await bvg.findDepartures(this.state.stop, this.props.dispatch);
            } else if (this.props.match.params.network === "db") {
                await db.findDepartures(this.state.stop, this.props.dispatch);
            } else {
                throw new Error("Couldn't find Network");
            }
        } catch (error) {
            this.setState({err: error.toString().replace("Error: ", ""), loading: false});
        }
        this.setState({loading: false});
    }

    componentDidCatch(error, errorInfo) {
        this.setState({err: error, loading: false});
    }

    componentDidMount = async () => {
        await this.setState({
            stop: decodeURI(
                this.props.match.params.id
                    .replace("%2F", "/")
            )
        });
        this.findDeparturesForCurrentNetwork();
    };

    componentWillUnmount() {
        this.props.dispatch({type: "CLEAR_DEPARTURES"});
        this.props.dispatch({type: "CLEAR_MODES"});
        this.props.dispatch({type: "CLEAR_STOP"});
    }

    render() {
        let currentlyDisplayed = 0;

        return (
            <div>
                <div
                    className="p-6 pt-6 sm:p-12 lg:pl-56 bg-gray-400 dark\:bg-gray-800 trans font-sans min-h-screen"
                >
                    <div className="flex mb-2">
                        <BackButton large={true} className="mr-3"/>
                        <button
                            onClick={this.reloadDepartures}
                            className="text-gray-900 bg-gray-300 dark\:bg-gray-700 dark\:text-gray-300 dark-hover\:bg-gray-600 sm:hover:bg-gray-300 px-4 py-3 rounded-lg mr-3 sm:hover:shadow-lg focus:outline-none trans-faster"
                        >
                            <FontAwesomeIcon icon={faRedo}/>
                        </button>
                        <DarkmodeToggle large={true}/>
                    </div>
                    <h1 className="trans font-semibold font-inter text-2xl text-black truncate text-black dark\:text-gray-200">
                        {this.state.err ?
                            "Fehler" :
                            this.props.stop.name || "Laden..."}
                    </h1>
                    <div className="w-full sm:w-auto sm:max-w-xs flex w-full justify-left mt-2 mb-1">
                        <div
                            className="px-1 bg-gray-300 dark\:bg-gray-700 dark\:text-white focus:outline-none trans rounded-lg flex">
                            <button key="departures"
                                    className="w-32 focus:outline-none"
                                    onClick={() => {
                                        this.setState({stopInfo: false})
                                    }}
                            >
                                <div
                                    className={"my-1 py-1 trans bg-none rounded " + (!this.state.stopInfo ? "bg-gray-100 dark\\:bg-gray-600" : "")}>
                                    Abfahrten
                                </div>
                            </button>
                            <button key="stopInfo"
                                    className="w-32 focus:outline-none"
                                    onClick={() => {
                                        this.setState({stopInfo: true})
                                    }}
                            >
                                <div
                                    className={"my-1 py-1 trans bg-none rounded " + (this.state.stopInfo ? "bg-gray-100 dark\\:bg-gray-600" : "")}>
                                    Haltestelle
                                </div>
                            </button>
                        </div>
                    </div>
                    {this.state.loading === true ? (
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
                    ) : this.state.err !== "" ? (
                        <p className="p-1 pl-2 bg-red-600 text-gray-300 mt-4 mb-5 max-w-xs rounded-lg font-semibold">
                            {this.state.err}
                        </p>
                    ) : (
                        <></>
                    )}

                    <div
                        className={(!this.state.stopInfo ? "opacity-0" : "opacity-1") + " trans z-10 w-full sm:w-auto sm:max-w-lg"}
                        style={{
                            transition: "all 0.25s ease-in-out",
                            display: this.state.stopInfo ? "block" : "none"
                        }}>
                        <div className="sm:w-auto sm:max-w-sm py-2 rounded-lg overflow-hidden">
                            <img style={{borderRadius: "0.5em"}} alt='static map of stop'
                                 src={'https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/' + this.props.stop.longitude + ',' + this.props.stop.latitude + ',17.00,10.00/350x350@2x?access_token=pk.eyJ1IjoiYWR3aXJhd2llbiIsImEiOiJjazU1aGp4cXkwM3VsM3NvNXpkeWNtZGo0In0.ZfjLctJ4o3iZj6u5faDISw'}/>
                        </div>
                        <a
                            href={this.props.stop.mapLink}
                            style={{display: this.state.stopInfo ? "block" : "none"}}
                            className="font-inter text-gray-700 dark\:text-gray-400"
                        >
                            <FontAwesomeIcon icon={faMapMarkerAlt}/>
                            {" Route anzeigen"}
                        </a>
                    </div>
                    <div className={(this.state.stopInfo ? "opacity-0" : "opacity-1") + " trans z-50"} style={{
                        display: !this.state.stopInfo ? "block" : "none",
                        transition: "all 0.25s ease-in-out"
                    }}>
                        {this.props.modes.length > 1 ? (
                            <div
                                className="flex mt-3 mb-3 overflow-scroll overflow-y-hidden scrolling-touch sm:overflow-visible custom-scrollbar w-auto rounded-lg">
                                {this.props.modes.map((mode, index) => {
                                    return (
                                        <button
                                            className="whitespace-no-wrap text-gray-900 bg-gray-300 sm:bg-gray-400 dark\:bg-gray-700 sm:dark\:bg-gray-800 dark\:text-gray-200 px-4 py-3 rounded-lg mr-3 focus:outline-none trans-bg"
                                            onClick={this.toggleMode}
                                            key={mode}
                                            id={mode}
                                        >
                                            {mode
                                                .replace("suburban", "S-Bahn")
                                                .replace("subway", "U-Bahn")
                                                .replace("tram", "Straßenbahn")
                                                .replace("bus", "Bus")
                                                .replace("express", "Bahn")
                                                .replace("regionalExp", "Express")
                                                .replace("regional", "RE/RB")
                                                .replace("ferry", "Fähre")
                                                .replace("nationalExpress", "ICE")
                                                .replace("national", "IC/EC")
                                                .replace("taxi", "Taxi")
                                            }
                                        </button>
                                    )
                                })}
                            </div>
                        ) : (
                            <></>
                        )}
                        <div
                            style={{height: "70vh"}}
                            className="w-full sm:w-auto sm:max-w-lg mb-3 overflow-scroll overflow-x-hidden custom-scrollbar scrolling-touch rounded-lg pb-40 mt-3"
                        >
                            {this.props.departures.map((departure, index) => {
                                if (index === 0) {
                                    currentlyDisplayed = 0;
                                }
                                if (departure.arrivalTimeRelative.includes("-")) {
                                    return <></>
                                }
                                if (currentlyDisplayed > 14) {
                                    return <></>
                                }
                                if (this.state.activeModes.includes(departure.mode) ||
                                    this.state.activeModes.length < 1) {
                                    currentlyDisplayed++;
                                    return (
                                        <Departure
                                            key={index}
                                            departure={departure}
                                        />
                                    );
                                }

                            })}
                            <ImpressPrivacy inline={true}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {departures: state.monitor.departures, stop: state.monitor.stop, modes: state.monitor.modes}
}

export default connect(mapStateToProps)(Stop);
