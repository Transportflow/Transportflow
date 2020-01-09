import React, {Component} from "react";
import * as db from "../../containers/Monitor/profiles/DB"
import {CircleLoader} from "react-spinners";
import Wagenreihung from "./Wagenreihung";
import {getNextStops, getNextStopsDVB} from "../../containers/Monitor/profiles/utils";

/*
PROPS
modes - currently showing modes
departure
    state - <Too early|In time|Delayed>
    delayTime - amount of time the departure is delayed

    mode - mode of this departure
    platform - number of platform
    platformTitle - title of platform
    icon - symbol for mode of departure

    line - line of departure
    direction - direction of departure

    arrivalTime - hh:mm of arrival
    arrivalTimeRelative - m' or h'' of arrival time for departure

stops[] - next stops for departure
    id - id of stop
    arrivalTime - hh:mm arrival time at the stop
    name - name of stop
 */
class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            imageError: false,
            open: false,
            wagenreihung: undefined,
            nextStops: [],
            cancelled: false,
            loadingWagons: false,
            loadingNextStops: false,
            network: localStorage.getItem("network")
        };
    }

    componentDidMount() {
        if (this.props.departure.cancelled) {
            this.setState({open: true, cancelled: true});
        } else {
            this.loadWagenreihung();
            this.loadNextStops();
        }

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.departure !== this.props.departure && !this.props.departure.cancelled) {
            this.loadWagenreihung();
            this.loadNextStops();
        }
    }

    async loadNextStops() {
        let nextStops;
        this.setState({loadingNextStops: true});
        switch (this.state.network) {
            case "bvg":
                nextStops = await getNextStops(
                    "https://bvg.transportflow.de",
                    this.props.departure.tripId,
                    this.props.departure.line,
                    this.props.departure.when);
                break;
            case "db":
                nextStops = await getNextStops(
                    "https://db.transportflow.de",
                    this.props.departure.tripId,
                    this.props.departure.line,
                    this.props.departure.when);
                break;
            case "dvb":
                nextStops = await getNextStopsDVB(
                    this.props.departure.id,
                    this.props.departure.when,
                    this.props.departure.stopid);
                break;
            default:
                this.setState({nextStops: [], loadingNextStops: false});
                return;
        }
        this.setState({nextStops: nextStops, loadingNextStops: false});
    }

    async loadWagenreihung() {
        if (localStorage.getItem("network") === "db") {
            try {
                this.setState({loadingWagons: true});
                let wagenreihung = await db.getWagenreihung(this.props.departure.fahrtNr, this.props.departure.when, this.props.departure.mode);
                if (wagenreihung === "error") {
                    throw new Error("No Wagenreihung available");
                }
                this.setState({wagenreihung: wagenreihung});
            } catch (err) {
                // no wagenreihung available
            }
            this.setState({loadingWagons: false});
        }
    }

    openDeparture() {
        this.setState({open: !this.state.open})
    }

    render() {
        return (
            <div className="trans-bg bg-gray-300 dark\:bg-gray-700 text-gray-900 dark\:text-gray-100 font-medium font-inter rounded-lg overflow-hidden mb-2 sm:mb-3 p-2 pl-3 select-none cursor-pointer"
                 onClick={this.openDeparture.bind(this)}>
                <div
                    className={(this.state.open ? "opacity-100 pb-1" : "opacity-0") + " overflow-hidden font-semibold text-sm tracking-wide uppercase text-center trans"}
                    style={{transition: "all 0.25s ease-in-out", maxHeight: this.state.open ? "60px" : 0}}>
                    <span>{this.state.cancelled ? "Fällt aus" : (this.props.departure.state === "In time" ? "pünktlich"
                        : this.props.departure.state === "Delayed" ? "+" + this.props.departure.delayTime + " min Verspätung"
                            : this.props.departure.state === "No data" ? "Keine Echtzeitauskunft" : this.props.departure.delayTime + " min zu früh")}
                        {this.props.departure.platform ? " | " + this.props.departure.platformTitle + " " + this.props.departure.platform : ""}</span>
                </div>
                <div className="flex flex-shrink justify-between rounded-lg">
                    <div className="w-3/4 sm:ml-1 my-auto">
                        <p className="font-semibold text-2xl flex items-center leading-tight">
                            <img
                                style={
                                    this.state.imageError
                                        ? {display: "hidden", marginRight: "0"}
                                        : {height: "26px", marginRight: "0.5rem"}
                                }
                                alt=""
                                src={this.props.departure.icon}
                                onError={() => {
                                    this.setState({imageError: true});
                                }}
                            />
                            <span className="truncate pt-1">{this.props.departure.line}</span>
                        </p>
                        <p className="text-lg font-normal truncate text-gray-800 dark\:text-gray-200">
                            {!this.props.embed ? (
                                <span className="cursor-pointer">
                                  {this.props.departure.direction}
                                </span>
                            ) : (
                                <span>{this.props.departure.direction}</span>
                            )}
                        </p>
                    </div>
                    <div
                        className="w-1/4 sm:w-1/5 md:w-1/6 bg-gray-400 dark\:bg-gray-800 rounded-lg object-right p-2 sm:m-1">
                        <p className="text-center leading-tight">
                        <span className="font-semibold text-2xl text-gray-800 dark\:text-gray-200">
                          {this.props.departure.arrivalTimeRelative}
                        </span>
                            <br/>
                            <span className="font-thin text-gray-800 dark\:text-gray-200 text-base">
                                {this.props.departure.arrivalTime}
                            </span>
                        </p>
                    </div>
                </div>
                <div
                    className={(this.state.open ? "opacity-100" : "opacity-0") + " overflow-hidden text-sm tracking-wide text-center trans"}
                    style={{transition: "all 0.25s ease-in-out", maxHeight: this.state.open ? "300px" : 0}}>
                    {this.state.loadingWagons ?
                        <div className="sm:ml-1 mb-1 flex">
                            <CircleLoader
                                size={20}
                                color={"#718096"}
                                loading={this.state.loadingWagons}
                            />
                            <span className="ml-1">Lade Wagenreihung</span>
                        </div>
                        : this.state.wagenreihung !== undefined ?
                            <div className="mb-2 mt-2">
                                <Wagenreihung wagons={this.state.wagenreihung.wagons}/>
                            </div>
                            : <></>}
                    {this.state.loadingNextStops ?
                        <div className="sm:ml-1 mb-1 flex">
                            <CircleLoader
                                size={20}
                                color={"#718096"}
                                loading={this.state.loadingNextStops}
                            />
                            <span className="ml-1">Lade kommende Haltestellen</span>
                        </div>
                        : this.state.nextStops !== undefined && this.state.nextStops.length > 0 ?
                            <div
                                className="mb-2 mt-2 pb-1 flex overflow-y-hidden overflow-x-scroll scrolling-touch">
                                {this.state.nextStops.map((stop, index) => {
                                    return (
                                        <div key={index} className="mx-2">
                                            <span className="flex">
                                                {stop.icons.map((icon, index) => {
                                                    return (
                                                        <img key={index} className="h-3 mr-1 mt-1" src={icon} alt=""/>
                                                    )
                                                })}
                                            </span>
                                            <a href={"/monitor/"+this.state.network+"/stop/"+stop.stop.id}>
                                                <p className="whitespace-no-wrap text-left font-semibold hover:underline">{stop.name}</p>
                                            </a>
                                            <p className="whitespace-no-wrap text-left">{stop.timeRelative} | {stop.time}</p>
                                        </div>
                                    )
                                })}
                            </div>
                            : <></>}
                </div>
            </div>
        );
    }
}

export default Index;
