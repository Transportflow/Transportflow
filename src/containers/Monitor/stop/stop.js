import React from "react";
import * as dvb from "dvbjs";
import "../../../css/tailwind.css";
import {BarLoader} from "react-spinners";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faMapMarkerAlt,
    faTimes, faChevronLeft,
    faRedo
} from "@fortawesome/free-solid-svg-icons";
import Departure from "../../../components/Departure"
import DarkmodeToggle from "../../../components/DarkmodeToggle";
import ImpressPrivacy from "../../../components/ImpressPrivacy";
import BackButton from "../../../components/BackButton";
import {bvgProfile} from '../../../components/profiles/bvg';

const createClient = require('hafas-client');

class Stop extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            stopName: "",
            stop: [],
            departures: [],
            err: "",
            loading: true,
            imageError: false,
            latitude: "",
            longitude: "",
            modes: [],
            allModes: []
        };
    }

    async findDeparturesForDVB() {
        this.setState({loading: true});
        var stop = await dvb.findStop(this.state.stopName || "");
        if (stop.length === 0) {
            this.setState({err: "Fehler: Haltestelle nicht gefunden", loading: false});
            return;
        }
        this.setState({
            latitude: stop[0].coords[1],
            longitude: stop[0].coords[0],
            stop: stop
        });
        var query = await dvb.monitor(stop[0].id, 0, 30).catch(error => {
            this.setState({err: error.name + ": " + error.message, loading: false});
        });
        if (this.state.err === "") {
            const mot = [];
            query.forEach(departure => {
                var toPush = "";
                if (!departure.mode.title.includes("undefined")) {
                    toPush = departure.mode.title;
                    if (
                        toPush !== "" &&
                        mot.indexOf(toPush) === -1 &&
                        departure.arrivalTimeRelative > -1
                    ) {
                        mot.push(toPush);
                    }
                }
            });
            this.setState({
                allModes: Object.assign([], mot),
                departures: query,
                loading: false
            });
        }
        this.forceUpdate();
    }

    async findDeparturesForBVG() {
        this.setState({loading: true});
        const client = createClient(bvgProfile, "suggestionClient");
        var stop = await client.stop(this.state.stopName || "").catch((err) => {
            this.setState({err: err.name + ": " + err.message, loading: false});
        });
        if (stop === undefined) {
            return
        }
        this.setState({
            latitude: stop.location.latitude,
            longitude: stop.location.longitude,
            stop: stop
        });

        var monitor = await client.departures(this.state.stopName || "").catch((err) => {
            this.setState({err: err.name + ": " + err.message, loading: false});
        });
        if (monitor.length === 0) {
            this.setState({err: "Fehler: Haltestelle nicht gefunden", loading: false});
            return;
        }
        if (this.state.err === "") {
            this.setState({
                allModes: [],
                departures: monitor,
                loading: false
            });
        }
        this.forceUpdate();
    }

    toggleMode = event => {
        var modes = this.state.modes;
        var mode = event.target.innerHTML;

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

    componentWillReceiveProps = async nextProps => {
        if (nextProps.stop !== "") {
            await this.setState({
                stopName: nextProps.stop
            });
            this.setState({
                modes: [],
                allModes: []
            });
            this.findDeparturesForCurrentNetwork();
        } else {
            this.setState({
                stopName: "",
                stop: [],
                departures: [],
                err: "",
                loading: true,
                latitude: "",
                longitude: "",
                modes: [],
                allModes: []
            });
        }
    };

    async findDeparturesForCurrentNetwork() {
        if (this.props.match.params.network === "dvb") {
            this.findDeparturesForDVB();
        } else if (this.props.match.params.network === "bvg") {
            this.findDeparturesForBVG();
        } else {
            this.setState({
                err: "Verkehrsverbund nicht gefunden (" + this.props.match.params.network.toUpperCase() + ")",
                loading: false
            })
        }
    }

    componentDidMount = async () => {
        if (!this.props.embed) {
            await this.setState({
                stopName: decodeURI(
                    this.props.match.params.id
                        .replace("%2F", "/")
                )
            });
            this.findDeparturesForCurrentNetwork();
        }
    };

    render() {
        return (
            <div
                className={
                    this.props.stop === "" ? "hidden trans" : "overflow-hidden max-h-screen trans bg-gray-400 dark\\:bg-gray-800"
                }
            >
                <div
                    className={
                        !this.props.embed
                            ? "p-6 pt-12 sm:p-20 lg:pl-56"
                            : "p-6 hidden lg:block"
                    }
                    style={this.props.embed ? {paddingTop: "0.50rem"} : {}}
                >
                    <div className="flex mb-3">
                        {!this.props.embed ? (
                            <BackButton large={true} className="mr-3"/>
                        ) : (
                            <button
                                onClick={this.props.closeEmbed}
                                className="text-gray-900 bg-gray-300 sm:hover:bg-gray-300 dark\:bg-gray-700 dark\:text-gray-300 dark-hover\:bg-gray-600 px-4 py-3 rounded-lg mr-3 sm:hover:shadow-lg focus:outline-none trans"
                            >
                                <FontAwesomeIcon icon={faTimes}/>
                            </button>
                        )}
                        <button
                            onClick={this.reloadDepartures}
                            className="text-gray-900 bg-gray-300 dark\:bg-gray-700 dark\:text-gray-300 dark-hover\:bg-gray-600 sm:hover:bg-gray-300 px-4 py-3 rounded-lg mr-3 sm:hover:shadow-lg focus:outline-none trans"
                        >
                            <FontAwesomeIcon icon={faRedo}/>
                        </button>
                        <DarkmodeToggle large={true}/>
                    </div>
                    <h1 className="trans font-semibold font-inter text-2xl text-black truncate text-black dark\:text-gray-200">
                        {this.state.loading && (this.state.stop.name === undefined && this.state.stop[0] === undefined) ?
                                "Laden..."
                            : this.props.match.params.network === "bvg" ?
                                this.state.stop.name
                            : this.state.stop.length > 0 && this.props.match.params.network === "dvb" ?
                                this.state.stop[0].name + ", " + this.state.stop[0].city
                            :
                                "Fehler"}
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
                        <div className="rounded-lg overflow-hidden max-w-xs pb-2 pt-3">
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
                                            >
                                                {mode}
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
                            if (departure.arrivalTimeRelative > -1) {
                                return (
                                    <Departure
                                        key={
                                            departure.line +
                                            departure.direction +
                                            departure.arrivalTimeRelative
                                        }
                                        modes={this.state.modes}
                                        departure={departure}
                                        embed={this.props.embed}
                                    />
                                );
                            }
                        })}
                        <ImpressPrivacy inline={true}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Stop;
