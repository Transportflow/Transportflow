import React, {Component} from "react";
import Suggestion from "./Suggestion";
import * as dvb from "../containers/Monitor/profiles/DVB";
import * as bvg from "../containers/Monitor/profiles/BVG";
import * as db from "../containers/Monitor/profiles/DB";
import {geolocated} from "react-geolocated";

class Suggestions extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true
        };
    }

    componentDidMount() {
        this.getLocation();
    }

    componentDidCatch(error, errorInfo) {
        console.log(error)
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.network !== prevProps.network && this.props.input.length < 1) {
            await this.getLocation();
        } else if (this.props.network !== prevProps.network && this.props.input.length > 0) {
            this.findSuggestions(this.props.input);
        }

        if (this.props.input === prevProps.input) {
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
            let longitude = this.props.coords.longitude;
            let latitude = this.props.coords.latitude;

            this.props.setState({loading: true});
            try {
                switch (this.props.network) {
                    case "dvb":
                        await dvb.findLocationSuggestions(latitude, longitude, this.props.dispatch);
                        break;
                    case "bvg":
                        await bvg.findLocationSuggestions(latitude, longitude, this.props.dispatch);
                        break;
                    case "db":
                        await db.findLocationSuggestions(latitude, longitude, this.props.dispatch);
                        break;
                    default:
                }
            } catch (err) {
                throw new Error(err.toString())
            }
            this.props.setState({loading: false});
        }
    };

    findSuggestions = async input => {
        this.props.setState({loading: true});
        switch (this.props.network) {
            case "dvb":
                await dvb.findSuggestions(input, this.props.dispatch);
                break;
            case "bvg":
                await bvg.findSuggestions(input, this.props.dispatch);
                break;
            case "db":
                await db.findSuggestions(input, this.props.dispatch);
                break;
            default:
        }
        this.props.setState({loading: false});

    };

    render() {
        return (
            <>
                {this.props.suggestions.map((suggestion, index) => (
                    <Suggestion
                        key={index}
                        network={this.props.network}
                        suggestion={suggestion}
                        index={index}
                        dispatch={this.props.dispatch}
                    />
                ))}
            </>
        );
    }
}

export default geolocated({
    userDecisionTimeout: 5000
})(Suggestions);
