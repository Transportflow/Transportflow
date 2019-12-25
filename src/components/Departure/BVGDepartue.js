import React, {Component} from 'react';
import * as moment from "moment";

class BVGDepartue extends Component {
    constructor(props) {
        super(props);

        this.state = {
            imageError: false,
            open: false,
            iconUrl: ""
        };
    }

    componentDidMount() {
        this.setState({iconUrl: this.getIconUrl(this.props.departure.line.product)});
    }

    openDeparture() {
        this.setState({open: !this.state.open})
    }

    getIconUrl(name) {
        switch (name) {
            case ("bus"):
                return "https://www.dvb.de/assets/img/trans-icon/transport-bus.svg";
            case ("ferry"):
                return "https://www.dvb.de/assets/img/trans-icon/transport-ferry.svg";
            case ("regional"):
                return "https://upload.wikimedia.org/wikipedia/commons/a/a6/VBB_Bahn-Regionalverkehr.svg";
            case ("express"):
                return "https://www.dvb.de/assets/img/trans-icon/transport-train.svg";
            case ("suburban"):
                return "https://www.dvb.de/assets/img/trans-icon/transport-metropolitan.svg";
            case ("subway"):
                return "https://upload.wikimedia.org/wikipedia/commons/a/a3/U-Bahn.svg";
            case ("tram"):
                return "https://www.dvb.de/assets/img/trans-icon/transport-tram.svg";
            default:
                return "";
        }
    }

    render() {
        return (
            <div
                className={this.props.modes.indexOf(this.props.departure.line.product) === -1 && this.props.modes.length > 0 ? "hidden" :
                    "trans bg-gray-300 dark\\:bg-gray-700 text-gray-900 dark\\:text-gray-100 font-medium font-inter rounded-lg overflow-hidden mb-2 sm:mb-3 p-2 pl-3 select-none cursor-pointer"}
                onClick={this.openDeparture.bind(this)}
                style={this.props.embed ? {minWidth: "32rem"} : {}}>
                <div
                    className={(this.state.open ? "opacity-100 pb-1" : "opacity-0") + " overflow-hidden font-semibold text-sm tracking-wide uppercase text-center trans"}
                    style={{transition: "all 0.25s ease-in-out", maxHeight: this.state.open ? "60px" : 0}}>
                    <span>{
                        (this.props.departure.delay !== null || this.props.departure.delay !== "0") && Math.sign(this.props.departure.delay) === 1 ? "+" + this.props.departure.delay / 60 + " min Verspätung" :
                        (this.props.departure.delay !== null || this.props.departure.delay !== "0") && Math.sign(this.props.departure.delay) === -1 ? "-" + Math.abs(this.props.departure.delay) / 60 + " min zu früh" :
                            "pünktlich"}
                            {this.props.departure.platform !== null ? " | Platform " + this.props.departure.platform : ""}</span>
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
                                src={this.state.iconUrl}
                                onError={() => {
                                    this.setState({imageError: true});
                                }}
                            />
                            <span className="truncate pt-1">{this.props.departure.line.name}</span>
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
                        <span className="font-semibold text-2xl text-gray-800 dark\:text-gray-200 truncate">
                          {(new Date(Date.parse(this.props.departure.when)).getTime() - Date.now()) < 3.6e+6
                              ? moment
                                  .duration(
                                      new Date(Date.parse(this.props.departure.when)).getTime() - Date.now()+30000,
                                      "milliseconds"
                                  )
                                  .format("d[d] h[h] m[m]")
                              : moment
                                  .duration(
                                      new Date(Date.parse(this.props.departure.when)).getTime() - Date.now()+30000,
                                      "milliseconds"
                                  )
                                  .format("h[h]+")}
                        </span>
                            <br/>
                            <span className="font-thin text-gray-800 dark\:text-gray-200 text-base">
                          {new Date(Date.parse(this.props.departure.when))
                              .getHours()
                              .toString()
                              .padStart(2, "0") +
                          ":" +
                          new Date(Date.parse(this.props.departure.when))
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

export default BVGDepartue;