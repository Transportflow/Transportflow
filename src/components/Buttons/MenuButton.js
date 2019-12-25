import React, {Component} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronRight} from "@fortawesome/free-solid-svg-icons";

/*
PROPS
icon
name
description
 */
class MenuButton extends Component {
    render() {
        return (
            <div
                className="sm:hover:shadow-md sm:hover:bg-gray-300 trans w-full bg-gray-300 font-medium dark\:text-gray-200 dark\:bg-gray-700 dark-hover\:bg-gray-600 font-inter rounded-lg overflow-hidden p-2 pl-3 flex flex-shrink justify-between">
                <div className="w-3/4 flex">
                    <div>
                        <p className="font-semibold text-xl flex items-center mt-1">
                            <ion-icon name={this.props.icon} style={{fontSize: "24px"}}/>
                            <span className="truncate ml-1">{this.props.name}</span>
                        </p>
                        {this.props.description ?
                            <p className="font-normal truncate text-gray-700 dark\:text-gray-400">
                                {this.props.description}
                            </p>
                            :
                            <></>
                        }
                    </div>
                </div>

                <div className="w-1/4 sm:w-1/5 md:w-1/6 my-auto pr-3 object-right trans">
                    <p className="font-semibold text-right text-2xl">
                        <FontAwesomeIcon style={{height: "21px"}} icon={faChevronRight}/>
                    </p>
                </div>
            </div>
        );
    }
}

export default MenuButton;