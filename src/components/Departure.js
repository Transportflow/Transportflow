import React, {Component} from "react";
var moment = require("moment");
require("moment-duration-format");

/*
PROPS
modes - currently showing modes
mode - mode of this departure
departure
    state - <Too early|In time|Too late>
    delayTime - amount of time the departure is delayed

    platform - number of platform
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
class Departure extends Component {
    constructor(props) {
        super(props);

        this.state = {
            imageError: false,
            open: false
        };
    }

    openDeparture() {
        this.setState({open: !this.state.open})
    }

    render() {
        return (
            <div className={
                this.props.modes.includes(this.props.mode) ||
                this.props.modes.length < 1
                    ? "trans bg-gray-300 dark\\:bg-gray-700 text-gray-900 dark\\:text-gray-100 font-medium font-inter rounded-lg overflow-hidden mb-2 sm:mb-3 p-2 pl-3 select-none cursor-pointer"
                    : "hidden"
            }
                 onClick={this.openDeparture.bind(this)}>
                <div
                    className={(this.state.open ? "opacity-100 pb-1" : "opacity-0") + " overflow-hidden font-semibold text-sm tracking-wide uppercase text-center trans"}
                    style={{transition: "all 0.25s ease-in-out", maxHeight: this.state.open ? "60px" : 0}}>
                    <span>{this.props.departure.state === "Delayed" ? "+" + this.props.departure.delayTime + " min Verspätung" : "pünktlich"}{this.props.departure.platform ? " | " + this.props.departure.platform.type + " " + this.props.departure.platform.name : ""}</span>
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
                        className="w-1/4 sm:w-1/5 md:w-1/6 bg-gray-400 dark\:bg-gray-800 rounded-lg object-right p-2 sm:m-1 trans">
                        <p className="text-center leading-tight">
                        <span className="font-semibold text-2xl text-gray-800 dark\:text-gray-200">
                          {this.props.departure.arrivalTimeRelative < 60
                              ? moment
                                  .duration(
                                      this.props.departure.arrivalTimeRelative,
                                      "minutes"
                                  )
                                  .format("d[d] h[h] m[m]")
                              : moment
                                  .duration(
                                      this.props.departure.arrivalTimeRelative,
                                      "minutes"
                                  )
                                  .format("h[h]+")}
                        </span>
                            <br></br>
                            <span className="font-thin text-gray-800 dark\:text-gray-200 text-base">
                          {new Date(Date.parse(this.props.departure.arrivalTime))
                              .getHours()
                              .toString()
                              .padStart(2, "0") +
                          ":" +
                          new Date(Date.parse(this.props.departure.arrivalTime))
                              .getMinutes()
                              .toString()
                              .padStart(2, "0")}
                        </span>
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Departure;
