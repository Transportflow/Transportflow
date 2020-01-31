import React, {Component} from 'react';
import ImpressPrivacy from "../../components/Buttons/ImpressPrivacy";
import NetworkSwitch from "../../components/Buttons/NetworkSwitch";
import RedirectingButton from "../../components/Buttons/RedirectingButton";
import DarkmodeToggle from "../../components/Buttons/DarkmodeToggle";

class Network extends Component {
    constructor(props) {
        super();

        this.state = {
            disabled: !localStorage.getItem("network")
        }
    }

    componentDidMount() {
        localStorage.setItem("showNetworkSwitch", "true");
    }

    render() {
        return (
            <div
                className="pt-20 sm:pt-32 md:pt-40 lg:pt-56 bg-gray-400 dark\:bg-gray-800 min-h-screen text-center trans">
                <DarkmodeToggle hidden={true} onboarding={true}/>
                <h1 className="font-semibold font-inter text-2xl text-black dark\:text-gray-100">
                    <span className="font-sans">🗺</span> Region
                </h1>
                <p className="font-inter text-gray-700 dark\:text-gray-400 mb-4 mt-4">
                    Wählen Sie Ihren Verkehrsverbund.<br/>
                    Sie können ihn später ändern.
                </p>
                <div className="flex justify-center mb-6">
                    <NetworkSwitch onChange={() => {
                        this.setState({disabled: false})
                    }}/>
                </div>
                <RedirectingButton to="/onboarding/privacy" disabled={this.state.disabled}/>
                <ImpressPrivacy centered={true}/>
            </div>
        );
    }
}

export default Network;