import React, {Component} from "react";
import Suggestion from "./Suggestion";
import * as dvb from "dvbjs";
import {geolocated} from "react-geolocated";

const axios = require('axios').default;

class Suggestions extends Component {
    constructor(props) {
        super(props);

        this.state = {
            suggestions: []
        };
    }

    componentDidMount() {
        this.getLocation();
    }

    componentDidUpdate(nextProps) {
        if (this.props.input === nextProps.input && this.props.network === nextProps.network) {
            return;
        }
        if (this.props.input.length > 0) {
            this.findSuggestions(this.props.input);
        } else {
            this.getLocation();
        }
    }

    getLocation = async () => {
        if (!this.props.coords) {
            setTimeout(this.getLocation, 100);
            return;
        }
        if (this.props.isGeolocationAvailable && this.props.isGeolocationEnabled) {
            var longitude = this.props.coords.longitude;
            var latitude = this.props.coords.latitude;

            this.props.setState({loading: true});
            if (localStorage.getItem("network") === "bvg") {
                const raw = await axios.get("https://api.transportflow.online/stops/nearby?latitude=" + latitude + "&longitude=" + longitude);
                const stops = raw.data;

                await this.getBVGIcons(stops);

                if (this.props.input.length === 0)
                    this.setState({suggestions: stops});
            } else {
                const stops = await dvb.findAddress(
                    longitude,
                    latitude
                );


                await this.getDVBIcons(stops.stops);

                if (this.props.input.length === 0)
                    this.setState({suggestions: stops.stops});
            }
            this.props.setState({loading: false});
        }
    };

    findSuggestions = async input => {
        this.props.setState({loading: true});
        var stops;
        if (localStorage.getItem("network") === "dvb") {
            if (this.props.stopsOnly) {
                stops = await dvb.findStop(input).catch((err) => {
                    this.setState({suggestions: []});
                    this.props.setState({loading: false, err: true});
                });
                stops.splice(5)
            } else {
                stops = await dvb.findPOI(input).catch((err) => {
                    this.setState({suggestions: []});
                    this.props.setState({loading: false, err: true});
                });
            }

            if (stops === undefined || this.state.err) {
                return;
            }

            try {
                await this.getDVBIcons(stops);
            } catch (err) {

            }

            this.setState({suggestions: stops});
        } else if (localStorage.getItem("network") === "bvg") {
            var err = false;
            const raw = await axios.get("https://api.transportflow.online/locations?query=" + input + (this.props.stopsOnly ? "&addresses=false&poi=false" : "&addresses=true&poi=true")).catch((error) => {
                err = true;
            });
            if (err) {
                this.setState({suggestions: [], loading: false});
                return;
            }
            stops = raw.data;

            this.getBVGIcons(stops);

            if (stops.length === 1 && stops[0].id === null) {
                this.setState({suggestions: []});
                this.props.setState({loading: false});
                return;
            }

            this.setState({suggestions: stops});
        }
        this.props.setState({loading: false});

    };

    async getDVBIcons(stops) {
        for (const stop of stops) {
            var lines = await dvb.lines(stop.id).catch((error) => {
                throw error;
            });

            stop.icons = [];
            lines.forEach((line,) => {
                if (stop.icons.indexOf(line.mode.iconUrl) === -1)
                    stop.icons.push(line.mode.iconUrl);
            });
        }
    }

    getBVGIcons(stops) {
        stops.forEach((stop, index) => {
            stop.icons = [];
            if (stop.products.subway)
                stop.icons.push("https://upload.wikimedia.org/wikipedia/commons/a/a3/U-Bahn.svg");
            if (stop.products.bus)
                stop.icons.push("https://www.dvb.de/assets/img/trans-icon/transport-bus.svg");
            if (stop.products.tram)
                stop.icons.push("https://www.dvb.de/assets/img/trans-icon/transport-tram.svg");
            if (stop.products.suburban)
                stop.icons.push("https://www.dvb.de/assets/img/trans-icon/transport-metropolitan.svg");
            if (stop.products.express)
                stop.icons.push("https://www.dvb.de/assets/img/trans-icon/transport-train.svg");
            if (stop.products.ferry)
                stop.icons.push("https://www.dvb.de/assets/img/trans-icon/transport-ferry.svg");
            if (stop.products.regional)
                stop.icons.push("https://upload.wikimedia.org/wikipedia/commons/a/a6/VBB_Bahn-Regionalverkehr.svg");
        });
    }

    suggestionClick = async event => {
        event.preventDefault();
        if (this.props.clearSuggestions) {
            this.setState({suggestions: []});
        }
        this.props.suggestionClick(event);
    };

    render() {
        return (
            <>
                {this.state.suggestions ? this.state.suggestions.map((value, index) => (
                    <Suggestion
                        key={index}
                        value={value}
                        index={index}
                        suggestions={this.state.suggestions}
                        suggestionClick={this.suggestionClick}
                    />
                )):<></>}
            </>
        );
    }
}

export default geolocated({
    userDecisionTimeout: 5000
})(Suggestions);
