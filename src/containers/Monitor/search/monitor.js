import React from "react";
import {geolocated} from "react-geolocated";
import "../../../css/tailwind.css"
import Suggestions from "../../../components/Suggestions";
import {BarLoader} from "react-spinners";
import DarkmodeToggle from "../../../components/Buttons/DarkmodeToggle";
import ImpressPrivacy from "../../../components/Buttons/ImpressPrivacy";
import BackButton from "../../../components/Buttons/BackButton";
import NetworkSwitch from "../../../components/Buttons/NetworkSwitch";
import {connect} from "react-redux";

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            suggestions: [],
            input: "",
            err: "",
            loading: true,
            network: localStorage.getItem("network"),
            showNetworkSwitch: localStorage.getItem("showNetworkSwitch")
        };
    }

    componentDidMount = async () => {
        this.setState({loading: false});
    };
    componentDidCatch(error, errorInfo) {
        this.setState({err: errorInfo.toString(), loading: false})
    }
    handleChange = event => {
        this.setState({
            input: event.target.value
        });
    };
    networkChanged() {
        this.setState({network: localStorage.getItem("network")})
    }

    render() {
        return (
            <div className="p-4 pt-6 sm:p-12 lg:pl-56 bg-gray-400 dark\:bg-gray-800 min-h-screen trans">
                <div className="flex mb-3">
                    <BackButton className="mr-3" to={"/"} large={true}/>
                    <DarkmodeToggle large={true}/>
                </div>
                <h1 className="font-semibold font-inter text-2xl text-black dark\:text-gray-200">
                    Transportflow Monitor
                </h1>
                {!this.state.loading ? (
                    <p className="font-inter text-gray-700 dark\:text-gray-400 mb-4">Echtzeit Fahrplanauskunft</p>
                ) : this.state.err !== "" ? (
                    <p className="p-1 pl-2 bg-red-600 text-gray-300 mt-4 mb-5 max-w-xs rounded-lg font-semibold">
                        {this.state.err}
                    </p>
                ) : (
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
                )}
                <div className="w-full sm:w-auto sm:max-w-xs">
                    <div
                        className={localStorage.getItem("showNetworkSwitch") === "true" ? "flex w-full justify-center" : "hidden"}>
                        <NetworkSwitch onChange={this.networkChanged.bind(this)}/></div>
                    <div className="flex mb-3 mt-3">
                        <input
                            placeholder="Haltestelle"
                            onChange={this.handleChange}
                            className="dark\:bg-gray-700 dark\:placeholder-gray-300 dark\:text-gray-300 dark-hover\:bg-gray-600 dark\:placeholder-gray-500 py-3 w-full text-lg font-inter font-semibold trans-fast rounded-lg px-3 bg-gray-300 sm:hover:bg-gray-300 focus:bg-gray-300 z-50 relative text-gray-800 sm:hover:shadow-md focus:shadow-md focus:outline-none"
                        />
                    </div>
                    <div className="w-full font-semibold font-inter dark\:text-gray-400">
                        <Suggestions
                            input={this.state.input}
                            stopsOnly={true}
                            maxResults={30}
                            network={this.state.network}
                            setState={this.setState.bind(this)}
                            suggestions={this.props.suggestions}
                            dispatch={this.props.dispatch}
                            setError={(err) => this.setState({err: err})}
                        />
                    </div>
                    <ImpressPrivacy inline={true}/>
                </div>

            </div>
        );
    }
}

function mapStateToProps(state) {
    return {suggestions: state.monitor.suggestions};
}

export default connect(mapStateToProps)(geolocated({
    userDecisionTimeout: 5000
})(Index));
