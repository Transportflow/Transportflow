import React, {Component} from 'react';
import DarkmodeToggle from "../../components/Buttons/DarkmodeToggle";
import RedirectingButton from "../../components/Buttons/RedirectingButton";
import ImpressPrivacy from "../../components/Buttons/ImpressPrivacy";

class Done extends Component {
    render() {
        return (
            <div className="pt-20 sm:pt-32 md:pt-40 lg:pt-56 bg-gray-400 dark\:bg-gray-800 min-h-screen text-center trans">
                <DarkmodeToggle hidden={true}/>
                <div className="m-auto flex" style={{width: "12.5rem"}}>
                    <img
                        draggable="false" alt="🦜" className="my-auto mr-1"
                        src="https://twemoji.maxcdn.com/v/12.1.4/72x72/1f99c.png"
                        style={{height: "24px"}}/>
                    <h1 className="font-semibold font-inter text-2xl text-black dark\:text-gray-100">
                        Transportflow
                    </h1>
                </div>
                <p className="font-inter text-gray-700 dark\:text-gray-300 mb-6 mt-4 font-medium">
                    Sie haben die Einrichtung erfolgreich<br/> abgeschlossen! <span role="img" aria-label="party" className="font-sans">🎉</span><br/>
                </p>
                <RedirectingButton text="Los geht's!" to="/" />
                <ImpressPrivacy centered={true}/>
            </div>
        );
    }
}

export default Done;