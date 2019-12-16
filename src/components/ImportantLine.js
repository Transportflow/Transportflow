import React from "react";
import DarkmodeToggle from "./DarkmodeToggle";
import ImpressPrivacy from "./ImpressPrivacy";

export default function ImportantLine() {
    return (<span className={"flex italic dark:text-gray-500 text-gray-600 font-semibold truncate"}>
                    <DarkmodeToggle/>
                    <span className="mx-1">|</span>
                    <ImpressPrivacy/>
                </span>)
}