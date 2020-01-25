import React from "react";
import {Link} from "react-router-dom";
import DarkmodeToggle from "../../components/Buttons/DarkmodeToggle";
import ImpressPrivacy from "../../components/Buttons/ImpressPrivacy";
import MenuButton from "../../components/Buttons/MenuButton";
import Twemoji from 'react-twemoji';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="p-6 pt-12 sm:p-20 lg:pl-56 bg-gray-400 dark\:bg-gray-800 min-h-screen trans">
                <div className="flex justify-between mb-5 w-full sm:w-auto sm:max-w-xs">
                    <div>
                        <h1 className="dark\:text-gray-200 font-bold font-inter text-2xl text-black flex"><Twemoji options={{ className: "h-8 mr-1" }}>🦜</Twemoji> Transportflow</h1>
                        <p className="font-inter text-gray-700 dark\:text-gray-400">Kein Auto, kein Problem. <span role="img" aria-label="rocket">🚀</span></p>
                    </div>
                    <div className="my-auto">
                        <DarkmodeToggle large={true}/>
                    </div>
                </div>
                <div className="w-full sm:w-auto sm:max-w-xs mb-6">
                    <div className="mb-2 sm:mb-3">
                        <Link to="/monitor">
                            <MenuButton icon="ios-bus" name="Monitor" description="Echtzeit Fahrplanauskunft"/>
                        </Link>
                    </div>
                    <Link to="/settings">
                        <MenuButton icon="ios-cog" name="Einstellungen"/>
                    </Link>

                    <ImpressPrivacy/>
                </div>
            </div>
        );
    }
}

export default App;
