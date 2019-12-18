import React, {Component} from 'react';

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
            <div>
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
            </div>
        );
    }
}

export default DarkmodeToggle;