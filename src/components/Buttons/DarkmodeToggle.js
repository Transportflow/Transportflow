import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import PWAPrompt from "react-ios-pwa-prompt";

// actually more than darkmode toggle, some "always there" features included ^-^
class DarkmodeToggle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            darkmode: false
        };
    }

    toggleDarkmode() {
        if (localStorage.getItem("darkmode") === "true") {
            localStorage.setItem("darkmode", "false");
            document.documentElement.classList.remove("mode-dark");
            this.setState({darkmode: false});
        } else {
            localStorage.setItem("darkmode", "true");
            document.documentElement.classList.add("mode-dark");
            this.setState({darkmode: true});
        }
    }

    componentDidMount() {
        if (localStorage.getItem("darkmode") === "true") {
            document.documentElement.classList.add("mode-dark");
            this.setState({darkmode: true});
        } else {
            document.documentElement.classList.remove("mode-dark");
            this.setState({darkmode: false});
        }
    }


    render() {
        return (
            <>
                <PWAPrompt
                           copyTitle={"Zum Homebildschirm hinzufügen"}
                           copyBody={"Diese Website kann als App genutzt werden. Folgen Sie untenstehenden Schritten, um die Website als App zu nutzen."}
                           copyShareButtonLabel={"Drücken Sie die 'Teilen' Schaltfläche in der Safari-Menüleiste."}
                           copyAddHomeButtonLabel={"Drücken Sie nun die Schaltfläche 'Zum Home-Bildschirm'"}
                           copyClosePrompt={"Abbrechen"}
                           promptOnVisit={20}
                           delay={100}
                           timesToShow={100}/>
                <div className={this.props.hidden ? "hidden" : ""}>
                    {this.props.large ?
                        <button
                            className="focus:outline-none dark\:text-gray-400 text-gray-700 rounded-full bg-gray-800 dark\:bg-gray-400 trans"
                            style={{width: "48px", height: "48px"}}
                            onClick={this.toggleDarkmode.bind(this)}>{this.state.darkmode === true ? "🌒" : "🌔"}</button>
                        : this.props.button ?
                            <>
                                <button
                                    className="focus:outline-none dark\:text-gray-400 text-gray-700 rounded-full bg-gray-800 dark\:bg-gray-400 trans mr-1"
                                    style={{width: "48px", height: "48px"}}
                                    onClick={this.toggleDarkmode.bind(this)}>{this.state.darkmode === true ? "🌒" : "🌔"}</button>
                                <span
                                    className="focus:outline-none py-2 px-2 dark\:text-gray-200 text-gray-800 rounded-lg trans">{this.state.darkmode === true ? "Dunkel" : "Hell"}</span>
                            </>
                            :
                            <button className="italic focus:outline-none dark\:text-gray-400 text-gray-700"
                                    onClick={this.toggleDarkmode.bind(this)}>{this.state.darkmode === true ? "darkmode aus" : "darkmode an"}</button>
                    }
                    {!localStorage.getItem("network") && !this.props.onboarding ?
                        <Redirect to="/onboarding/welcome"/>
                        : !localStorage.getItem("privacy") && !this.props.onboarding ?
                            <Redirect to="/onboarding/privacy"/>
                        :
                        <></>
                    }
                </div>
            </>
        );
    }
}

export default DarkmodeToggle;