import React from "react";
import { Link } from "react-router-dom";
import DarkmodeToggle from "../../components/Buttons/DarkmodeToggle";
import ImpressPrivacy from "../../components/Buttons/ImpressPrivacy";
import MenuButton from "../../components/Buttons/MenuButton";

class App extends React.Component {
  render() {
    return (
      <div className="p-4 pt-12 sm:p-20 lg:pl-56 min-h-screen">
        <div className="flex justify-between mb-5 w-full sm:w-auto sm:max-w-xs">
          <div>
            <h1 className="dark\:text-gray-200 font-bold font-inter text-2xl text-black flex">
              <img
                draggable="false"
                className="mr-1 my-auto"
                alt="🦜"
                src="https://twemoji.maxcdn.com/v/12.1.4/72x72/1f99c.png"
                style={{ height: "24px" }}
              />{" "}
              Transportflow{" "}
              <p>
                <p className="ml-1 uppercase text-xs px-1 text-white bg-red-600 rounded tracking-wide">
                  beta
                </p>
              </p>
            </h1>
            <p className="font-inter text-gray-700 dark\:text-gray-400">
              Kein Auto, kein Problem.{" "}
              <span role="img" aria-label="rocket">
                🚀
              </span>
            </p>
          </div>
          <div className="my-auto">
            <DarkmodeToggle large={true} />
          </div>
        </div>

        <ImpressPrivacy />
      </div>
    );
  }
}

export default App;
