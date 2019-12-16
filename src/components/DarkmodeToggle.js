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
                <button className="italic focus:outline-none" onClick={this.toggleDarkmode.bind(this)}>{this.state.darkmode === true ? "darkmode aus" : "darkmode an"}</button>
            </div>
        );
    }
}

export default DarkmodeToggle;